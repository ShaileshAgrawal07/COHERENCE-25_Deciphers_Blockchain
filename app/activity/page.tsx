"use client"

import { useState } from "react"
import {
  BadgeCheck,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Lock,
  Search,
  Shield,
  ShieldAlert,
  User,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState("all")

  const activityLogs = [
    {
      id: "act-001",
      activity: "Login from new device",
      category: "Security",
      time: "Today, 10:45 AM",
      location: "New York, USA",
      ip: "192.168.1.1",
      status: "Verified",
      details: "Login from Chrome on MacBook Pro",
      icon: Lock,
    },
    {
      id: "act-002",
      activity: "Credential issued: Driver License",
      category: "Credential",
      time: "Today, 9:30 AM",
      location: "New York, USA",
      ip: "192.168.1.1",
      status: "Completed",
      details: "Credential issued by DMV and verified on blockchain",
      icon: BadgeCheck,
    },
    {
      id: "act-003",
      activity: "Profile information updated",
      category: "Profile",
      time: "Yesterday, 3:15 PM",
      location: "New York, USA",
      ip: "192.168.1.1",
      status: "Verified",
      details: "Updated email address and phone number",
      icon: User,
    },
    {
      id: "act-004",
      activity: "Security settings changed",
      category: "Security",
      time: "2 days ago, 11:20 AM",
      location: "New York, USA",
      ip: "192.168.1.1",
      status: "Completed",
      details: "Enabled two-factor authentication",
      icon: ShieldAlert,
    },
    {
      id: "act-005",
      activity: "Credential shared: University Degree",
      category: "Sharing",
      time: "3 days ago, 2:45 PM",
      location: "New York, USA",
      ip: "192.168.1.1",
      status: "Completed",
      details: "Shared with Employment Verification Service",
      icon: FileText,
    },
    {
      id: "act-006",
      activity: "Access request approved",
      category: "Access",
      time: "4 days ago, 9:10 AM",
      location: "New York, USA",
      ip: "192.168.1.1",
      status: "Completed",
      details: "Approved access request from Medical Services Inc.",
      icon: Shield,
    },
    {
      id: "act-007",
      activity: "Recovery key generated",
      category: "Security",
      time: "1 week ago, 10:30 AM",
      location: "New York, USA",
      ip: "192.168.1.1",
      status: "Completed",
      details: "New blockchain identity recovery key generated",
      icon: Lock,
    },
    {
      id: "act-008",
      activity: "Failed login attempt",
      category: "Security",
      time: "1 week ago, 2:45 AM",
      location: "Beijing, China",
      ip: "203.0.113.1",
      status: "Blocked",
      details: "Suspicious login attempt blocked",
      icon: ShieldAlert,
    },
  ]

  const filteredLogs = activityLogs
    .filter(
      (log) =>
        log.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((log) => {
      if (dateFilter === "all") return true
      if (dateFilter === "today") return log.time.includes("Today")
      if (dateFilter === "yesterday") return log.time.includes("Yesterday")
      if (dateFilter === "week") return log.time.includes("days ago") || log.time.includes("week")
      return true
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground">Track all activities related to your blockchain identity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Log
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search activity logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full sm:w-[300px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="credential">Credentials</TabsTrigger>
          <TabsTrigger value="sharing">Sharing</TabsTrigger>
          <TabsTrigger value="access">Access</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Complete history of activities related to your blockchain identity</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <log.icon className="h-4 w-4" />
                          <span>{log.activity}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{log.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            log.status === "Verified" || log.status === "Completed"
                              ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : log.status === "Blocked"
                                ? "bg-destructive/10 text-destructive"
                                : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Activity Details</DialogTitle>
                              <DialogDescription>Detailed information about this activity</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex items-center gap-2">
                                <log.icon className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-medium">{log.activity}</h3>
                              </div>

                              <div className="rounded-lg border p-4 space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Category:</span>
                                  <Badge variant="outline">{log.category}</Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Time:</span>
                                  <span className="text-sm">{log.time}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Location:</span>
                                  <span className="text-sm">{log.location}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">IP Address:</span>
                                  <span className="text-sm font-mono">{log.ip}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm font-medium">Status:</span>
                                  <Badge
                                    variant="outline"
                                    className={
                                      log.status === "Verified" || log.status === "Completed"
                                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                        : log.status === "Blocked"
                                          ? "bg-destructive/10 text-destructive"
                                          : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                                    }
                                  >
                                    {log.status}
                                  </Badge>
                                </div>
                                <div className="pt-2">
                                  <span className="text-sm font-medium">Details:</span>
                                  <p className="text-sm mt-1">{log.details}</p>
                                </div>
                                {log.category === "Security" && log.status === "Blocked" && (
                                  <div className="pt-2">
                                    <Button variant="destructive" size="sm">
                                      Report Suspicious Activity
                                    </Button>
                                  </div>
                                )}
                              </div>

                              {log.category === "Credential" && (
                                <div className="rounded-lg border p-4">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">Blockchain Verification</h4>
                                    <Button variant="ghost" size="sm">
                                      <ExternalLink className="h-4 w-4 mr-1" />
                                      View on Chain
                                    </Button>
                                  </div>
                                  <div className="mt-2 font-mono text-xs">
                                    Transaction Hash: 0x7f9e8d7c6b5a4321f0e1d2c3b4a5678901234567
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">All activities are securely logged and cannot be modified</p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Similar content for security, credential, sharing, access tabs */}
      </Tabs>
    </div>
  )
}

