"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, CheckCircle2, Calendar, Trash2 } from "lucide-react"
import { getLogs, addLog, clearLogs } from "../app/utils/storage"

export function IssuerPortal({ contract, account }) {
  const [userAddress, setUserAddress] = useState("")
  const [credentialType, setCredentialType] = useState("government")
  const [formData, setFormData] = useState({
    name: "",
    aadharNumber: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
  })
  const [expiryDays, setExpiryDays] = useState(365) // Default 1 year
  const [issuingCredential, setIssuingCredential] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    setLogs(getLogs('issuerLogs'))
  }, [])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateIPFSHash = (data) => {
    return ethers.utils.id(JSON.stringify(data))
  }

  const issueCredential = async () => {
    if (!contract || !userAddress || !formData.name) {
      alert("Please fill in all required fields")
      return
    }

    setIssuingCredential(true)
    setIsSuccess(false)

    try {
      // Generate a data hash (in a real app, this would be an IPFS hash)
      const dataHash = ethers.id(JSON.stringify(formData))

      // Create a signature (in a real app, this would be done securely)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const signature = await signer.signMessage(dataHash)

      // Calculate expiration timestamp
      const expirationTimestamp = Math.floor(Date.now() / 1000) + expiryDays * 86400

      // Issue the credential
      const tx = await contract.issueCredential(
        userAddress,
        credentialType === "government" ? "Government" : "Employment",
        dataHash,
        expirationTimestamp,
        signature,
      )

      await tx.wait()

      // Add to logs
      addLog('issuerLogs', {
        type: 'credentialIssued',
        credentialType: credentialType === "government" ? "Government" : "Employment",
        toAddress: userAddress,
        dataHash: dataHash,
        timestamp: Date.now(),
        txHash: tx.hash
      })

      setIsSuccess(true)
      setFormData({
        name: "",
        aadharNumber: "",
        dateOfBirth: "",
        phoneNumber: "",
        address: "",
      })
      setLogs(getLogs('issuerLogs'))
    } catch (error) {
      console.error("Error issuing credential:", error)
      alert("Failed to issue credential. Please try again.")
    } finally {
      setIssuingCredential(false)
    }
  }

  const clearIssuerLogs = () => {
    clearLogs('issuerLogs')
    setLogs([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Issuer Portal</CardTitle>
          <CardDescription>Issue verifiable credentials to users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* User Address Field */}
            <div className="space-y-2">
              <Label htmlFor="user-address">User Ethereum Address</Label>
              <Input
                id="user-address"
                placeholder="0x..."
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              />
            </div>

            {/* Credential Type Selector */}
            <div className="space-y-2">
              <Label htmlFor="credential-type">Credential Type</Label>
              <Select value={credentialType} onValueChange={setCredentialType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select credential type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="government">Government ID</SelectItem>
                  <SelectItem value="employment">Employment Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Form Fields Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleFormChange} 
                />
              </div>

              {/* Aadhar Number Field (only for government type) */}
              {credentialType === "government" && (
                <div className="space-y-2">
                  <Label htmlFor="aadharNumber">Aadhar Number</Label>
                  <Input
                    id="aadharNumber"
                    name="aadharNumber"
                    placeholder="1234 5678 9012"
                    value={formData.aadharNumber}
                    onChange={handleFormChange}
                  />
                </div>
              )}

              {/* Date of Birth Field */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleFormChange}
                />
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+91 98765 43210"
                  value={formData.phoneNumber}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            {/* Address Textarea */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="123 Main St, City, State, Country"
                value={formData.address}
                onChange={handleFormChange}
              />
            </div>

            {/* Expiry Selector */}
            <div className="space-y-2">
              <Label htmlFor="expiry">Credential Expiry</Label>
              <Select 
                value={expiryDays.toString()} 
                onValueChange={(value) => setExpiryDays(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select expiry period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="1095">3 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setFormData({
                name: "",
                aadharNumber: "",
                dateOfBirth: "",
                phoneNumber: "",
                address: "",
              })
              setUserAddress("")
            }}
          >
            Reset
          </Button>
          <Button 
            onClick={issueCredential} 
            disabled={issuingCredential || !userAddress || !formData.name}
          >
            {issuingCredential ? "Issuing..." : "Issue Credential"}
          </Button>
        </CardFooter>
      </Card>

      {/* Success Message */}
      {isSuccess && (
        <Card className="border-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle2 className="h-5 w-5" />
              <p className="font-medium">Credential issued successfully!</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recently Issued Credentials */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recently Issued Credentials</CardTitle>
            <CardDescription>View credentials you've recently issued</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={clearIssuerLogs}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear History
          </Button>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{log.credentialType}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Issued to: {log.toAddress.substring(0, 6)}...{log.toAddress.substring(log.toAddress.length - 4)}
                    </p>
                    <p className="text-sm font-mono text-xs">Data Hash: {log.dataHash.substring(0, 12)}...</p>
                    <p className="text-sm font-mono text-xs">Tx: {log.txHash.substring(0, 12)}...</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Credentials Issued Yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">You haven't issued any credentials yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}