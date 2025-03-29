"use client"

import { useState, useEffect } from "react";
import { ethers } from "ethers";
// Individual component imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// Icon imports remain the same
import { Shield, CheckCircle, XCircle, User, Key, Wallet, Trash2, Search, Download, Clock } from "lucide-react";

export function UserDashboard({ contract, account }) {
  // State variables
  const [credentials, setCredentials] = useState([]);
  const [verifiers, setVerifiers] = useState([]);
  const [newVerifier, setNewVerifier] = useState("");
  const [did, setDid] = useState("");
  const [activityLog, setActivityLog] = useState([]);
  const [loading, setLoading] = useState({
    credentials: true,
    verifiers: true
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!contract || !account) return;
    
      try {
        // Fetch DID
        const userDID = await contract.DIDs(account);
        setDid(userDID || "Not registered");
    
        // Fetch credentials - try both methods
        let creds = [];
        try {
          // First try the direct method (if getMyCredentials exists)
          creds = await contract.getMyCredentials().then(allCreds => 
            allCreds.map((cred, i) => ({
              id: cred.id,
              issuer: cred.issuer,
              credType: cred.dataHash.includes("gov") ? "Government ID" : "Employment",
              dataHash: cred.dataHash,
              issuedAt: new Date(cred.issuanceTimestamp * 1000),
              expiresAt: new Date(cred.expirationTimestamp * 1000),
              isRevoked: cred.isRevoked
            }))
          );
        } catch {
          // Fallback to verification method
          const count = await contract.getCredentialCount(account);
          for (let i = 0; i < count; i++) {
            try {
              const isValid = await contract.verifyCredential(account, i+1);
              if (isValid) {
                const allCreds = await contract.getCredentials(account);
                const cred = allCreds[i];
                creds.push({
                  id: cred.id,
                  issuer: cred.issuer,
                  credType: cred.dataHash.includes("gov") ? "Government ID" : "Employment",
                  dataHash: cred.dataHash,
                  issuedAt: new Date(cred.issuanceTimestamp * 1000),
                  expiresAt: new Date(cred.expirationTimestamp * 1000),
                  isRevoked: cred.isRevoked
                });
              }
            } catch {
              continue;
            }
          }
        }
        setCredentials(creds);
    
        // Fetch verifiers with access
        const filter = contract.filters.AccessGranted(account);
        const events = await contract.queryFilter(filter);
        setVerifiers(events.map(e => e.args.verifier));
    
        // Load activity log
        const savedLog = localStorage.getItem('userActivity');
        setActivityLog(savedLog ? JSON.parse(savedLog) : []);
    
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading({ credentials: false, verifiers: false });
      }
    };

    fetchUserData();
  }, [contract, account]);

  // Credential status helper
  const getCredentialStatus = (cred) => {
    const now = new Date();
    if (cred.isRevoked) return { status: "Revoked", variant: "destructive", icon: <XCircle className="h-4 w-4" /> };
    if (now > cred.expiresAt) return { status: "Expired", variant: "destructive", icon: <XCircle className="h-4 w-4" /> };
    return { status: "Active", variant: "success", icon: <CheckCircle className="h-4 w-4" /> };
  };

  // Verifier access control
  const grantAccess = async () => {
    if (!newVerifier || !ethers.isAddress(newVerifier)) {
      alert("Please enter a valid Ethereum address");
      return;
    }

    try {
      setLoading({ ...loading, verifiers: true });
      const tx = await contract.grantAccess(newVerifier);
      await tx.wait();

      setVerifiers([...verifiers, newVerifier]);
      addToActivityLog(`Granted access to ${newVerifier.substring(0, 6)}...${newVerifier.slice(-4)}`);
      setNewVerifier("");
    } catch (error) {
      console.error("Error granting access:", error);
      alert(`Failed to grant access: ${error.message}`);
    } finally {
      setLoading({ ...loading, verifiers: false });
    }
  };

  const revokeAccess = async (verifierAddress) => {
    try {
      setLoading({ ...loading, verifiers: true });
      const tx = await contract.revokeAccess(verifierAddress);
      await tx.wait();

      setVerifiers(verifiers.filter(v => v !== verifierAddress));
      addToActivityLog(`Revoked access from ${verifierAddress.substring(0, 6)}...${verifierAddress.slice(-4)}`);
    } catch (error) {
      console.error("Error revoking access:", error);
      alert(`Failed to revoke access: ${error.message}`);
    } finally {
      setLoading({ ...loading, verifiers: false });
    }
  };

  // Activity logging
  const addToActivityLog = (action) => {
    const newLog = {
      action,
      timestamp: new Date().toISOString()
    };
    const updatedLog = [newLog, ...activityLog].slice(0, 50); // Keep last 50 entries
    setActivityLog(updatedLog);
    localStorage.setItem('userActivity', JSON.stringify(updatedLog));
  };

  // Filter credentials by search term
  const filteredCredentials = credentials.filter(cred =>
    cred.credType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cred.issuer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export credentials as JSON
  const exportCredentials = () => {
    const data = {
      did,
      credentials,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `credentials_${new Date().getTime()}.json`;
    link.click();
  };

  if (loading.credentials && loading.verifiers) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">User Dashboard</CardTitle>
              <CardDescription>Manage your digital identity and credentials</CardDescription>
            </div>
            <Shield className="h-8 w-8 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Your DID</h3>
              <div className="flex items-center gap-2 rounded-md border p-2 text-sm">
                <User className="h-4 w-4 text-primary" />
                <span className="font-mono">{did}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Credentials</h3>
              <div className="flex items-center gap-2 rounded-md border p-2 text-sm">
                <Key className="h-4 w-4 text-primary" />
                <span>{credentials.length} credentials</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Wallet Address</h3>
              <div className="flex items-center gap-2 rounded-md border p-2 text-sm">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="font-mono">
                  {account.substring(0, 6)}...{account.substring(account.length - 4)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="credentials">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="credentials">My Credentials</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        {/* Credentials Tab */}
        <TabsContent value="credentials" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Credentials</CardTitle>
                  <CardDescription>All credentials issued to your DID</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search credentials..."
                      className="pl-9 w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={exportCredentials}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredCredentials.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Issuer</TableHead>
                      <TableHead>Issued</TableHead>
                      <TableHead>Expires</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCredentials.map((cred) => {
                      const status = getCredentialStatus(cred);
                      return (
                        <TableRow key={cred.id}>
                          <TableCell>{cred.credType}</TableCell>
                          <TableCell className="font-mono">
                            {cred.issuer.substring(0, 6)}...{cred.issuer.slice(-4)}
                          </TableCell>
                          <TableCell>{cred.issuedAt.toLocaleDateString()}</TableCell>
                          <TableCell>{cred.expiresAt.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant={status.variant} className="flex items-center gap-1">
                              {status.icon}
                              {status.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Key className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    {searchTerm ? "No matching credentials" : "No credentials yet"}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {searchTerm
                      ? "Try a different search term"
                      : "You haven't been issued any credentials yet"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Control Tab */}
        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>Manage which verifiers can access your credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="verifier-address">Grant Access to Verifier</Label>
                <div className="flex gap-2">
                  <Input
                    id="verifier-address"
                    placeholder="Enter verifier's Ethereum address"
                    value={newVerifier}
                    onChange={(e) => setNewVerifier(e.target.value)}
                  />
                  <Button 
                    onClick={grantAccess} 
                    disabled={!newVerifier || loading.verifiers}
                  >
                    {loading.verifiers ? "Granting..." : "Grant Access"}
                  </Button>
                </div>
              </div>

              {verifiers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Verifier Address</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifiers.map((verifier) => (
                      <TableRow key={verifier}>
                        <TableCell className="font-mono">
                          {verifier.substring(0, 6)}...{verifier.substring(verifier.length - 4)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => revokeAccess(verifier)}
                            disabled={loading.verifiers}
                          >
                            {loading.verifiers ? "Revoking..." : "Revoke Access"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Shield className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No Access Granted</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You haven't granted access to any verifiers yet.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Log Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent actions on your credentials</CardDescription>
            </CardHeader>
            <CardContent>
              {activityLog.length > 0 ? (
                <div className="space-y-4">
                  {activityLog.map((log, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{log.action}</p>
                          <span className="text-sm text-muted-foreground">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No Activity Yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your actions will appear here when you manage credentials or access.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}