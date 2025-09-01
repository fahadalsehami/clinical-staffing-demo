"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  ArrowRight, Sparkles, Users, Zap, Target, 
  Phone, BarChart3, CheckCircle, Play, Menu, X,
  Brain, Database, Shield, Clock, TrendingUp,
  MessageSquare, Calendar, DollarSign, Globe,
  ChevronRight, Star, Award, Briefcase, 
  HeartHandshake, Rocket, ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'

const stats = [
  { value: '2.4M+', label: 'Healthcare Profiles', icon: Users, color: 'text-blue-600' },
  { value: '92%', label: 'Match Accuracy', icon: Target, color: 'text-green-600' },
  { value: '18 days', label: 'Time to Fill', icon: Clock, color: 'text-purple-600' },
  { value: '14:1', label: 'ROI', icon: TrendingUp, color: 'text-orange-600' }
]

const features = [
  {
    title: 'AI Voice Agent',
    description: 'Natural conversations that convert',
    details: 'Advanced NLP with sentiment analysis',
    icon: Phone,
    color: 'from-purple-500 to-pink-500',
    stats: '3.2x more interviews'
  },
  {
    title: 'Smart Sourcing',
    description: '19+ integrated data sources',
    details: 'LinkedIn, NPI, Epic FHIR & more',
    icon: Database,
    color: 'from-blue-500 to-cyan-500',
    stats: '2.4M+ profiles'
  },
  {
    title: 'Precision Matching',
    description: '40+ scoring factors analyzed',
    details: 'ML-powered candidate ranking',
    icon: Brain,
    color: 'from-green-500 to-emerald-500',
    stats: '92% accuracy'
  },
  {
    title: 'Auto Outreach',
    description: '100% personalized campaigns',
    details: 'Multi-channel engagement',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-500',
    stats: '67% response rate'
  }
]

const testimonials = [
  {
    quote: "Reduced our time-to-fill from 55 to 18 days. Game changer.",
    author: "Sarah Chen",
    role: "VP Talent, Cedar Health",
    metric: "67% faster hiring",
    rating: 5,
    image: "SC"
  },
  {
    quote: "The AI voice agent books more interviews than our entire team.",
    author: "Michael Torres",
    role: "CEO, MedStaff Pro",
    metric: "3.2x more placements",
    rating: 5,
    image: "MT"
  },
  {
    quote: "Finally, recruitment tech that actually works as promised.",
    author: "Dr. Emily Watson",
    role: "Chief Medical Officer",
    metric: "92% match accuracy",
    rating: 5,
    image: "EW"
  }
]

const workflowSteps = [
  { 
    step: 1, 
    title: 'Define Criteria', 
    description: 'Set your requirements',
    details: 'Specialty, location, experience level',
    icon: Target,
    duration: '2 min'
  },
  { 
    step: 2, 
    title: 'AI Sources', 
    description: 'Searches databases',
    details: '19+ integrated platforms',
    icon: Database,
    duration: 'Instant'
  },
  { 
    step: 3, 
    title: 'Smart Outreach', 
    description: 'Personalized messages',
    details: 'Email, SMS, voice, LinkedIn',
    icon: MessageSquare,
    duration: 'Automated'
  },
  { 
    step: 4, 
    title: 'Auto Schedule', 
    description: 'Books interviews',
    details: 'Calendar sync & reminders',
    icon: Calendar,
    duration: '24/7'
  }
]

const companies = [
  'Cedar Health', 'MedStaff Pro', 'Unity Medical', 
  'CarePoint', 'HealthBridge', 'MedTech Solutions'
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const { user, setUser } = useStore()
  
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleStartDemo = () => {
    setUser({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@outreachhunter.ai',
      role: 'recruiter'
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      {/* Enhanced Mobile Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md'
      } border-b border-gray-100 dark:border-gray-900`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg group-hover:scale-110 transition-transform" />
              <span className="text-lg sm:text-xl font-semibold">Outreach AI</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {['Features', 'Results', 'Pricing'].map((item) => (
                <Link 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all" />
                </Link>
              ))}
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/outreach-pro">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all">
                  Start Free
                </Button>
              </Link>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 relative">
                <span className={`absolute inset-x-0 top-0 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`absolute inset-x-0 top-2 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute inset-x-0 top-4 h-0.5 bg-gray-900 dark:bg-gray-100 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
            >
              <div className="px-4 py-4 space-y-1">
                {['Features', 'Results', 'Pricing'].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={`#${item.toLowerCase()}`} 
                      className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3 space-y-2 border-t border-gray-100 dark:border-gray-900 mt-3">
                  <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/outreach-pro" className="block" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Enhanced Hero Section - Mobile Optimized */}
      <section ref={heroRef} className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative">
        <motion.div style={{ opacity, scale }} className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="inline-flex mb-4 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300 border-0 px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1.5" />
                <span className="text-xs sm:text-sm">AI-Powered Recruitment</span>
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
                Find healthcare talent
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block sm:inline"> 3x faster</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                AI voice agents and smart automation that source, screen, and schedule candidates while you sleep. Join 500+ healthcare facilities already transforming recruitment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link href="/outreach-pro" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all text-sm sm:text-base h-11 sm:h-12"
                    onClick={handleStartDemo}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                  No credit card
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                  14-day trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                  5 min setup
                </div>
              </div>
            </motion.div>
            
            {/* Mobile-Optimized Live Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:block"
            >
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-4 sm:p-6 md:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 rounded-2xl" />
                
                <div className="relative space-y-3 sm:space-y-4 md:space-y-6">
                  {[
                    { label: 'Active Campaigns', value: '24', change: '↑ 12%', status: 'Live' },
                    { label: 'Candidates Reached', value: '1,847', subtext: '342 responded' },
                    { label: 'Interviews Today', value: '67', subtext: 'Next: 2:30 PM' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white dark:bg-gray-900 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                        {stat.status && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300 text-xs px-2 py-0.5">
                            {stat.status}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                          {stat.subtext && (
                            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">{stat.subtext}</div>
                          )}
                        </div>
                        {stat.change && (
                          <div className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">{stat.change}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Social Proof Bar - Mobile Optimized */}
      <section className="py-6 sm:py-8 border-y border-gray-100 dark:border-gray-900 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-0 sm:hidden">
            <span className="text-xs text-gray-600 dark:text-gray-400">Trusted by 500+ healthcare organizations</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400">Trusted by leading healthcare organizations</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 sm:gap-8">
              {companies.map((company) => (
                <span key={company} className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 opacity-70 hover:opacity-100 transition-opacity">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section - Mobile Grid */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
              >
                <div className="inline-flex p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-900 rounded-full mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                  <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 ${stat.color}`} />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section - Mobile Cards */}
      <section id="features" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4"
            >
              Everything you need to scale
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
            >
              One platform that handles sourcing, screening, outreach, and scheduling automatically
            </motion.p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                className="cursor-pointer"
              >
                <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                  activeFeature === index ? 'ring-2 ring-purple-600' : ''
                }`}>
                  <CardContent className="p-4 sm:p-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1.5 sm:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {feature.description}
                    </p>
                    <AnimatePresence>
                      {activeFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-gray-500 dark:text-gray-500 mb-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                            {feature.details}
                          </p>
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300 text-xs">
                            {feature.stats}
                          </Badge>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Workflow Section - Mobile Timeline */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              From search to hire in 4 steps
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 px-4">
              Our AI handles the heavy lifting while you focus on making great hires
            </p>
          </div>
          
          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4">
            {workflowSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-purple-600 to-pink-600 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</h3>
                      <Badge variant="outline" className="text-xs">{item.duration}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{item.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden md:grid md:grid-cols-4 gap-8 relative">
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600" />
            
            {workflowSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-full shadow-lg mx-auto mb-4 flex items-center justify-center relative z-10 group hover:scale-110 transition-transform">
                  <item.icon className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{item.details}</p>
                <Badge variant="outline" className="mt-2 text-xs">{item.duration}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials - Mobile Swipe */}
      <section id="results" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              Real results from real recruiters
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="touch-pan-x"
              >
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonials[activeTestimonial].image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start space-x-0.5 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300 text-xs">
                          {testimonials[activeTestimonial].metric}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-base sm:text-lg md:text-xl text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 italic leading-relaxed">
                      "{testimonials[activeTestimonial].quote}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                          {testimonials[activeTestimonial].author}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {testimonials[activeTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile-Friendly Indicators */}
            <div className="flex justify-center items-center space-x-3 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`transition-all ${
                    index === activeTestimonial 
                      ? 'w-8 h-2 bg-purple-600 rounded-full' 
                      : 'w-2 h-2 bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="inline-flex mb-4 bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300">
              <Rocket className="w-3 h-3 mr-1.5" />
              Limited Time Offer
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              Ready to transform your recruitment?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 px-4">
              Join 500+ healthcare organizations already using AI to hire faster and smarter
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link href="/outreach-pro" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all h-12"
                  onClick={handleStartDemo}
                >
                  Start 14-Day Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12">
                <Phone className="mr-2 h-4 w-4" />
                Book Demo Call
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                No credit card required
              </span>
              <span className="flex items-center">
                <Shield className="h-4 w-4 text-blue-500 mr-1" />
                SOC2 Compliant
              </span>
              <span className="flex items-center">
                <HeartHandshake className="h-4 w-4 text-purple-500 mr-1" />
                Cancel anytime
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer - Mobile Optimized */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Footer */}
          <div className="md:hidden space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg" />
                <span className="text-lg font-semibold">Outreach AI</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                AI-powered healthcare recruitment that actually works.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Product</h4>
                <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <li><Link href="#features" className="hover:text-gray-900 dark:hover:text-gray-100">Features</Link></li>
                  <li><Link href="#pricing" className="hover:text-gray-900 dark:hover:text-gray-100">Pricing</Link></li>
                  <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">API</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Company</h4>
                <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">About</Link></li>
                  <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Blog</Link></li>
                  <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Careers</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="text-center pt-6 border-t border-gray-100 dark:border-gray-900">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                © 2024 Outreach AI. All rights reserved.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="#" className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Privacy
                </Link>
                <Link href="#" className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Terms
                </Link>
                <Link href="#" className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                  Security
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="hidden md:grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg" />
                <span className="text-lg font-semibold">Outreach AI</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered healthcare recruitment that actually works.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="#features" className="hover:text-gray-900 dark:hover:text-gray-100">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-gray-900 dark:hover:text-gray-100">Pricing</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">About</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Blog</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Privacy</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Terms</Link></li>
                <li><Link href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="hidden md:flex mt-12 pt-8 border-t border-gray-100 dark:border-gray-900 justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Outreach AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Globe className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
              <Award className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
              <Briefcase className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Video Modal - Mobile Fullscreen */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <Play className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                <span className="ml-3 sm:ml-4 text-sm sm:text-base text-gray-600 dark:text-gray-400">Demo video</span>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setIsVideoPlaying(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}