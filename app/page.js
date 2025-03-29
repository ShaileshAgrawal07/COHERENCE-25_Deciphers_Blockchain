"use client"

import { useState, useEffect } from "react"
import { getContract } from "@/lib/contract"
import { connectWallet } from "@/lib/web3"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertCircle } from "lucide-react"
import { UserDashboard } from "@/components/user-dashboard"
import { IssuerPortal } from "@/components/issuer-portal"
import { VerifierInterface } from "@/components/verifier-interface"
import { AdminPanel } from "@/components/admin-panel"
import { ethers } from "ethers" // Import ethers

export default function Home() {
  const [contract, setContract] = useState(null)
  const [account, setAccount] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(null)
  const [hasDID, setHasDID] = useState(false)

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        // Check if already connected
        if (window.ethereum) {
          const connection = await connectWallet(true) // Skip permission request on initial load

          if (connection) {
            const { signer, address } = connection
            const contractInstance = getContract(signer)

            setContract(contractInstance)
            setAccount(address)
            setIsConnected(true)

            // Check if user has DID
            try {
              const did = await contractInstance.DIDs(address)
              setHasDID(did && did.length > 0)
            } catch (error) {
              console.error("Error checking DID:", error)
            }

            // Check roles
            try {
              const USER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("USER_ROLE"))
              const ISSUER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ISSUER_ROLE"))
              const VERIFIER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("VERIFIER_ROLE"))
              const ADMIN_ROLE = await contractInstance.DEFAULT_ADMIN_ROLE()

              const isUser = await contractInstance.hasRole(USER_ROLE, address)
              const isIssuer = await contractInstance.hasRole(ISSUER_ROLE, address)
              const isVerifier = await contractInstance.hasRole(VERIFIER_ROLE, address)
              const isAdmin = await contractInstance.hasRole(ADMIN_ROLE, address)

              if (isAdmin) setUserRole("admin")
              else if (isIssuer) setUserRole("issuer")
              else if (isVerifier) setUserRole("verifier")
              else if (isUser) setUserRole("user")
              else setUserRole(null)
            } catch (error) {
              console.error("Error checking roles:", error)
            }
          }
        }
      } catch (error) {
        console.error("Error initializing wallet:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeWallet()

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload()
      })

      window.ethereum.on("chainChanged", () => {
        window.location.reload()
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners()
      }
    }
  }, [])

  const handleConnectWallet = async () => {
    try {
      setLoading(true)
      const connection = await connectWallet()

      if (connection) {
        const { signer, address } = connection
        const contractInstance = getContract(signer)

        setContract(contractInstance)
        setAccount(address)
        setIsConnected(true)

        // Check if user has DID
        try {
          const did = await contractInstance.DIDs(address)
          setHasDID(did && did.length > 0)
        } catch (error) {
          console.error("Error checking DID:", error)
        }

        // Check roles
        try {
          const USER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("USER_ROLE"))
          const ISSUER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ISSUER_ROLE"))
          const VERIFIER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("VERIFIER_ROLE"))
          const ADMIN_ROLE = await contractInstance.DEFAULT_ADMIN_ROLE()

          const isUser = await contractInstance.hasRole(USER_ROLE, address)
          const isIssuer = await contractInstance.hasRole(ISSUER_ROLE, address)
          const isVerifier = await contractInstance.hasRole(VERIFIER_ROLE, address)
          const isAdmin = await contractInstance.hasRole(ADMIN_ROLE, address)

          if (isAdmin) setUserRole("admin")
          else if (isIssuer) setUserRole("issuer")
          else if (isVerifier) setUserRole("verifier")
          else if (isUser) setUserRole("user")
          else setUserRole(null)
        } catch (error) {
          console.error("Error checking roles:", error)
        }
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setLoading(false)
    }
  }

  const createDID = async () => {
    if (!contract) return

    try {
      const tx = await contract.createDID()
      await tx.wait()
      setHasDID(true)
      setUserRole("user")
    } catch (error) {
      console.error("Error creating DID:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Decentralized Identity System</h1>
          </div>
          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:block">
                  <p className="text-sm font-medium">
                    {account.substring(0, 6)}...{account.substring(account.length - 4)}
                  </p>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
            ) : (
              <Button onClick={handleConnectWallet}>Connect Wallet</Button>
            )}
          </div>
        </div>
      </header>

      <div className="container flex-1 py-6 md:py-10">
        {!isConnected ? (
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>Welcome to Decentralized Identity</CardTitle>
              <CardDescription>Connect your wallet to get started with managing your digital identity.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={handleConnectWallet}>Connect Wallet</Button>
            </CardContent>
          </Card>
        ) : !hasDID && userRole !== "issuer" && userRole !== "verifier" && userRole !== "admin" ? (
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>Create Your Digital Identity</CardTitle>
              <CardDescription>You need to create a Decentralized Identifier (DID) to use this system.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={createDID}>Create DID</Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue={userRole || "user"} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="user" disabled={!hasDID && userRole !== "admin"}>
                User Dashboard
              </TabsTrigger>
              <TabsTrigger value="issuer" disabled={userRole !== "issuer" && userRole !== "admin"}>
                Issuer Portal
              </TabsTrigger>
              <TabsTrigger value="verifier" disabled={userRole !== "verifier" && userRole !== "admin"}>
                Verifier Interface
              </TabsTrigger>
              <TabsTrigger value="admin" disabled={userRole !== "admin"}>
                Admin Panel
              </TabsTrigger>
            </TabsList>
            <TabsContent value="user" className="space-y-4">
              {hasDID || userRole === "admin" ? (
                <UserDashboard contract={contract} account={account} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      Access Denied
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You need to create a DID first to access the user dashboard.</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={createDID}>Create DID</Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="issuer" className="space-y-4">
              {userRole === "issuer" || userRole === "admin" ? (
                <IssuerPortal contract={contract} account={account} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      Access Denied
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You don't have issuer permissions to access this section.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="verifier" className="space-y-4">
              {userRole === "verifier" || userRole === "admin" ? (
                <VerifierInterface contract={contract} account={account} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      Access Denied
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You don't have verifier permissions to access this section.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="admin" className="space-y-4">
              {userRole === "admin" ? (
                <AdminPanel contract={contract} account={account} />
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Access Denied
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>You don't have admin permissions to access this section.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </main>
  )
}

