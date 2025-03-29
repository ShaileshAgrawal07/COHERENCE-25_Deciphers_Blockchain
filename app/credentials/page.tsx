






"use client"
import React from "react";
import { useState } from "react"
import Link from "next/link"
import { BadgeCheck, Clock, Download, ExternalLink, FileText, Search, Shield, Upload } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CredentialInput from "@/components/CredentialInput";


export default function CredentialsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const credentials = [
    {
      id: "cred-001",
      name: "National ID",
      issuer: "Government",
      issued: "Jan 15, 2023",
      expires: "Jan 15, 2033",
      status: "Verified",
      hash: "0x7f9e8d7c6b5a4321...",
      category: "Identity",
    },
    {
      id: "cred-002",
      name: "Driver's License",
      issuer: "DMV",
      issued: "Mar 10, 2022",
      expires: "Mar 10, 2027",
      status: "Verified",
      hash: "0x1a2b3c4d5e6f7890...",
      category: "Identity",
    },
    {
      id: "cred-003",
      name: "University Degree",
      issuer: "State University",
      issued: "Jun 5, 2021",
      expires: "Never",
      status: "Verified",
      hash: "0xf1e2d3c4b5a6789...",
      category: "Education",
    },
    {
      id: "cred-004",
      name: "Employment Verification",
      issuer: "Tech Corp Inc.",
      issued: "Sep 20, 2022",
      expires: "Sep 20, 2023",
      status: "Verified",
      hash: "0x9a8b7c6d5e4f32...",
      category: "Employment",
    },
    {
      id: "cred-005",
      name: "Health Insurance",
      issuer: "National Health",
      issued: "Feb 1, 2023",
      expires: "Feb 1, 2024",
      status: "Verified",
      hash: "0x2c3d4e5f6a7b8c...",
      category: "Health",
    },
    {
      id: "cred-006",
      name: "Vaccination Record",
      issuer: "Health Department",
      issued: "Apr 15, 2022",
      expires: "Never",
      status: "Verified",
      hash: "0x3d4e5f6a7b8c9d...",
      category: "Health",
    },
    {
      id: "cred-007",
      name: "Professional Certification",
      issuer: "Industry Board",
      issued: "Nov 12, 2022",
      expires: "Nov 12, 2025",
      status: "Verified",
      hash: "0x4e5f6a7b8c9d0e...",
      category: "Professional",
    },
  ]

  const pendingCredentials = [
    {
      id: "pending-001",
      name: "Passport",
      issuer: "State Department",
      requested: "Mar 25, 2023",
      status: "Pending Verification",
      category: "Identity",
    },
    {
      id: "pending-002",
      name: "Property Deed",
      issuer: "County Recorder",
      requested: "Mar 20, 2023",
      status: "Pending Verification",
      category: "Property",
    },
  ]

  const filteredCredentials = credentials.filter(
    (cred) =>
      cred.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Credentials</h1>
          <p className="text-muted-foreground">Manage your blockchain-verified credentials</p>
          <h1 className="text-xl font-bold mb-4">Enter Your Credential</h1>
      <CredentialInput />
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Add Credential
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Credential</DialogTitle>
                <DialogDescription>Upload a new credential to be verified on the blockchain</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credential type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="identity">Identity Document</SelectItem>
                      <SelectItem value="education">Education Certificate</SelectItem>
                      <SelectItem value="employment">Employment Verification</SelectItem>
                      <SelectItem value="health">Health Record</SelectItem>
                      <SelectItem value="property">Property Document</SelectItem>
                      <SelectItem value="financial">Financial Record</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <div className="rounded-md border border-dashed p-8 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <div className="mt-4">
                      <p className="text-sm font-medium">Drag and drop your file here</p>
                      <p className="text-xs text-muted-foreground">Supports PDF, JPG, PNG up to 10MB</p>
                    </div>
                    <Button variant="outline" className="mt-4">
                      Select File
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Upload & Verify</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search credentials by name, issuer, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full lg:w-[300px]"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Credentials</TabsTrigger>
          <TabsTrigger value="identity">Identity</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Credentials</CardTitle>
              <CardDescription>Your blockchain-verified credentials and certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Credential</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCredentials.map((credential) => (
                    <TableRow key={credential.id}>
                      <TableCell className="font-medium">{credential.name}</TableCell>
                      <TableCell>{credential.issuer}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{credential.category}</Badge>
                      </TableCell>
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
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[625px]">
                              <DialogHeader>
                                <DialogTitle>{credential.name}</DialogTitle>
                                <DialogDescription>
                                  Issued by {credential.issuer} on {credential.issued}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="rounded-lg border p-4">
                                  <div className="mb-4 flex items-center justify-between">
                                    <Badge
                                      variant="outline"
                                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                    >
                                      <BadgeCheck className="mr-1 h-3 w-3" />
                                      Blockchain Verified
                                    </Badge>
                                    <Badge variant="outline">{credential.category}</Badge>
                                  </div>
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Credential ID:</span>
                                      <span className="text-sm">{credential.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Issuer:</span>
                                      <span className="text-sm">{credential.issuer}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Issue Date:</span>
                                      <span className="text-sm">{credential.issued}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Expiry Date:</span>
                                      <span className="text-sm">{credential.expires}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">Blockchain Hash:</span>
                                      <div className="flex items-center gap-1">
                                        <span className="text-sm font-mono">{credential.hash}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                          <ExternalLink className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="rounded-lg border p-4 text-center">
                                  <FileText className="mx-auto h-16 w-16 text-muted-foreground" />
                                  <p className="mt-2 text-sm font-medium">{credential.name}.pdf</p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </Button>
                                <Button>Share Credential</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Link href={`/sharing?credential=${credential.id}`}>
                            <Button variant="ghost" size="sm">
                              Share
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="identity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Identity Credentials</CardTitle>
              <CardDescription>Your blockchain-verified identity documents</CardDescription>
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
                  {filteredCredentials
                    .filter((cred) => cred.category === "Identity")
                    .map((credential) => (
                      <TableRow key={credential.id}>
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
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
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

        {/* Similar content for education, employment, health tabs */}

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Credentials</CardTitle>
              <CardDescription>Credentials awaiting verification on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Credential</TableHead>
                    <TableHead>Issuer</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Requested Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingCredentials.map((credential) => (
                    <TableRow key={credential.id}>
                      <TableCell className="font-medium">{credential.name}</TableCell>
                      <TableCell>{credential.issuer}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{credential.category}</Badge>
                      </TableCell>
                      <TableCell>{credential.requested}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          {credential.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Cancel
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
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Credential Verification</CardTitle>
          <CardDescription>Verify a credential using its blockchain hash</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input placeholder="Enter credential hash..." className="flex-1" />
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              Verify
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            All credentials are securely stored and verified on the blockchain
          </p>
        </CardFooter>
      </Card>
      
    </div>
  )
}

