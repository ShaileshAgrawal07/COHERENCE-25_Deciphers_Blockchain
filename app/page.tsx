"use client"

import { useState } from "react"
import Link from "next/link"
import { BadgeCheck, Clock, ExternalLink, FileText, Lock, Shield, ShieldAlert, ShieldCheck, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Home() {
  const [securityScore, setSecurityScore] = useState(85)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Identity Status</CardTitle>
            <CardDescription>Your blockchain identity verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium">Verified on Blockchain</p>
                  <p className="text-xs text-muted-foreground">Last verified: 2 hours ago</p>
                </div>
              </div>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Credentials</CardTitle>
            <CardDescription>Your verified credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  <span>7 Verified Credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <span>2 Pending Verifications</span>
                </div>
              </div>
              <Link href="/credentials">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Security Score</CardTitle>
            <CardDescription>Your overall security rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{securityScore}%</span>
                <Badge variant={securityScore > 80 ? "default" : "outline"}>
                  {securityScore > 80 ? "Strong" : "Needs Improvement"}
                </Badge>
              </div>
              <Progress value={securityScore} className="h-2" />
              <p className="text-xs text-muted-foreground">Enable 2FA to improve your score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="requests">Access Requests</TabsTrigger>
          <TabsTrigger value="sharing">Shared Credentials</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent identity and credential activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span>Login from new device</span>
                      </div>
                    </TableCell>
                    <TableCell>10 minutes ago</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Verified
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href="/activity">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4" />
                        <span>Credential issued: Driver License</span>
                      </div>
                    </TableCell>
                    <TableCell>2 hours ago</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href="/credentials">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>Profile information updated</span>
                      </div>
                    </TableCell>
                    <TableCell>Yesterday</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Verified
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href="/profile">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4" />
                        <span>Security settings changed</span>
                      </div>
                    </TableCell>
                    <TableCell>2 days ago</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                      >
                        Completed
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href="/security">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Link href="/activity" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Requests</CardTitle>
              <CardDescription>Organizations requesting access to your credentials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">FinTech Services Inc.</h4>
                      <p className="text-sm text-muted-foreground">
                        Requesting access to: Identity Verification, Financial Credentials
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Expires in 24 hours</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Deny
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Government Services Portal</h4>
                      <p className="text-sm text-muted-foreground">Requesting access to: National ID, Address Proof</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Expires in 48 hours</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Deny
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/sharing" className="w-full">
                <Button variant="outline" className="w-full">
                  View All Requests
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sharing" className="space-y-4">
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
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Medical Services Inc.</span>
                      </div>
                    </TableCell>
                    <TableCell>Health Insurance, Medical History</TableCell>
                    <TableCell>30 days</TableCell>
                    <TableCell className="text-right">
                      <Link href="/sharing">
                        <Button variant="destructive" size="sm">
                          Revoke
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Employment Verification</span>
                      </div>
                    </TableCell>
                    <TableCell>Education, Work History</TableCell>
                    <TableCell>7 days</TableCell>
                    <TableCell className="text-right">
                      <Link href="/sharing">
                        <Button variant="destructive" size="sm">
                          Revoke
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span>Travel Agency</span>
                      </div>
                    </TableCell>
                    <TableCell>Passport, Visa Status</TableCell>
                    <TableCell>14 days</TableCell>
                    <TableCell className="text-right">
                      <Link href="/sharing">
                        <Button variant="destructive" size="sm">
                          Revoke
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Link href="/sharing" className="w-full">
                <Button variant="outline" className="w-full">
                  Manage Shared Credentials
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Verification</CardTitle>
            <CardDescription>Your identity on the blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Identity Hash</p>
                      <p className="text-xs font-mono">0x7f9e8d7c6b5a4321...</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View on Chain
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recent Verifications</h4>
                <div className="space-y-2">
                  {[
                    { time: "Today, 10:45 AM", txHash: "0x1a2b3c4d5e6f..." },
                    { time: "Yesterday, 3:20 PM", txHash: "0x7e6f5d4c3b2a..." },
                    { time: "Mar 15, 2023, 9:15 AM", txHash: "0xf1e2d3c4b5a6..." },
                  ].map((verification, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2 text-sm">
                      <span>{verification.time}</span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs">{verification.txHash}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zero Knowledge Proofs</CardTitle>
            <CardDescription>Share information without revealing details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Age Verification</p>
                    <p className="text-xs text-muted-foreground">
                      Prove you're over 18 without revealing your birthdate
                    </p>
                  </div>
                </div>
                <Link href="/sharing?tab=zkp">
                  <Button variant="outline" size="sm">
                    Generate Proof
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Income Verification</p>
                    <p className="text-xs text-muted-foreground">Prove income range without revealing exact amount</p>
                  </div>
                </div>
                <Link href="/sharing?tab=zkp">
                  <Button variant="outline" size="sm">
                    Generate Proof
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Location Verification</p>
                    <p className="text-xs text-muted-foreground">Prove country/region without revealing address</p>
                  </div>
                </div>
                <Link href="/sharing?tab=zkp">
                  <Button variant="outline" size="sm">
                    Generate Proof
                  </Button>
                </Link>
              </div>

              <Link href="/sharing?tab=zkp" className="w-full">
                <Button className="w-full">Create Custom Proof</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

