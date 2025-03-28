"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Activity, BadgeCheck, Home, Key, Lock, LogOut, Settings, Shield, User, HelpCircle } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("home")

  // Update active section based on current path
  useEffect(() => {
    if (pathname === "/") {
      setActiveSection("home")
    } else if (pathname === "/profile") {
      setActiveSection("profile")
    } else if (pathname === "/credentials") {
      setActiveSection("credentials")
    } else if (pathname === "/sharing") {
      setActiveSection("sharing")
    } else if (pathname === "/security") {
      setActiveSection("security")
    } else if (pathname === "/activity") {
      setActiveSection("activity")
    } else if (pathname === "/settings") {
      setActiveSection("settings")
    } else if (pathname === "/help") {
      setActiveSection("help")
    }
  }, [pathname])

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, path: "/" },
    { id: "profile", label: "Profile & Identity", icon: User, path: "/profile" },
    { id: "credentials", label: "Credentials", icon: BadgeCheck, path: "/credentials" },
    { id: "sharing", label: "Sharing & Access", icon: Key, path: "/sharing" },
    { id: "security", label: "Security", icon: Shield, path: "/security" },
    { id: "activity", label: "Activity Log", icon: Activity, path: "/activity" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
    { id: "help", label: "Help & Support", icon: HelpCircle, path: "/help" },
  ]

  const handleLogout = () => {
    router.push("/") //router.push("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen, w-screen">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold">BlockID</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <Link href={item.path} className="w-full">
                    <SidebarMenuButton isActive={activeSection === item.id} tooltip={item.label}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-sidebar-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Verified User</span>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/settings">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/security">
                  <DropdownMenuItem>
                    <Lock className="mr-2 h-4 w-4" />
                    <span>Security</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">
                {menuItems.find((item) => item.id === activeSection)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={() => router.push("/notifications")}>
                <Bell className="h-5 w-5" />
              </Button>
              <ModeToggle />
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-9">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function Bell(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

