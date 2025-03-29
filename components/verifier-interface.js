"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, AlertTriangle, Search, Clock, Shield, Trash2 } from "lucide-react"
import { getLogs, addLog, clearLogs } from "../app/utils/storage"

export function VerifierInterface({ contract, account }) {
  const [userAddress, setUserAddress] = useState("")
  const [credentials, setCredentials] = useState([])
  const [verificationResult, setVerificationResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [verifyingCredential, setVerifyingCredential] = useState(false)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    setLogs(getLogs('verifierLogs'))
  }, [])

  const fetchCredentials = async () => {
    if (!contract || !userAddress) return

    setLoading(true)
    setCredentials([])
    setVerificationResult(null)

    try {
      const accessPermission = await contract.accessPermissions(userAddress, account)
      setHasAccess(accessPermission)

      if (!accessPermission) return

      const credentialCount = await contract.getCredentialCount(userAddress)
      const count = Number(credentialCount)

      const sampleCredentials = []
      for (let i = 1; i <= count; i++) {
        sampleCredentials.push({
          id: i,
          issuer: i % 2 === 0 ? "Government" : "Employment",
          dataHash: ethers.keccak256(ethers.toUtf8Bytes(`credential-${i}`)).substring(0, 18) + "...",
          issuanceTimestamp: Date.now() - i * 86400000,
          expirationTimestamp: Date.now() + (10 - i) * 86400000,
          isRevoked: i === 3,
        })
      }

      setCredentials(sampleCredentials)
    } catch (error) {
      console.error("Error fetching credentials:", error)
    } finally {
      setLoading(false)
    }
  }

  const verifyCredential = async (credentialId) => {
    if (!contract || !userAddress) return

    setVerifyingCredential(true)

    try {
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(credentialId !== 3)
        }, 1500)
      })

      // Add to logs
      addLog('verifierLogs', {
        type: 'credentialVerified',
        userAddress: userAddress,
        credentialId: credentialId,
        result: result,
        timestamp: Date.now()
      })

      setVerificationResult({
        credentialId,
        result,
        timestamp: Date.now(),
      })
      setLogs(getLogs('verifierLogs'))
    } catch (error) {
      console.error("Error verifying credential:", error)
    } finally {
      setVerifyingCredential(false)
    }
  }

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const getCredentialStatus = (credential) => {
    const now = Date.now()

    if (credential.isRevoked) {
      return { status: "Revoked", variant: "destructive", icon: <XCircle className="h-4 w-4" /> }
    } else if (credential.expirationTimestamp < now) {
      return { status: "Expired", variant: "destructive", icon: <XCircle className="h-4 w-4" /> }
    } else if (credential.expirationTimestamp - now < 30 * 86400000) {
      return { status: "Expiring Soon", variant: "warning", icon: <AlertTriangle className="h-4 w-4" /> }
    } else {
      return { status: "Valid", variant: "success", icon: <CheckCircle className="h-4 w-4" /> }
    }
  }

  const clearVerifierLogs = () => {
    clearLogs('verifierLogs')
    setLogs([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Verifier Interface</CardTitle>
          <CardDescription>Verify user credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user-address">User Ethereum Address</Label>
              <div className="flex gap-2">
                <Input
                  id="user-address"
                  placeholder="0x..."
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                />
                <Button onClick={fetchCredentials} disabled={!userAddress || loading}>
                  {loading ? "Loading..." : "Fetch Credentials"}
                </Button>
              </div>
            </div>

            {userAddress && !loading && !hasAccess && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Access Denied</AlertTitle>
                <AlertDescription>
                  You don't have permission to access this user's credentials. The user must grant you access first.
                </AlertDescription>
              </Alert>
            )}

            {credentials.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Data Hash</TableHead>
                    <TableHead>Issued On</TableHead>
                    <TableHead>Expires On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {credentials.map((credential) => {
                    const { status, variant, icon } = getCredentialStatus(credential)
                    return (
                      <TableRow key={credential.id}>
                        <TableCell>{credential.id}</TableCell>
                        <TableCell>{credential.issuer}</TableCell>
                        <TableCell className="font-mono text-xs">{credential.dataHash}</TableCell>
                        <TableCell>{formatTimestamp(credential.issuanceTimestamp)}</TableCell>
                        <TableCell>{formatTimestamp(credential.expirationTimestamp)}</TableCell>
                        <TableCell>
                          <Badge variant={variant} className="flex items-center gap-1">
                            {icon}
                            {status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => verifyCredential(credential.id)}
                            disabled={verifyingCredential}
                          >
                            {verifyingCredential && verificationResult?.credentialId === credential.id ? (
                              "Verifying..."
                            ) : (
                              <>
                                <Search className="mr-1 h-3 w-3" />
                                Verify
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}

            {verificationResult && (
              <Alert variant={verificationResult.result ? "default" : "destructive"}>
                {verificationResult.result ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{verificationResult.result ? "Verification Successful" : "Verification Failed"}</AlertTitle>
                <AlertDescription>
                  Credential #{verificationResult.credentialId} was{" "}
                  {verificationResult.result ? "successfully verified" : "invalid or has been revoked"}.
                  <div className="mt-2 text-xs">
                    <Clock className="mr-1 inline-block h-3 w-3" />
                    Verified at {formatTimestamp(verificationResult.timestamp)}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Verification History</CardTitle>
            <CardDescription>Recent credential verifications</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={clearVerifierLogs}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear History
          </Button>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                  <Shield className={`h-8 w-8 ${log.result ? 'text-green-500' : 'text-red-500'}`} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Credential Verification</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      User: {log.userAddress.substring(0, 6)}...{log.userAddress.substring(log.userAddress.length - 4)}
                    </p>
                    <p className="text-sm">Credential ID: {log.credentialId}</p>
                    <Badge variant={log.result ? "success" : "destructive"} className="mt-1">
                      {log.result ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
                      {log.result ? "Verified Successfully" : "Verification Failed"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Shield className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Verification History</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't verified any credentials yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}