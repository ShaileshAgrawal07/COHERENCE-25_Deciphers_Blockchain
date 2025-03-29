"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, UserPlus, Shield, User, FileCheck, Eye, Trash2 } from "lucide-react"
import { getLogs, addLog, clearLogs } from "../app/utils/storage"

export function AdminPanel({ contract, account }) {
  const [userAddress, setUserAddress] = useState("")
  const [roleType, setRoleType] = useState("issuer")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState({
    grant: false,
    revoke: null // stores the address being revoked
  })
  const [success, setSuccess] = useState(false)
  const [logs, setLogs] = useState([])

  // Fetch all users with their roles
  const fetchUsers = async () => {
    if (!contract) return

    try {
      // Get all role events to build user list
      const issuerFilter = contract.filters.RoleGranted(ethers.keccak256(ethers.toUtf8Bytes("ISSUER_ROLE")))
      const verifierFilter = contract.filters.RoleGranted(ethers.keccak256(ethers.toUtf8Bytes("VERIFIER_ROLE")))
      const userFilter = contract.filters.RoleGranted(ethers.keccak256(ethers.toUtf8Bytes("USER_ROLE")))

      const [issuerEvents, verifierEvents, userEvents] = await Promise.all([
        contract.queryFilter(issuerFilter),
        contract.queryFilter(verifierFilter),
        contract.queryFilter(userFilter)
      ])

      // Combine all events and organize by address
      const userMap = new Map()

      // Process each event type
      const processEvents = (events, role) => {
        events.forEach(event => {
          const address = event.args.account
          if (!userMap.has(address)) {
            userMap.set(address, {
              address,
              roles: [],
              did: `did:eth:${address}`,
              credentialCount: 0 // This would need to be fetched separately
            })
          }
          if (!userMap.get(address).roles.includes(role)) {
            userMap.get(address).roles.push(role)
          }
        })
      }

      processEvents(issuerEvents, "ISSUER_ROLE")
      processEvents(verifierEvents, "VERIFIER_ROLE")
      processEvents(userEvents, "USER_ROLE")

      // Convert map to array
      setUsers(Array.from(userMap.values()))
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    fetchUsers()
    setLogs(getLogs('adminLogs'))
  }, [contract])

  const grantRole = async () => {
    if (!contract || !userAddress) return

    setLoading({ ...loading, grant: true })
    setSuccess(false)

    try {
      let roleBytes
      let roleName

      if (roleType === "issuer") {
        roleBytes = ethers.keccak256(ethers.toUtf8Bytes("ISSUER_ROLE"))
        roleName = "ISSUER_ROLE"
      } else if (roleType === "verifier") {
        roleBytes = ethers.keccak256(ethers.toUtf8Bytes("VERIFIER_ROLE"))
        roleName = "VERIFIER_ROLE"
      } else {
        roleBytes = ethers.keccak256(ethers.toUtf8Bytes("USER_ROLE"))
        roleName = "USER_ROLE"
      }

      const tx = await contract.grantRole(roleBytes, userAddress)
      await tx.wait()

      // Add to logs
      addLog('adminLogs', {
        type: 'roleGranted',
        role: roleName,
        address: userAddress,
        timestamp: Date.now(),
        txHash: tx.hash
      })

      // Update UI
      await fetchUsers() // Refresh the user list

      setSuccess(true)
      setUserAddress("")
      setLogs(getLogs('adminLogs'))
    } catch (error) {
      console.error("Error granting role:", error)
      alert("Failed to grant role. Please try again.")
    } finally {
      setLoading({ ...loading, grant: false })
    }
  }

  const revokeRole = async (address, role) => {
    if (!contract) return

    setLoading({ ...loading, revoke: address })

    try {
      let roleBytes
      if (role === "ISSUER_ROLE") {
        roleBytes = ethers.keccak256(ethers.toUtf8Bytes("ISSUER_ROLE"))
      } else if (role === "VERIFIER_ROLE") {
        roleBytes = ethers.keccak256(ethers.toUtf8Bytes("VERIFIER_ROLE"))
      } else {
        roleBytes = ethers.keccak256(ethers.toUtf8Bytes("USER_ROLE"))
      }

      const tx = await contract.revokeRole(roleBytes, address)
      await tx.wait()

      // Add to logs
      addLog('adminLogs', {
        type: 'roleRevoked',
        role: role,
        address: address,
        timestamp: Date.now(),
        txHash: tx.hash
      })

      // Update UI
      await fetchUsers() // Refresh the user list
      setLogs(getLogs('adminLogs'))
    } catch (error) {
      console.error("Error revoking role:", error)
      alert("Failed to revoke role. Please try again.")
    } finally {
      setLoading({ ...loading, revoke: null })
    }
  }

  const getRoleBadges = (roles) => {
    return roles.map((role) => {
      let color = "bg-gray-100 text-gray-800"
      let icon = <User className="mr-1 h-3 w-3" />

      if (role === "ISSUER_ROLE") {
        color = "bg-blue-100 text-blue-800"
        icon = <FileCheck className="mr-1 h-3 w-3" />
      } else if (role === "VERIFIER_ROLE") {
        color = "bg-green-100 text-green-800"
        icon = <Eye className="mr-1 h-3 w-3" />
      } else if (role === "DEFAULT_ADMIN_ROLE") {
        color = "bg-purple-100 text-purple-800"
        icon = <Shield className="mr-1 h-3 w-3" />
      }

      return (
        <span
          key={role}
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color} mr-1`}
        >
          {icon}
          {role.replace("_ROLE", "")}
        </span>
      )
    })
  }

  const clearAdminLogs = () => {
    clearLogs('adminLogs')
    setLogs([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Admin Panel</CardTitle>
          <CardDescription>Manage user roles and system settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
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
                <Label htmlFor="role-type">Role Type</Label>
                <Select value={roleType} onValueChange={setRoleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="issuer">Issuer</SelectItem>
                    <SelectItem value="verifier">Verifier</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={grantRole} 
                  disabled={loading.grant || !userAddress} 
                  className="w-full"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  {loading.grant ? "Granting..." : "Grant Role"}
                </Button>
              </div>
            </div>

            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Role has been granted successfully.</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage all users in the system</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={clearAdminLogs}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Logs
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>DID</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Credentials</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.address}>
                  <TableCell className="font-mono">
                    {user.address.substring(0, 6)}...{user.address.substring(user.address.length - 4)}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{user.did}</TableCell>
                  <TableCell>{getRoleBadges(user.roles)}</TableCell>
                  <TableCell>{user.credentialCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {user.roles.includes("ISSUER_ROLE") && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => revokeRole(user.address, "ISSUER_ROLE")}
                          disabled={loading.revoke === user.address}
                        >
                          {loading.revoke === user.address ? "Revoking..." : "Revoke Issuer"}
                        </Button>
                      )}
                      {user.roles.includes("VERIFIER_ROLE") && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => revokeRole(user.address, "VERIFIER_ROLE")}
                          disabled={loading.revoke === user.address}
                        >
                          {loading.revoke === user.address ? "Revoking..." : "Revoke Verifier"}
                        </Button>
                      )}
                      {user.roles.includes("USER_ROLE") && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => revokeRole(user.address, "USER_ROLE")}
                          disabled={loading.revoke === user.address}
                        >
                          {loading.revoke === user.address ? "Revoking..." : "Revoke User"}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Management History</CardTitle>
          <CardDescription>Recent role assignments and revocations</CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <div className="space-y-4">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                  {log.type === 'roleGranted' ? (
                    <UserPlus className="h-8 w-8 text-green-500" />
                  ) : (
                    <Trash2 className="h-8 w-8 text-red-500" />
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">
                        {log.type === 'roleGranted' ? 'Role Granted' : 'Role Revoked'}: {log.role}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {log.type === 'roleGranted' ? 'To' : 'From'}: {log.address.substring(0, 6)}...{log.address.substring(log.address.length - 4)}
                    </p>
                    <p className="text-sm font-mono text-xs">Tx: {log.txHash.substring(0, 12)}...</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Shield className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Role Management History</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You haven't granted or revoked any roles yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}