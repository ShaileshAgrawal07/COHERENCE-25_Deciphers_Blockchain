"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, ChevronRight, Wallet, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      {/* Glowing orb effects */}
      <div className="absolute top-20 -left-20 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="absolute bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[100px]" />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-75 animate-pulse" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-black/80 text-white">
                <Shield className="h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Block<span className="text-blue-400">ID</span>
            </h1>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <p className="text-xl font-medium text-blue-200 sm:text-2xl">
            Decentralized Digital Identity for Secure Access
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 max-w-2xl"
        >
          <p className="text-lg text-gray-300">
            Take control of your digital identity with blockchain technology. Securely manage, share, and verify your
            credentials without compromising your privacy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white"
            onClick={() => router.push("/dashboard")}
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3"
        >
          {[
            {
              title: "Secure Verification",
              description: "Verify your identity with blockchain technology for unmatched security and privacy.",
            },
            {
              title: "Selective Disclosure",
              description: "Share only what's necessary with Zero Knowledge Proofs while keeping your data private.",
            },
            {
              title: "Full Control",
              description: "Maintain complete control over who can access your credentials and for how long.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
            >
              <h3 className="mb-3 text-xl font-medium text-white">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        <div className="mt-20 text-sm text-gray-400">© 2023 BlockID. All rights reserved.</div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-10 h-20 w-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-float-slow" />
      <div className="absolute bottom-1/3 right-10 h-16 w-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-float-medium" />
      <div className="absolute top-2/3 left-1/4 h-12 w-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-float-fast" />
    </div>
  )
}

