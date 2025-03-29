"use client"

import React from "react"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { BookOpen, FileText, HelpCircle, Mail, MessageSquare, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      question: "What is blockchain identity verification?",
      answer:
        "Blockchain identity verification is a secure method of verifying your identity using blockchain technology. It creates an immutable record of your identity credentials that can be shared selectively with third parties without revealing all your personal information.",
    },
    {
      question: "How secure is my data on the blockchain?",
      answer:
        "Your data is highly secure on the blockchain. We use advanced encryption techniques to protect your information, and the decentralized nature of blockchain means there's no single point of failure. Your actual personal data is not stored directly on the blockchain - only cryptographic proofs that verify the authenticity of your credentials.",
    },
    {
      question: "What are Zero Knowledge Proofs?",
      answer:
        "Zero Knowledge Proofs (ZKPs) allow you to prove certain facts about your credentials without revealing the actual data. For example, you can prove you're over 18 without revealing your exact birthdate. This technology enhances privacy while still allowing necessary verification.",
    },
    {
      question: "How do I share my credentials with third parties?",
      answer:
        "To share credentials, navigate to the Sharing & Access section, select the credential you want to share, choose the recipient, set permissions and expiration date, and send the request. The recipient will receive a secure link to access only the information you've authorized them to see.",
    },
    {
      question: "What happens if I lose access to my account?",
      answer:
        "If you lose access to your account, you can use your recovery key to regain access. This is a unique key generated when you set up your account. It's crucial to store this key in a secure location. If you don't have your recovery key, you'll need to go through an identity verification process with our support team.",
    },
    {
      question: "How often should I update my credentials?",
      answer:
        "You should update your credentials whenever there are changes to your personal information or when credentials expire. Some credentials like driver's licenses or passports should be updated when they're renewed. We'll send you notifications when credentials are approaching expiration.",
    },
    {
      question: "Can I revoke access to my shared credentials?",
      answer:
        "Yes, you can revoke access to shared credentials at any time. Go to the Sharing & Access section, find the organization or individual you've shared with, and click 'Revoke'. The revocation takes effect immediately, and they will no longer have access to your information.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 p-10">
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions and get support</p>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for help topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10 w-full"
        />
      </div>

      <Tabs defaultValue="faq">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about blockchain identity</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Can't find what you're looking for? Contact our support team.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guides</CardTitle>
              <CardDescription>Step-by-step guides to help you use the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Getting Started Guide</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Learn how to set up your blockchain identity and verify your first credential
                      </p>
                      <Button variant="link" className="px-0 py-1 h-auto">
                        Read Guide
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sharing Credentials Securely</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Learn how to share your credentials with third parties while maintaining privacy
                      </p>
                      <Button variant="link" className="px-0 py-1 h-auto">
                        Read Guide
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Understanding Zero Knowledge Proofs</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Learn how to use Zero Knowledge Proofs to share information without revealing sensitive details
                      </p>
                      <Button variant="link" className="px-0 py-1 h-auto">
                        Read Guide
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Security Best Practices</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Learn how to keep your blockchain identity secure with best practices
                      </p>
                      <Button variant="link" className="px-0 py-1 h-auto">
                        Read Guide
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Guides
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4 text-center">
                    <Mail className="mx-auto h-8 w-8 text-primary" />
                    <h3 className="mt-2 font-medium">Email Support</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Send us an email and we'll respond within 24 hours
                    </p>
                    <Button variant="outline" className="mt-4">
                      support@blockid.com
                    </Button>
                  </div>

                  <div className="rounded-lg border p-4 text-center">
                    <MessageSquare className="mx-auto h-8 w-8 text-primary" />
                    <h3 className="mt-2 font-medium">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mt-1">Chat with our support team in real-time</p>
                    <Button className="mt-4">Start Chat</Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 font-medium">Send a Message</h3>
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Your email" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="account">Account Issues</SelectItem>
                          <SelectItem value="credentials">Credential Problems</SelectItem>
                          <SelectItem value="sharing">Sharing & Access</SelectItem>
                          <SelectItem value="security">Security Concerns</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Describe your issue in detail..." rows={5} />
                    </div>

                    <Button type="submit">Send Message</Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  )
}

