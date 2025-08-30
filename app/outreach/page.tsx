"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Phone,
  Mic,
  MicOff,
  Mail,
  MessageSquare,
  Linkedin,
  Facebook,
  Twitter,
  Globe,
  Database,
  Brain,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Clock,
  Activity,
  Target,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Award,
  AlertCircle,
  Play,
  Pause,
  PhoneCall,
  UserPlus,
  Filter,
  Download,
  Send,
  BarChart3,
  Eye,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

const demoProspects = [
  {
    id: 1,
    name: "Dr. Emily Rodriguez",
    title: "Emergency Medicine Physician",
    facility: "St. Mary's Medical Center",
    location: "Los Angeles, CA",
    email: "emily.rodriguez@stmarys.org",
    phone: "(310) 555-0123",
    linkedin: "linkedin.com/in/emilyrodriguezmd",
    facebook: "facebook.com/dr.emily.rodriguez",
    experience: "8 years",
    specialty: "Emergency Medicine, Trauma",
    status: "Active - Night Shifts",
    lastContact: "Never",
    score: 94,
    insights: {
      recentActivity: "Posted about burnout in ER settings 3 days ago",
      careerStage: "Mid-career, open to opportunities",
      interests: ["Work-life balance", "Teaching opportunities", "Trauma care"],
      connections: 487,
      engagement: "High"
    }
  },
  {
    id: 2,
    name: "Dr. James Mitchell",
    title: "ER Department Head",
    facility: "Cedar Sinai Medical Center",
    location: "Beverly Hills, CA",
    email: "j.mitchell@cedars.org",
    phone: "(310) 555-0456",
    linkedin: "linkedin.com/in/jamesmitchellmd",
    experience: "15 years",
    specialty: "Emergency Medicine, Administration",
    status: "Active - Administrative Role",
    lastContact: "2 weeks ago",
    score: 87,
    insights: {
      recentActivity: "Seeking experienced ER physicians for night coverage",
      careerStage: "Senior, hiring manager",
      interests: ["Department expansion", "Quality improvement", "Staff retention"],
      connections: 1240,
      engagement: "Medium"
    }
  },
  {
    id: 3,
    name: "Dr. Sarah Chen",
    title: "Emergency Medicine Resident",
    facility: "UCLA Medical Center",
    location: "Los Angeles, CA",
    email: "sarah.chen@ucla.edu",
    phone: "(424) 555-0789",
    linkedin: "linkedin.com/in/sarahchenmd",
    experience: "PGY-3",
    specialty: "Emergency Medicine",
    status: "Resident - Graduating June 2024",
    lastContact: "Never",
    score: 91,
    insights: {
      recentActivity: "Looking for attending positions starting July 2024",
      careerStage: "Early career, actively seeking",
      interests: ["Academic medicine", "Research", "Urban emergency care"],
      connections: 234,
      engagement: "Very High"
    }
  }
]

const voiceScripts = {
  introduction: "Hi Dr. [Name], this is Sarah from Clinical Staffing AI. I noticed your impressive background in emergency medicine and wanted to reach out about some exclusive opportunities that match your expertise. Do you have 2 minutes to hear about a position that offers 30% higher compensation than market average?",
  qualification: "Great! I see you have [X] years of experience in emergency medicine. Are you currently exploring new opportunities or happy where you are?",
  pitch: "We have a unique position at [Hospital] offering $[Amount] base salary, flexible scheduling, and a $50,000 signing bonus. They specifically need someone with your trauma expertise. Would you be interested in learning more?",
  closing: "Perfect! I'll send you the full details via email along with other matching opportunities. When would be a good time for a follow-up call this week?"
}

export default function OutreachPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'enrich' | 'outreach' | 'voice' | 'analytics'>('discover')
  const [searchQuery, setSearchQuery] = useState('Emergency Medicine physicians Los Angeles')
  const [isSearching, setIsSearching] = useState(false)
  const [selectedProspects, setSelectedProspects] = useState<number[]>([])
  const [enrichmentProgress, setEnrichmentProgress] = useState(0)
  const [isEnriching, setIsEnriching] = useState(false)
  const [callActive, setCallActive] = useState(false)
  const [currentScript, setCurrentScript] = useState('')
  const [voiceResponse, setVoiceResponse] = useState('')
  const [campaignMetrics, setCampaignMetrics] = useState({
    emailsSent: 147,
    emailsOpened: 89,
    responses: 34,
    callsMade: 67,
    callsConnected: 41,
    meetings: 12,
    placements: 3
  })

  const startSearch = async () => {
    setIsSearching(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsSearching(false)
    toast.success("Found 127 Emergency Medicine professionals in Los Angeles area")
  }

  const enrichProspects = async () => {
    setIsEnriching(true)
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300))
      setEnrichmentProgress(i)
    }
    setIsEnriching(false)
    toast.success("Enriched data for 3 prospects from 7 sources")
  }

  const simulateVoiceCall = () => {
    setCallActive(true)
    setCurrentScript(voiceScripts.introduction.replace('[Name]', 'Rodriguez'))
    setTimeout(() => {
      setVoiceResponse("Oh hi Sarah! Yes, I have a couple minutes. I'm actually considering my options for next year.")
      setTimeout(() => {
        setCurrentScript(voiceScripts.pitch)
        setTimeout(() => {
          setVoiceResponse("That sounds very interesting! The signing bonus and flexible scheduling are definitely appealing. Yes, please send me more information.")
        }, 4000)
      }, 3000)
    }, 3000)
  }

  const endCall = () => {
    setCallActive(false)
    setCurrentScript('')
    setVoiceResponse('')
    toast.success("Call completed successfully! Meeting scheduled.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950 dark:via-background dark:to-blue-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg" />
              <div>
                <span className="text-xl font-bold">Outreach Hunter AI</span>
                <Badge variant="secondary" className="ml-2">ER Specialist Edition</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost">Main Demo</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            AI-Powered Healthcare Talent Outreach
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover, enrich, and engage emergency medicine professionals using AI voice agents and multi-channel intelligence gathering
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-muted p-1 rounded-lg">
            {[
              { id: 'discover', label: 'Discover', icon: Search },
              { id: 'enrich', label: 'Enrich', icon: Database },
              { id: 'outreach', label: 'Outreach', icon: Send },
              { id: 'voice', label: 'Voice Agent', icon: Phone },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
                    activeTab === tab.id ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Search Interface */}
            <Card>
              <CardHeader>
                <CardTitle>Discover ER Professionals</CardTitle>
                <CardDescription>
                  AI-powered search across multiple platforms and databases
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by specialty, location, experience..."
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={startSearch} disabled={isSearching}>
                    {isSearching ? (
                      <>
                        <Activity className="h-4 w-4 mr-2 animate-pulse" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        AI Search
                      </>
                    )}
                  </Button>
                </div>

                {/* Search Sources */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="gap-1">
                    <Linkedin className="h-3 w-3" /> LinkedIn
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Facebook className="h-3 w-3" /> Facebook
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Twitter className="h-3 w-3" /> Twitter
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Globe className="h-3 w-3" /> Hospital Websites
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Database className="h-3 w-3" /> Medical Directories
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Award className="h-3 w-3" /> State Medical Boards
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Discovered Prospects</CardTitle>
                    <CardDescription>AI-ranked by likelihood to engage</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demoProspects.map((prospect) => (
                    <motion.div
                      key={prospect.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <input
                            type="checkbox"
                            checked={selectedProspects.includes(prospect.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProspects([...selectedProspects, prospect.id])
                              } else {
                                setSelectedProspects(selectedProspects.filter(id => id !== prospect.id))
                              }
                            }}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold">{prospect.name}</h3>
                                <p className="text-sm text-muted-foreground">{prospect.title}</p>
                                <p className="text-sm text-muted-foreground">{prospect.facility} • {prospect.location}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">{prospect.score}%</div>
                                <p className="text-xs text-muted-foreground">Match Score</p>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Badge variant="secondary">{prospect.experience}</Badge>
                              <Badge variant="outline">{prospect.status}</Badge>
                              {prospect.insights.engagement === 'Very High' && (
                                <Badge variant="success">Hot Lead</Badge>
                              )}
                            </div>

                            <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                              <p className="text-sm">
                                <span className="font-medium">Recent Activity:</span> {prospect.insights.recentActivity}
                              </p>
                            </div>

                            <div className="mt-3 flex gap-2">
                              <Button size="sm" variant="outline">
                                <Linkedin className="h-4 w-4 mr-1" />
                                View Profile
                              </Button>
                              <Button size="sm" variant="outline">
                                <Mail className="h-4 w-4 mr-1" />
                                Email
                              </Button>
                              <Button size="sm" variant="outline">
                                <Phone className="h-4 w-4 mr-1" />
                                Call
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedProspects.length > 0 && (
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg flex items-center justify-between">
                    <p className="text-sm">
                      <span className="font-medium">{selectedProspects.length} prospects selected</span>
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setActiveTab('enrich')}>
                        Enrich Data
                      </Button>
                      <Button onClick={() => setActiveTab('outreach')}>
                        Start Outreach Campaign
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Enrich Tab */}
        {activeTab === 'enrich' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Data Enrichment Engine</CardTitle>
                <CardDescription>
                  Gathering comprehensive information from multiple sources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isEnriching && enrichmentProgress === 0 && (
                  <div className="text-center py-8">
                    <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ready to Enrich {selectedProspects.length || 3} Prospects</h3>
                    <p className="text-muted-foreground mb-4">
                      AI will gather data from LinkedIn, Facebook, public records, and medical directories
                    </p>
                    <Button onClick={enrichProspects}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start Enrichment
                    </Button>
                  </div>
                )}

                {(isEnriching || enrichmentProgress > 0) && (
                  <>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Enrichment Progress</span>
                        <span>{enrichmentProgress}%</span>
                      </div>
                      <Progress value={enrichmentProgress} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { source: 'LinkedIn', status: enrichmentProgress > 20 ? 'complete' : 'processing', data: 'Professional history, connections, posts' },
                        { source: 'Facebook', status: enrichmentProgress > 40 ? 'complete' : 'processing', data: 'Personal interests, life events, groups' },
                        { source: 'State Medical Board', status: enrichmentProgress > 60 ? 'complete' : 'processing', data: 'License status, specialties, disciplinary actions' },
                        { source: 'Hospital Websites', status: enrichmentProgress > 80 ? 'complete' : 'processing', data: 'Current position, department, publications' }
                      ].map((source) => (
                        <div key={source.source} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{source.source}</h4>
                            {source.status === 'complete' ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Activity className="h-5 w-5 text-primary animate-pulse" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{source.data}</p>
                        </div>
                      ))}
                    </div>

                    {enrichmentProgress === 100 && (
                      <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-950/20">
                        <CardContent className="p-6">
                          <h3 className="font-semibold mb-3">Enrichment Complete!</h3>
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-2xl font-bold">47</p>
                              <p className="text-sm text-muted-foreground">Data Points Added</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">7</p>
                              <p className="text-sm text-muted-foreground">Sources Checked</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold">100%</p>
                              <p className="text-sm text-muted-foreground">Contact Info Verified</p>
                            </div>
                          </div>
                          <Button onClick={() => setActiveTab('outreach')} className="w-full">
                            Proceed to Outreach
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Voice Agent Tab */}
        {activeTab === 'voice' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>AI Voice Agent</CardTitle>
                <CardDescription>
                  Automated calling with natural conversation and real-time responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Call Interface */}
                  <div className="space-y-4">
                    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Phone className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Dr. Emily Rodriguez</h3>
                          <p className="text-sm text-muted-foreground mb-4">(310) 555-0123</p>
                          
                          {!callActive ? (
                            <Button onClick={simulateVoiceCall} className="w-full">
                              <PhoneCall className="h-4 w-4 mr-2" />
                              Start AI Call
                            </Button>
                          ) : (
                            <div className="space-y-4">
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-sm font-medium">Call in Progress</span>
                                <span className="text-sm text-muted-foreground">00:47</span>
                              </div>
                              <Button onClick={endCall} variant="destructive" className="w-full">
                                End Call
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Voice Settings */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Voice Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Voice Type</span>
                          <Badge>Professional Female</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Speech Rate</span>
                          <Badge variant="outline">Normal</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Sentiment Analysis</span>
                          <Badge variant="success">Positive</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Conversation Flow */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Live Conversation</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {currentScript && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-primary/5 rounded-lg"
                          >
                            <div className="flex items-start gap-2">
                              <Badge className="mt-1">AI Agent</Badge>
                              <p className="text-sm flex-1">{currentScript}</p>
                            </div>
                          </motion.div>
                        )}
                        
                        {voiceResponse && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-muted/50 rounded-lg"
                          >
                            <div className="flex items-start gap-2">
                              <Badge variant="outline" className="mt-1">Prospect</Badge>
                              <p className="text-sm flex-1">{voiceResponse}</p>
                            </div>
                          </motion.div>
                        )}

                        {callActive && (
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Activity className="h-4 w-4 animate-pulse" />
                            AI is listening and processing...
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Call Intelligence */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Real-time Intelligence</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Prospect is interested</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Mention signing bonus</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Schedule follow-up for this week</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Outreach Tab */}
        {activeTab === 'outreach' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Multi-Channel Outreach Campaign</CardTitle>
                <CardDescription>
                  Orchestrate personalized outreach across email, phone, and social media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
                    <CardContent className="p-4">
                      <Mail className="h-8 w-8 text-blue-500 mb-2" />
                      <h3 className="font-semibold">Email Sequences</h3>
                      <p className="text-sm text-muted-foreground">5-touch automated campaign</p>
                      <Button className="w-full mt-3" size="sm">Configure</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                    <CardContent className="p-4">
                      <MessageSquare className="h-8 w-8 text-purple-500 mb-2" />
                      <h3 className="font-semibold">LinkedIn Messages</h3>
                      <p className="text-sm text-muted-foreground">Personalized InMail</p>
                      <Button className="w-full mt-3" size="sm">Configure</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                    <CardContent className="p-4">
                      <Phone className="h-8 w-8 text-green-500 mb-2" />
                      <h3 className="font-semibold">Voice Calls</h3>
                      <p className="text-sm text-muted-foreground">AI-powered conversations</p>
                      <Button className="w-full mt-3" size="sm">Configure</Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Campaign Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Campaign Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { day: 0, action: 'Initial Email', channel: 'email', message: 'Personalized introduction highlighting ER opportunities' },
                        { day: 2, action: 'LinkedIn Connection', channel: 'linkedin', message: 'Connect with personalized note about shared interests' },
                        { day: 4, action: 'Follow-up Email', channel: 'email', message: 'Share specific job matches with compensation details' },
                        { day: 7, action: 'AI Voice Call', channel: 'phone', message: 'Personal call to discuss opportunities' },
                        { day: 10, action: 'Final Email', channel: 'email', message: 'Exclusive opportunity with deadline' }
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-sm font-semibold">
                            {step.day}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{step.action}</span>
                              <Badge variant="outline" className="text-xs">
                                {step.channel}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{step.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full" size="lg">
                  <Zap className="h-4 w-4 mr-2" />
                  Launch Campaign for {selectedProspects.length || 3} Prospects
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'Emails Sent', value: campaignMetrics.emailsSent, icon: Mail, change: '+12%' },
                { label: 'Open Rate', value: `${Math.round(campaignMetrics.emailsOpened/campaignMetrics.emailsSent*100)}%`, icon: Eye, change: '+5%' },
                { label: 'Response Rate', value: `${Math.round(campaignMetrics.responses/campaignMetrics.emailsSent*100)}%`, icon: MessageSquare, change: '+8%' },
                { label: 'Meetings Booked', value: campaignMetrics.meetings, icon: Calendar, change: '+3' }
              ].map((metric) => {
                const Icon = metric.icon
                return (
                  <Card key={metric.label}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <Badge variant="success" className="text-xs">{metric.change}</Badge>
                      </div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Real-time tracking of outreach effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Funnel Visualization */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium">Prospects Found</div>
                      <div className="flex-1">
                        <Progress value={100} className="h-8" />
                      </div>
                      <span className="text-sm font-semibold">127</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium">Contacted</div>
                      <div className="flex-1">
                        <Progress value={75} className="h-8" />
                      </div>
                      <span className="text-sm font-semibold">95</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium">Responded</div>
                      <div className="flex-1">
                        <Progress value={35} className="h-8" />
                      </div>
                      <span className="text-sm font-semibold">44</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium">Meetings</div>
                      <div className="flex-1">
                        <Progress value={15} className="h-8" />
                      </div>
                      <span className="text-sm font-semibold">19</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 text-sm font-medium">Placements</div>
                      <div className="flex-1">
                        <Progress value={5} className="h-8" />
                      </div>
                      <span className="text-sm font-semibold">6</span>
                    </div>
                  </div>

                  {/* ROI Metrics */}
                  <div className="grid md:grid-cols-3 gap-4 p-4 bg-green-50/50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">$180K</p>
                      <p className="text-sm text-muted-foreground">Revenue Generated</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">12:1</p>
                      <p className="text-sm text-muted-foreground">ROI</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">$1,420</p>
                      <p className="text-sm text-muted-foreground">Cost per Placement</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}