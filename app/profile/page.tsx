"use client"

import { useState } from "react"
import { BadgeCheck, Edit, ExternalLink, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const credentials = [
    {
      name: "National ID",
      issuer: "Government",
      issued: "Jan 15, 2023",
      expires: "Jan 15, 2033",
      status: "Verified",
      hash: "0x7f9e8d7c6b5a4321...",
    },
    {
      name: "Driver's License",
      issuer: "DMV",
      issued: "Mar 10, 2022",
      expires: "Mar 10, 2027",
      status: "Verified",
      hash: "0x1a2b3c4d5e6f7890...",
    },
    {
      name: "University Degree",
      issuer: "State University",
      issued: "Jun 5, 2021",
      expires: "Never",
      status: "Verified",
      hash: "0xf1e2d3c4b5a6789...",
    },
    {
      name: "Employment Verification",
      issuer: "Tech Corp Inc.",
      issued: "Sep 20, 2022",
      expires: "Sep 20, 2023",
      status: "Verified",
      hash: "0x9a8b7c6d5e4f32...",
    },
    {
      name: "Health Insurance",
      issuer: "National Health",
      issued: "Feb 1, 2023",
      expires: "Feb 1, 2024",
      status: "Verified",
      hash: "0x2c3d4e5f6a7b8c...",
    },
  ]

  return (
    <div className="space-y-6 p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your personal identity details</CardDescription>
            </div>
            <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                "Save Changes"
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Change Photo
                </Button>
              )}
              <div className="flex items-center gap-1">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Verified Identity</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue="John"
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john.doe@example.com"
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                    //className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    defaultValue="+1 (555) 123-4567"
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  defaultValue="123 Blockchain Street, Crypto City, CC 12345"
                  readOnly={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="did">Decentralized Identifier (DID)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="did"
                    defaultValue="did:ethr:0x1234...5678"
                    readOnly
                    className="bg-muted font-mono text-sm"
                  />
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Your unique blockchain identifier</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="credentials">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="credentials" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Verified Credentials</CardTitle>
                  <CardDescription>Your blockchain-verified credentials and certificates</CardDescription>
                </div>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Add Credential
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Credential</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {credentials.map((credential, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{credential.name}</TableCell>
                      <TableCell>{credential.issuer}</TableCell>
                      <TableCell>{credential.issued}</TableCell>
                      <TableCell>{credential.expires}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                        >
                          <BadgeCheck className="mr-1 h-3 w-3" />
                          {credential.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Share
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Audit Trail</CardTitle>
              <CardDescription>Transparent record of all your identity transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="mb-2 font-medium">Identity Hash</h3>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted-foreground/20 px-2 py-1 font-mono text-sm">
                      did:ethr:0x7f9e8d7c6b5a4321f0e1d2c3b4a5678901234567
                    </code>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Transaction History</h3>

                  <div className="space-y-4">
                    {[
                      {
                        type: "Credential Issuance",
                        credential: "Health Insurance",
                        date: "Feb 1, 2023",
                        txHash: "0x2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d",
                        block: "15234567",
                      },
                      {
                        type: "Identity Update",
                        credential: "Profile Information",
                        date: "Jan 15, 2023",
                        txHash: "0x7f9e8d7c6b5a4321f0e1d2c3b4a5678901234567",
                        block: "15234000",
                      },
                      {
                        type: "Credential Issuance",
                        credential: "National ID",
                        date: "Jan 15, 2023",
                        txHash: "0x1a2b3c4d5e6f7890123456789abcdef0123456789",
                        block: "15233998",
                      },
                      {
                        type: "Credential Issuance",
                        credential: "Driver's License",
                        date: "Mar 10, 2022",
                        txHash: "0xabcdef0123456789abcdef0123456789abcdef01",
                        block: "14567890",
                      },
                      {
                        type: "Identity Creation",
                        credential: "DID Registration",
                        date: "Jan 1, 2022",
                        txHash: "0x0123456789abcdef0123456789abcdef01234567",
                        block: "14000123",
                      },
                    ].map((tx, index) => (
                      <div key={index} className="rounded-md border p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h4 className="font-medium">{tx.type}</h4>
                            <p className="text-sm text-muted-foreground">{tx.credential}</p>
                          </div>
                          <Badge variant="outline">{tx.date}</Badge>
                        </div>
                        <Separator className="my-3" />
                        <div className="grid gap-2 text-sm sm:grid-cols-2">
                          <div>
                            <p className="text-muted-foreground">Transaction Hash:</p>
                            <div className="flex items-center gap-1">
                              <code className="font-mono text-xs">{tx.txHash.substring(0, 18)}...</code>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Block Number:</p>
                            <div className="flex items-center gap-1">
                              <code className="font-mono">{tx.block}</code>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Complete Audit Trail
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

