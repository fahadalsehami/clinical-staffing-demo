"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Users, Zap, Shield, TrendingUp, Award, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Zap,
    title: "AI-Powered Matching",
    description: "Advanced algorithms match healthcare professionals with ideal opportunities based on skills, experience, and preferences"
  },
  {
    icon: Shield,
    title: "Automated Verification",
    description: "Instant credential verification including licenses, certifications, DEA registrations, and background checks"
  },
  {
    icon: Mail,
    title: "Smart Presentations",
    description: "Professional candidate presentations sent directly to clients with real-time engagement tracking"
  },
  {
    icon: Users,
    title: "Complete Workflow",
    description: "End-to-end platform from initial application through placement and onboarding"
  },
  {
    icon: TrendingUp,
    title: "Data Analytics",
    description: "Comprehensive analytics dashboard tracking placement rates, time-to-fill, and revenue metrics"
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Rigorous vetting process ensures only top-tier healthcare professionals in your talent pool"
  }
]

const stats = [
  { value: "500+", label: "Healthcare Professionals" },
  { value: "95%", label: "Match Accuracy" },
  { value: "48hrs", label: "Average Time to Fill" },
  { value: "98%", label: "Client Satisfaction" }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg" />
              <span className="text-xl font-bold">Clinical Staffing AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/outreach">
                <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                  🎯 Outreach Hunter
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/jobs">
                <Button variant="ghost">Jobs</Button>
              </Link>
              <Link href="/upload">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-950 dark:via-background dark:to-cyan-950" />
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4" variant="secondary">
              Powered by Advanced AI
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Transform Healthcare Staffing with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Revolutionary platform that automates credential verification, matches top talent with perfect opportunities, and streamlines the entire placement process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/client">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Client Portal
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Healthcare Staffing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive platform designed to streamline every aspect of healthcare recruitment and placement
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, Efficient Workflow
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From candidate onboarding to successful placement in just a few steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Upload Resume", description: "Candidates upload resumes and credentials" },
              { step: 2, title: "AI Analysis", description: "Our AI extracts and verifies all information" },
              { step: 3, title: "Smart Matching", description: "Algorithm matches with perfect opportunities" },
              { step: 4, title: "Client Review", description: "Clients receive and review presentations" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-4 text-muted-foreground" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Clinical Staffing AI?
              </h2>
              <div className="space-y-4">
                {[
                  "Reduce time-to-fill by up to 70%",
                  "Automated credential verification saves hours",
                  "Higher quality placements with AI matching",
                  "Real-time tracking and analytics",
                  "Seamless client communication portal",
                  "Compliance-ready documentation"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold text-primary mb-2">98%</div>
                  <div className="text-lg font-semibold">Success Rate</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Industry-leading placement success
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Healthcare Staffing?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join hundreds of healthcare facilities and professionals using our AI-powered platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg" />
              <span className="font-semibold">Clinical Staffing AI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Clinical Staffing AI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}