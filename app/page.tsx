"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Users, Zap, Shield, TrendingUp, Award, Mail, Phone, Database, Brain, Target, Sparkles, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

const features = [
  {
    icon: Brain,
    title: "AI Voice Agent",
    description: "Natural conversations with real-time sentiment analysis and intent detection"
  },
  {
    icon: Database,
    title: "19+ Data Sources",
    description: "LinkedIn, NPI Registry, Epic FHIR, social profiles, and healthcare databases"
  },
  {
    icon: Target,
    title: "Precision Scoring",
    description: "Multi-dimensional assessment with 40+ behavioral and contextual factors"
  },
  {
    icon: Sparkles,
    title: "100% Personalization",
    description: "Every outreach uniquely tailored based on candidate profile and preferences"
  },
  {
    icon: Zap,
    title: "87% Automation",
    description: "End-to-end recruitment workflow from sourcing to placement"
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description: "HIPAA compliant with automated credential verification and tracking"
  }
]

const stats = [
  { value: "2.4M+", label: "Healthcare Profiles" },
  { value: "92%", label: "Match Accuracy" },
  { value: "18 days", label: "Time to Fill" },
  { value: "14:1", label: "ROI" }
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg" />
              <span className="text-lg md:text-xl font-bold">Outreach Hunter Pro</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/outreach-pro">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Launch Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t pt-4"
            >
              <Link href="/outreach-pro" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Launch Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950 dark:via-background dark:to-pink-950" />
        <div className="container mx-auto px-4 py-12 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-3 md:mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 text-xs md:text-sm">
              AI-Powered Healthcare Recruitment
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 md:mb-6">
              Outreach Hunter Pro
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 px-2">
              Revolutionary AI recruitment platform with voice agents, 19+ data sources, and 100% personalized outreach for healthcare professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
              <Link href="/outreach-pro" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm md:text-base">
                  Experience Live Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-sm md:text-base" 
                onClick={() => {
                  const element = document.getElementById('features');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Mobile Optimized */}
      <section className="py-8 md:py-16 border-y bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section id="features" className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Complete Recruitment Automation Suite
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Everything you need to revolutionize healthcare recruitment with AI
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all hover:scale-105 border-purple-100 dark:border-purple-900">
                  <CardHeader className="pb-3 md:pb-6">
                    <feature.icon className="h-8 w-8 md:h-10 md:w-10 text-purple-600 mb-3 md:mb-4" />
                    <CardTitle className="text-base md:text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs sm:text-sm">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Voice Agent Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <Badge className="mb-3 md:mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 text-xs md:text-sm">
                AI Voice Technology
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                Conversational AI That Feels Human
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Our advanced voice agent conducts natural conversations with healthcare professionals, understanding context, detecting intent, and adapting responses in real-time.
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  "15-turn natural conversations",
                  "Real-time sentiment analysis",
                  "Intent detection & routing",
                  "Conversation coaching & insights",
                  "Multi-language support",
                  "HIPAA compliant recording"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2 md:space-x-3"
                  >
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm md:text-base">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative order-1 md:order-2"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-2xl flex items-center justify-center">
                <div className="text-center p-6 md:p-8">
                  <Phone className="h-16 w-16 md:h-24 md:w-24 text-purple-600 mx-auto mb-3 md:mb-4" />
                  <div className="text-lg md:text-2xl font-bold text-purple-600 mb-1 md:mb-2">Voice AI Active</div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    Conducting 1000+ conversations daily
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Sources Section - Mobile Optimized */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              19+ Integrated Data Sources
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Comprehensive candidate profiles from trusted healthcare databases
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {[
              "LinkedIn", "NPI Registry", "Epic FHIR", "Doximity",
              "State Boards", "DEA Database", "Facebook", "Indeed",
              "Monster", "CareerBuilder", "ZipRecruiter", "Glassdoor",
              "AMA Database", "AANP", "Medicare PECOS", "HealthGrades",
              "Vitals", "WebMD", "Custom APIs"
            ].map((source, index) => (
              <motion.div
                key={source}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-2 sm:p-3 md:p-4 hover:shadow-md transition-all hover:scale-105 border-purple-100 dark:border-purple-900">
                  <CardContent className="p-0">
                    <p className="text-xs md:text-sm font-medium">{source}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Automated End-to-End Workflow
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              From sourcing to placement in one seamless platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
            {[
              { step: 1, title: "Define Criteria", description: "Set clinical requirements and preferences" },
              { step: 2, title: "Source Candidates", description: "AI searches 19+ databases simultaneously" },
              { step: 3, title: "Enrich Profiles", description: "Gather comprehensive candidate data" },
              { step: 4, title: "Score & Rank", description: "Precision scoring with 40+ factors" },
              { step: 5, title: "Engage & Convert", description: "Personalized outreach via voice, email, SMS" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex sm:block items-center sm:items-start space-x-4 sm:space-x-0"
              >
                <div className="sm:text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-lg sm:mx-auto mb-0 sm:mb-4 flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm md:text-base">{item.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                {index < 4 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-4 text-purple-400" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section - Mobile Optimized */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <Card className="border-purple-100 dark:border-purple-900">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">87%</CardTitle>
                    <CardDescription className="text-xs md:text-sm">Automation Rate</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-purple-100 dark:border-purple-900">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">3.2x</CardTitle>
                    <CardDescription className="text-xs md:text-sm">Faster Placements</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-purple-100 dark:border-purple-900">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">92%</CardTitle>
                    <CardDescription className="text-xs md:text-sm">Match Accuracy</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="border-purple-100 dark:border-purple-900">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">14:1</CardTitle>
                    <CardDescription className="text-xs md:text-sm">ROI on Spend</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <Badge className="mb-3 md:mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs md:text-sm">
                Proven Results
              </Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
                Transform Your Recruitment Metrics
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Healthcare facilities using Outreach Hunter Pro see dramatic improvements in every recruitment metric that matters.
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  "Reduce time-to-fill from 55 to 18 days",
                  "Cut recruitment costs by 68%",
                  "Increase candidate quality scores by 45%",
                  "Achieve 92% first-year retention rate"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2 md:space-x-3"
                  >
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm md:text-base">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Ready to Revolutionize Your Healthcare Recruitment?
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto px-4">
              Experience the power of AI-driven recruitment with our interactive demo
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
              <Link href="/outreach-pro" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-purple-600 hover:bg-gray-100 text-sm md:text-base">
                  Launch Interactive Demo
                  <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20 text-sm md:text-base"
                onClick={() => window.open('https://calendly.com/demo', '_blank')}
              >
                Schedule Live Demo
                <Phone className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="py-6 md:py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg" />
              <span className="font-semibold text-sm md:text-base">Outreach Hunter Pro</span>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              © 2024 Outreach Hunter Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}