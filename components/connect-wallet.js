"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, CheckCircle2, Calendar } from "lucide-react"

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

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const generateIPFSHash = (data) => {
    // In a real application, you would upload this data to IPFS
    // For demo purposes, we'll just create a hash of the data
    return ethers.id(JSON.stringify(data))
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
      const dataHash = generateIPFSHash(formData)

      // Create a signature (in a real app, this would be done securely)
      const signer = await contract.signer
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
      setIsSuccess(true)

      // Reset form
      setFormData({
        name: "",
        aadharNumber: "",
        dateOfBirth: "",
        phoneNumber: "",
        address: "",
      })
    } catch (error) {
      console.error("Error issuing credential:", error)
      alert("Failed to issue credential. Please try again.")
    } finally {
      setIssuingCredential(false)
    }
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
            <div className="space-y-2">
              <Label htmlFor="user-address">User Ethereum Address</Label>
              <Input
                id="user-address"
                placeholder="0x..."
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              />
            </div>

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

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" value={formData.name} onChange={handleFormChange} />
              </div>

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

            <div className="space-y-2">
              <Label htmlFor="expiry">Credential Expiry</Label>
              <Select value={expiryDays.toString()} onValueChange={(value) => setExpiryDays(Number.parseInt(value))}>
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
          <Button onClick={issueCredential} disabled={issuingCredential || !userAddress || !formData.name}>
            {issuingCredential ? "Issuing..." : "Issue Credential"}
          </Button>
        </CardFooter>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Recently Issued Credentials</CardTitle>
          <CardDescription>View credentials you've recently issued</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Sample data for demonstration */}
            <div className="flex items-start gap-4 rounded-lg border p-4">
              <FileText className="h-8 w-8 text-primary" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Government ID</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Issued today</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Issued to: 0x1234...5678</p>
                <p className="text-sm">Data Hash: 0xabcd...efgh</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Expires:</span>
                  <span>March 29, 2026</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-lg border p-4">
              <FileText className="h-8 w-8 text-primary" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Employment Verification</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Issued 2 days ago</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Issued to: 0x8765...4321</p>
                <p className="text-sm">Data Hash: 0xijkl...mnop</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Expires:</span>
                  <span>March 27, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

