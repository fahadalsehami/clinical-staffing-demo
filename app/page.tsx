"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Sparkles, Users, Zap, Target, 
  Phone, BarChart3, CheckCircle, Play, Menu, X,
  Brain, Database, Shield, Clock, TrendingUp,
  MessageSquare, Calendar, DollarSign, Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useStore } from '@/lib/store'

const stats = [
  { value: '2.4M+', label: 'Healthcare Profiles', icon: Users },
  { value: '92%', label: 'Match Accuracy', icon: Target },
  { value: '18 days', label: 'Avg Time to Fill', icon: Clock },
  { value: '14:1', label: 'ROI', icon: TrendingUp }
]

const features = [
  {
    title: 'AI Voice Agent',
    description: 'Natural conversations that convert',
    icon: Phone,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Smart Sourcing',
    description: '19+ integrated data sources',
    icon: Database,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Precision Matching',
    description: '40+ scoring factors analyzed',
    icon: Brain,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Automated Outreach',
    description: '100% personalized campaigns',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-500'
  }
]

const testimonials = [
  {
    quote: "Reduced our time-to-fill from 55 to 18 days. Game changer.",
    author: "Sarah Chen",
    role: "VP Talent, Cedar Health",
    metric: "67% faster hiring"
  },
  {
    quote: "The AI voice agent books more interviews than our entire team.",
    author: "Michael Torres",
    role: "CEO, MedStaff Pro",
    metric: "3.2x more placements"
  },
  {
    quote: "Finally, recruitment tech that actually works as promised.",
    author: "Dr. Emily Watson",
    role: "Chief Medical Officer",
    metric: "92% match accuracy"
  }
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { user, setUser } = useStore()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleStartDemo = () => {
    // Set demo user
    setUser({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@outreachhunter.ai',
      role: 'recruiter'
    })
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation - Minimalist */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg" />
              <span className="text-xl font-semibold">Outreach AI</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition">
                Features
              </Link>
              <Link href="#results" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition">
                Results
              </Link>
              <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition">
                Pricing
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/outreach-pro">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Start Free
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900"
            >
              <div className="px-4 py-4 space-y-3">
                <Link href="#features" className="block text-sm text-gray-600 dark:text-gray-400">
                  Features
                </Link>
                <Link href="#results" className="block text-sm text-gray-600 dark:text-gray-400">
                  Results
                </Link>
                <Link href="#pricing" className="block text-sm text-gray-600 dark:text-gray-400">
                  Pricing
                </Link>
                <div className="pt-3 space-y-2">
                  <Link href="/login" className="block">
                    <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/outreach-pro" className="block">
                    <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      Start Free
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Minimalist */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300 border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered Recruitment
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Find healthcare talent
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> 3x faster</span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                AI voice agents and smart automation that source, screen, and schedule candidates while you sleep. Join 500+ healthcare facilities already transforming recruitment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/outreach-pro">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleStartDemo}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch 2-min Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  14-day free trial
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Interactive Demo Preview */}
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl animate-pulse" />
                
                {/* Live Stats Animation */}
                <div className="relative space-y-6">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns</span>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300">
                        Live
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">24</div>
                    <div className="text-sm text-green-600 dark:text-green-400">↑ 12% this week</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Candidates Reached</span>
                      <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-900" />
                        ))}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">1,847</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">342 responded</div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Interviews Scheduled</span>
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">67</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Next: Today 2:30 PM</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <span className="text-sm text-gray-600 dark:text-gray-400">Trusted by leading healthcare organizations</span>
            {['Cedar Health', 'MedStaff Pro', 'Unity Medical', 'CarePoint', 'HealthBridge'].map((company) => (
              <span key={company} className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Minimalist */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Minimalist Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Everything you need to scale recruitment
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              One platform that handles sourcing, screening, outreach, and scheduling automatically
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Visual Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              From search to hire in 4 steps
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our AI handles the heavy lifting while you focus on making great hires
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600" />
            
            {[
              { step: 1, title: 'Define Criteria', description: 'Set your requirements and preferences', icon: Target },
              { step: 2, title: 'AI Sources', description: 'Searches 19+ databases instantly', icon: Database },
              { step: 3, title: 'Smart Outreach', description: 'Personalized messages that convert', icon: MessageSquare },
              { step: 4, title: 'Auto Schedule', description: 'Books interviews automatically', icon: Calendar }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-full shadow-lg mx-auto mb-4 flex items-center justify-center relative z-10">
                  <item.icon className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Rotating Cards */}
      <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
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
              >
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-1 mb-4">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-xl text-gray-900 dark:text-gray-100 mb-6 italic">
                      "{testimonials[activeTestimonial].quote}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {testimonials[activeTestimonial].author}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonials[activeTestimonial].role}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-300">
                        {testimonials[activeTestimonial].metric}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeTestimonial 
                      ? 'bg-purple-600' 
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimalist */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to transform your recruitment?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Join 500+ healthcare organizations already using AI to hire faster and smarter
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/outreach-pro">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={handleStartDemo}
              >
                Start 14-Day Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Phone className="mr-2 h-4 w-4" />
              Book a Demo Call
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            No credit card required • Setup in 5 minutes • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer - Minimalist */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
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
          
          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Outreach AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Globe className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
              <DollarSign className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <Play className="h-16 w-16 text-gray-400" />
                <span className="ml-4 text-gray-600 dark:text-gray-400">Demo video placeholder</span>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => setIsVideoPlaying(false)}>
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