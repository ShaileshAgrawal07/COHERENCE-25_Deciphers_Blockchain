"use client"

import type React from "react"

import { useState } from "react"
import {
  AlertTriangle,
  Check,
  Copy,
  Eye,
  EyeOff,
  Key,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SecurityPage() {
  const [showRecoveryKey, setShowRecoveryKey] = useState(false)
  const [securityScore, setSecurityScore] = useState(85)

  const securityLogs = [
    {
      event: "Login from new device",
      location: "New York, USA",
      ip: "192.168.1.1",
      time: "Today, 10:45 AM",
      status: "Verified",
    },
    {
      event: "Password changed",
      location: "New York, USA",
      ip: "192.168.1.1",
      time: "Mar 15, 2023, 3:20 PM",
      status: "Completed",
    },
    {
      event: "2FA enabled",
      location: "New York, USA",
      ip: "192.168.1.1",
      time: "Mar 10, 2023, 9:15 AM",
      status: "Completed",
    },
    {
      event: "Recovery key generated",
      location: "New York, USA",
      ip: "192.168.1.1",
      time: "Mar 5, 2023, 11:30 AM",
      status: "Completed",
    },
    {
      event: "Failed login attempt",
      location: "Beijing, China",
      ip: "203.0.113.1",
      time: "Mar 1, 2023, 2:45 AM",
      status: "Blocked",
    },
  ]

  return (
    <div className="space-y-6 p-10">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Security Score</CardTitle>
            <CardDescription>Your overall security rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{securityScore}%</span>
                <Badge variant={securityScore > 80 ? "default" : "outline"}>
                  {securityScore > 80 ? "Strong" : "Needs Improvement"}
                </Badge>
              </div>
              <Progress value={securityScore} className="h-2" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Strong password</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    Complete
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Blockchain verification</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    Complete
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Recovery key set up</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    Complete
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Two-factor authentication</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                  >
                    Recommended
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Improve Security
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Recommended Security Measure</AlertTitle>
                <AlertDescription>
                  Enable 2FA to protect your blockchain identity from unauthorized access.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="2fa-app" className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <span>Authenticator App</span>
                    </div>
                    <span className="font-normal text-sm text-muted-foreground">
                      Use an app like Google Authenticator
                    </span>
                  </Label>
                  <Switch id="2fa-app" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="2fa-sms" className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <span>SMS Verification</span>
                    </div>
                    <span className="font-normal text-sm text-muted-foreground">Receive codes via text message</span>
                  </Label>
                  <Switch id="2fa-sms" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="2fa-hardware" className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      <span>Hardware Key</span>
                    </div>
                    <span className="font-normal text-sm text-muted-foreground">Use a physical security key</span>
                  </Label>
                  <Switch id="2fa-hardware" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Setup 2FA
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recovery Key</CardTitle>
          <CardDescription>Your blockchain identity recovery key</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Important Security Information</AlertTitle>
              <AlertDescription>
                Store this recovery key in a secure location. It's the only way to recover your blockchain identity if
                you lose access.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="recovery-key">Recovery Key</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <Input
                    id="recovery-key"
                    type={showRecoveryKey ? "text" : "password"}
                    value="block-recover-alpha-7f9e8d-7c6b5a-4321f0"
                    readOnly
                    className="pr-10 font-mono"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowRecoveryKey(!showRecoveryKey)}
                  >
                    {showRecoveryKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button variant="outline" className="ml-2">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Last generated: March 5, 2023</p>
            </div>

            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Recovery Key
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activity">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activity">Security Activity</TabsTrigger>
          <TabsTrigger value="devices">Authorized Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Activity Log</CardTitle>
              <CardDescription>Recent security events for your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {log.status === "Blocked" ? (
                            <ShieldAlert className="h-4 w-4 text-destructive" />
                          ) : (
                            <Shield className="h-4 w-4 text-primary" />
                          )}
                          <span>{log.event}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                      <TableCell>{log.time}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            log.status === "Verified" || log.status === "Completed"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-destructive/10 text-destructive"
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Activity Log
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authorized Devices</CardTitle>
              <CardDescription>Devices that can access your blockchain identity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">iPhone 13 Pro</h4>
                        <p className="text-sm text-muted-foreground">New York, USA • Current Device</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    >
                      Active Now
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Laptop className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">MacBook Pro</h4>
                        <p className="text-sm text-muted-foreground">New York, USA • Last active 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Tablet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">iPad Air</h4>
                        <p className="text-sm text-muted-foreground">New York, USA • Last active 3 days ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="destructive">Remove All Other Devices</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Laptop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
      <line x1="2" x2="22" y1="20" y2="20" />
    </svg>
  )
}

function Tablet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="12" x2="12.01" y1="18" y2="18" />
    </svg>
  )
}

