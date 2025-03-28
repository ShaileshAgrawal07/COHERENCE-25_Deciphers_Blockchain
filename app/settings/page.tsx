"use client"

import { useState } from "react"
import { Bell, Globe, Lock, Mail, Moon, Sun, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details and personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Blockchain Street, Crypto City, CC 12345" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Password</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-destructive/50 p-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-destructive">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <div className="mt-2">
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex items-center gap-4">
                  <RadioGroup defaultValue={theme} onValueChange={setTheme} className="flex">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center gap-1 cursor-pointer">
                        <Sun className="h-4 w-4" />
                        Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center gap-1 cursor-pointer">
                        <Moon className="h-4 w-4" />
                        Dark
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="cursor-pointer">
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Sidebar</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="sidebar-collapsed" defaultChecked />
                  <Label htmlFor="sidebar-collapsed">Collapsed by default</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-4 text-sm font-medium">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-security" className="flex flex-col">
                        <span>Security alerts</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive emails for suspicious activities and security updates
                        </span>
                      </Label>
                    </div>
                    <Switch id="email-security" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-credentials" className="flex flex-col">
                        <span>Credential updates</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive emails when credentials are issued, updated, or about to expire
                        </span>
                      </Label>
                    </div>
                    <Switch id="email-credentials" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-sharing" className="flex flex-col">
                        <span>Sharing requests</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive emails when someone requests access to your credentials
                        </span>
                      </Label>
                    </div>
                    <Switch id="email-sharing" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-sm font-medium">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-all" className="flex flex-col">
                        <span>Enable push notifications</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications on your device
                        </span>
                      </Label>
                    </div>
                    <Switch id="push-all" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-security" className="flex flex-col">
                        <span>Security alerts</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive push notifications for suspicious activities
                        </span>
                      </Label>
                    </div>
                    <Switch id="push-security" disabled={!pushNotifications} defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-access" className="flex flex-col">
                        <span>Access requests</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive push notifications when someone requests access to your credentials
                        </span>
                      </Label>
                    </div>
                    <Switch id="push-access" disabled={!pushNotifications} defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-4 text-sm font-medium">Data Sharing</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="auto-approve" className="flex flex-col">
                        <span>Auto-approve trusted organizations</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Automatically approve requests from previously approved organizations
                        </span>
                      </Label>
                    </div>
                    <Switch id="auto-approve" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="expire-auto" className="flex flex-col">
                        <span>Auto-expire shared credentials</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Automatically revoke access after the expiration date
                        </span>
                      </Label>
                    </div>
                    <Switch id="expire-auto" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="zkp-default" className="flex flex-col">
                        <span>Use Zero Knowledge Proofs by default</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          When possible, share proofs instead of actual credentials
                        </span>
                      </Label>
                    </div>
                    <Switch id="zkp-default" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-sm font-medium">Activity Tracking</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="activity-log" className="flex flex-col">
                        <span>Activity logging</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Keep a record of all activities related to your account
                        </span>
                      </Label>
                    </div>
                    <Switch id="activity-log" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="location-tracking" className="flex flex-col">
                        <span>Location tracking</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Track location information for security purposes
                        </span>
                      </Label>
                    </div>
                    <Switch id="location-tracking" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-sm font-medium">Data Export</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download a copy of your data or request data deletion
                </p>
                <div className="flex gap-2">
                  <Button variant="outline">Export Data</Button>
                  <Button variant="outline">Request Data Deletion</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

