"use client"

import { useState } from "react"
import { BadgeCheck, Check, ChevronDown, Clock, Eye, Lock, Shield, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SharingPage() {
  const [openRequest, setOpenRequest] = useState<number | null>(null)

  const accessRequests = [
    {
      id: 1,
      organization: "FinTech Services Inc.",
      requestedCredentials: ["Identity Verification", "Financial Credentials"],
      purpose: "Loan Application Verification",
      expiry: "24 hours",
      date: "Today, 10:30 AM",
    },
    {
      id: 2,
      organization: "Government Services Portal",
      requestedCredentials: ["National ID", "Address Proof"],
      purpose: "Public Service Registration",
      expiry: "48 hours",
      date: "Today, 9:15 AM",
    },
    {
      id: 3,
      organization: "Medical Center",
      requestedCredentials: ["Health Insurance", "Medical History"],
      purpose: "Healthcare Service Provision",
      expiry: "72 hours",
      date: "Yesterday, 3:45 PM",
    },
  ]

  const sharedCredentials = [
    {
      organization: "Medical Services Inc.",
      credentials: ["Health Insurance", "Medical History"],
      shared: "Mar 15, 2023",
      expires: "Apr 15, 2023",
      lastAccessed: "2 days ago",
    },
    {
      organization: "Employment Verification",
      credentials: ["Education", "Work History"],
      shared: "Mar 10, 2023",
      expires: "Mar 17, 2023",
      lastAccessed: "Yesterday",
    },
    {
      organization: "Travel Agency",
      credentials: ["Passport", "Visa Status"],
      shared: "Feb 28, 2023",
      expires: "Mar 14, 2023",
      lastAccessed: "1 week ago",
    },
    {
      organization: "Rental Services",
      credentials: ["Income Verification", "Credit Score"],
      shared: "Feb 15, 2023",
      expires: "Aug 15, 2023",
      lastAccessed: "3 days ago",
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="requests">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requests">Access Requests</TabsTrigger>
          <TabsTrigger value="shared">Shared Credentials</TabsTrigger>
          <TabsTrigger value="zkp">Zero Knowledge Proofs</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Access Requests</CardTitle>
              <CardDescription>Organizations requesting access to your credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accessRequests.map((request) => (
                  <Collapsible
                    key={request.id}
                    open={openRequest === request.id}
                    onOpenChange={() => setOpenRequest(openRequest === request.id ? null : request.id)}
                    className="rounded-lg border"
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <h4 className="font-medium">{request.organization}</h4>
                        <p className="text-sm text-muted-foreground">
                          Requesting: {request.requestedCredentials.join(", ")}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Expires in {request.expiry}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Details
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>

                    <CollapsibleContent>
                      <div className="border-t p-4">
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium">Purpose of Request</h5>
                            <p className="text-sm text-muted-foreground">{request.purpose}</p>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium">Requested Credentials</h5>
                            <div className="mt-2 space-y-2">
                              {request.requestedCredentials.map((credential, idx) => (
                                <div key={idx} className="flex items-center justify-between rounded-md border p-2">
                                  <div className="flex items-center gap-2">
                                    <BadgeCheck className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{credential}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Label htmlFor={`share-${request.id}-${idx}`} className="text-xs">
                                      Share
                                    </Label>
                                    <Switch id={`share-${request.id}-${idx}`} defaultChecked />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium">Access Duration</h5>
                            <Select defaultValue="7days">
                              <SelectTrigger className="mt-2 w-full">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="24hours">24 Hours</SelectItem>
                                <SelectItem value="7days">7 Days</SelectItem>
                                <SelectItem value="30days">30 Days</SelectItem>
                                <SelectItem value="90days">90 Days</SelectItem>
                                <SelectItem value="custom">Custom Duration</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <X className="mr-1 h-4 w-4" />
                              Deny
                            </Button>
                            <Button size="sm">
                              <Check className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                All access requests are secured with blockchain verification
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shared Credentials</CardTitle>
              <CardDescription>Organizations with access to your credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead>Credentials Shared</TableHead>
                    <TableHead>Shared On</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Last Accessed</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sharedCredentials.map((shared, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          <span>{shared.organization}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {shared.credentials.map((cred, idx) => (
                            <Badge key={idx} variant="outline" className="whitespace-nowrap">
                              {cred}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{shared.shared}</TableCell>
                      <TableCell>{shared.expires}</TableCell>
                      <TableCell>{shared.lastAccessed}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Revoke
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Eye className="mr-2 h-4 w-4" />
                View Access Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="zkp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zero Knowledge Proofs</CardTitle>
              <CardDescription>Share information without revealing sensitive details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="mb-2 font-medium">What are Zero Knowledge Proofs?</h3>
                  <p className="text-sm text-muted-foreground">
                    Zero Knowledge Proofs allow you to prove certain facts about your credentials without revealing the
                    actual data. For example, you can prove you're over 18 without revealing your exact birthdate.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Available Proofs</h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Age Verification</p>
                          <p className="text-xs text-muted-foreground">
                            Prove you're over 18/21/25 without revealing your birthdate
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Generate
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Income Verification</p>
                          <p className="text-xs text-muted-foreground">
                            Prove income range without revealing exact amount
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Generate
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Location Verification</p>
                          <p className="text-xs text-muted-foreground">
                            Prove country/region without revealing address
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Generate
                      </Button>
                    </div>

                    <div className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Education Verification</p>
                          <p className="text-xs text-muted-foreground">
                            Prove degree level without revealing institution details
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Generate
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-medium">Active Proofs</h3>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">Age Verification (Over 21)</h4>
                        <p className="text-sm text-muted-foreground">Shared with: Venue Services</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Expires in 24 hours</span>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Create Custom Proof</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Consent Management</CardTitle>
          <CardDescription>Control how your credentials are shared</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-approve" className="flex flex-col space-y-1">
                <span>Auto-approve trusted organizations</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Automatically approve requests from previously approved organizations
                </span>
              </Label>
              <Switch id="auto-approve" />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="notify-access" className="flex flex-col space-y-1">
                <span>Notify on credential access</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications when your credentials are accessed
                </span>
              </Label>
              <Switch id="notify-access" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="expire-auto" className="flex flex-col space-y-1">
                <span>Auto-expire shared credentials</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Automatically revoke access after the expiration date
                </span>
              </Label>
              <Switch id="expire-auto" defaultChecked />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="zkp-default" className="flex flex-col space-y-1">
                <span>Use Zero Knowledge Proofs by default</span>
                <span className="font-normal text-sm text-muted-foreground">
                  When possible, share proofs instead of actual credentials
                </span>
              </Label>
              <Switch id="zkp-default" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

