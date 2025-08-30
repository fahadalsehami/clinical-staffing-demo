"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Database,
  Brain,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Activity,
  Target,
  Users,
  Zap,
  Shield,
  Award,
  AlertCircle,
  Filter,
  Settings,
  Globe,
  Linkedin,
  Facebook,
  Twitter,
  FileText,
  BookOpen,
  GraduationCap,
  Stethoscope,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Link2,
  Cpu,
  Layers,
  GitBranch,
  Hash,
  Key,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload,
  Share2,
  MessageSquare,
  Phone,
  Mail,
  Video,
  Mic,
  Volume2,
  Wifi,
  Cloud,
  Server,
  HardDrive,
  Code,
  Terminal,
  Fingerprint,
  Eye,
  UserCheck,
  ShieldCheck,
  CreditCard,
  Briefcase,
  HeartHandshake,
  Microscope,
  Pill,
  Syringe,
  TestTube,
  Dna,
  Heart,
  BrainCircuit,
  Workflow,
  Network,
  Binary,
  CircuitBoard
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

// Advanced Clinical Criteria
const clinicalCriteria = {
  specialties: [
    'Emergency Medicine',
    'Critical Care',
    'Trauma Surgery',
    'Anesthesiology',
    'Intensive Care',
    'Cardiology',
    'Pulmonology',
    'Infectious Disease',
    'Hospitalist',
    'Urgent Care'
  ],
  subSpecialties: {
    'Emergency Medicine': ['Pediatric EM', 'Toxicology', 'EMS', 'Wilderness Medicine', 'Sports Medicine'],
    'Critical Care': ['Neuro ICU', 'Cardiac ICU', 'Surgical ICU', 'Medical ICU', 'Pediatric ICU'],
    'Anesthesiology': ['Cardiac Anesthesia', 'Pediatric Anesthesia', 'Regional Anesthesia', 'Pain Management']
  },
  certifications: [
    'ACLS', 'BLS', 'PALS', 'ATLS', 'ABLS', 'NRP', 'TNCC', 'ENPC', 'CEN', 'CCRN', 'CFRN', 'CTRN'
  ],
  procedures: [
    'Intubation', 'Central Line', 'Arterial Line', 'Chest Tube', 'Lumbar Puncture', 
    'Paracentesis', 'Thoracentesis', 'Cardioversion', 'Defibrillation', 'Ultrasound',
    'Bronchoscopy', 'Endoscopy', 'Dialysis', 'ECMO', 'Ventilator Management'
  ],
  shiftPreferences: ['Days', 'Nights', 'Swing', 'Rotating', '12-hour', '8-hour', 'Weekend', 'PRN'],
  experienceLevels: ['New Grad', '1-3 years', '3-5 years', '5-10 years', '10-15 years', '15+ years'],
  contractTypes: ['Permanent', 'Locum Tenens', 'Travel', 'Per Diem', 'Contract', 'Fellowship']
}

// Data Sources with API Integration Status
const dataSources = [
  // Professional Networks
  { id: 'linkedin', name: 'LinkedIn', category: 'Professional', status: 'connected', records: '12.4M', api: true, accuracy: 98 },
  { id: 'doximity', name: 'Doximity', category: 'Professional', status: 'connected', records: '1.8M', api: true, accuracy: 96 },
  { id: 'sermo', name: 'Sermo', category: 'Professional', status: 'connected', records: '800K', api: false, accuracy: 94 },
  
  // Medical Databases
  { id: 'npi', name: 'NPI Registry', category: 'Official', status: 'connected', records: '5.2M', api: true, accuracy: 100 },
  { id: 'abms', name: 'ABMS Board Certification', category: 'Official', status: 'connected', records: '950K', api: true, accuracy: 100 },
  { id: 'fsmb', name: 'FSMB License Database', category: 'Official', status: 'connected', records: '1.1M', api: true, accuracy: 100 },
  { id: 'dea', name: 'DEA Registration', category: 'Official', status: 'connected', records: '1.7M', api: false, accuracy: 100 },
  
  // Hospital Systems
  { id: 'epic', name: 'Epic EHR', category: 'Healthcare', status: 'connected', records: '250M', api: true, accuracy: 95 },
  { id: 'cerner', name: 'Cerner', category: 'Healthcare', status: 'pending', records: '100M', api: true, accuracy: 93 },
  { id: 'athena', name: 'AthenaHealth', category: 'Healthcare', status: 'connected', records: '160M', api: true, accuracy: 92 },
  
  // Research & Publications
  { id: 'pubmed', name: 'PubMed', category: 'Research', status: 'connected', records: '33M', api: true, accuracy: 100 },
  { id: 'orcid', name: 'ORCID', category: 'Research', status: 'connected', records: '14M', api: true, accuracy: 98 },
  { id: 'researchgate', name: 'ResearchGate', category: 'Research', status: 'connected', records: '20M', api: false, accuracy: 90 },
  
  // Social & Public
  { id: 'facebook', name: 'Facebook', category: 'Social', status: 'limited', records: '2.9B', api: true, accuracy: 85 },
  { id: 'twitter', name: 'Twitter/X', category: 'Social', status: 'connected', records: '450M', api: true, accuracy: 82 },
  { id: 'instagram', name: 'Instagram', category: 'Social', status: 'limited', records: '2B', api: true, accuracy: 80 },
  
  // Background & Verification
  { id: 'oig', name: 'OIG Exclusions', category: 'Compliance', status: 'connected', records: '75K', api: true, accuracy: 100 },
  { id: 'sam', name: 'SAM.gov', category: 'Compliance', status: 'connected', records: '120K', api: true, accuracy: 100 },
  { id: 'npdb', name: 'NPDB', category: 'Compliance', status: 'restricted', records: '1.5M', api: false, accuracy: 100 }
]

// Personalization Parameters
const personalizationFactors = {
  professional: [
    'Years of experience',
    'Current specialty',
    'Sub-specialties',
    'Board certifications',
    'Procedure expertise',
    'Research publications',
    'Teaching experience',
    'Leadership roles'
  ],
  personal: [
    'Geographic preferences',
    'Family situation',
    'Career stage',
    'Work-life balance priority',
    'Compensation expectations',
    'Schedule flexibility',
    'Teaching interest',
    'Research interest'
  ],
  behavioral: [
    'LinkedIn activity level',
    'Response to recruiters',
    'Job search signals',
    'Content engagement',
    'Professional network size',
    'Career trajectory',
    'Stability patterns',
    'Growth indicators'
  ],
  contextual: [
    'Current facility type',
    'Market conditions',
    'Local competition',
    'Timing factors',
    'Urgency indicators',
    'Recent life events',
    'Professional milestones',
    'Industry trends'
  ]
}

// Precision Scoring Metrics
const scoringMetrics = {
  fit: {
    clinical: { weight: 30, factors: ['specialty_match', 'experience_level', 'certifications', 'procedures'] },
    cultural: { weight: 20, factors: ['facility_type', 'team_size', 'work_style', 'values_alignment'] },
    geographic: { weight: 15, factors: ['location_match', 'relocation_willingness', 'family_ties', 'cost_of_living'] },
    compensation: { weight: 15, factors: ['salary_alignment', 'benefits_match', 'bonus_structure', 'growth_potential'] }
  },
  readiness: {
    timing: { weight: 10, factors: ['contract_end', 'life_events', 'market_activity', 'engagement_signals'] },
    motivation: { weight: 10, factors: ['job_search_activity', 'response_rate', 'referral_likelihood', 'career_goals'] }
  }
}

export default function AdvancedOutreachPage() {
  const [activeTab, setActiveTab] = useState<'criteria' | 'sources' | 'personalization' | 'precision' | 'integration' | 'insights'>('criteria')
  const [selectedCriteria, setSelectedCriteria] = useState<any>({
    specialties: [],
    certifications: [],
    procedures: [],
    experience: '',
    location: '',
    radius: 50
  })
  const [scanningProgress, setScanningProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [matchedProfiles, setMatchedProfiles] = useState(0)
  const [personalizationScore, setPersonalizationScore] = useState(0)
  const [precisionScore, setPrecisionScore] = useState(0)

  const startAdvancedScan = async () => {
    setIsScanning(true)
    setScanningProgress(0)
    setMatchedProfiles(0)
    
    // Simulate scanning across multiple sources
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setScanningProgress(i)
      
      // Update matched profiles progressively
      if (i % 10 === 0) {
        setMatchedProfiles(prev => prev + Math.floor(Math.random() * 50) + 10)
      }
    }
    
    setPersonalizationScore(94)
    setPrecisionScore(97)
    setIsScanning(false)
    toast.success(`Found ${matchedProfiles} highly qualified ER/Critical Care professionals`)
  }

  const calculatePrecisionScore = () => {
    let totalScore = 0
    let totalWeight = 0
    
    Object.entries(scoringMetrics.fit).forEach(([category, data]) => {
      const categoryScore = Math.random() * 100 // In real app, calculate based on actual data
      totalScore += categoryScore * (data.weight / 100)
      totalWeight += data.weight
    })
    
    Object.entries(scoringMetrics.readiness).forEach(([category, data]) => {
      const categoryScore = Math.random() * 100
      totalScore += categoryScore * (data.weight / 100)
      totalWeight += data.weight
    })
    
    return Math.round(totalScore)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950 dark:via-background dark:to-purple-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <BrainCircuit className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Outreach Hunter AI Pro
                </span>
                <Badge variant="secondary" className="ml-2">Advanced Clinical Targeting</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="gap-1">
                <Wifi className="h-3 w-3" />
                19 Sources Connected
              </Badge>
              <Link href="/">
                <Button variant="ghost" size="sm">Main Demo</Button>
              </Link>
              <Link href="/outreach">
                <Button variant="ghost" size="sm">Basic Version</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">2.4M+</p>
                    <p className="text-sm text-muted-foreground">Healthcare Profiles</p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">19</p>
                    <p className="text-sm text-muted-foreground">Data Sources</p>
                  </div>
                  <Database className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">97%</p>
                    <p className="text-sm text-muted-foreground">Precision Score</p>
                  </div>
                  <Target className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-sm text-muted-foreground">Personalized</p>
                  </div>
                  <Fingerprint className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Advanced Clinical Outreach Intelligence Platform
          </h1>
          <p className="text-lg text-muted-foreground">
            Precision-targeted outreach with 100% personalization using 19+ integrated data sources
          </p>
        </motion.div>

        {/* Advanced Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-muted p-1 rounded-lg">
            {[
              { id: 'criteria', label: 'Clinical Criteria', icon: Stethoscope },
              { id: 'sources', label: 'Data Sources', icon: Database },
              { id: 'personalization', label: 'Personalization', icon: Fingerprint },
              { id: 'precision', label: 'Precision Scoring', icon: Target },
              { id: 'integration', label: 'Integrations', icon: Link2 },
              { id: 'insights', label: 'AI Insights', icon: BrainCircuit }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-md flex items-center gap-2 transition-all text-sm ${
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

        {/* Clinical Criteria Tab */}
        {activeTab === 'criteria' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Advanced Clinical Targeting Criteria</CardTitle>
                <CardDescription>
                  Define precise clinical parameters for targeted outreach
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specialty Selection */}
                <div>
                  <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" />
                    Primary Specialties
                  </Label>
                  <div className="grid md:grid-cols-3 gap-3">
                    {clinicalCriteria.specialties.map((specialty) => (
                      <label
                        key={specialty}
                        className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCriteria.specialties.includes(specialty)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCriteria({
                                ...selectedCriteria,
                                specialties: [...selectedCriteria.specialties, specialty]
                              })
                            } else {
                              setSelectedCriteria({
                                ...selectedCriteria,
                                specialties: selectedCriteria.specialties.filter((s: string) => s !== specialty)
                              })
                            }
                          }}
                        />
                        <span className="text-sm">{specialty}</span>
                        {specialty === 'Emergency Medicine' && (
                          <Badge variant="secondary" className="ml-auto text-xs">High Demand</Badge>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Required Certifications
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {clinicalCriteria.certifications.map((cert) => (
                      <Badge
                        key={cert}
                        variant={selectedCriteria.certifications.includes(cert) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedCriteria.certifications.includes(cert)) {
                            setSelectedCriteria({
                              ...selectedCriteria,
                              certifications: selectedCriteria.certifications.filter((c: string) => c !== cert)
                            })
                          } else {
                            setSelectedCriteria({
                              ...selectedCriteria,
                              certifications: [...selectedCriteria.certifications, cert]
                            })
                          }
                        }}
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Procedures */}
                <div>
                  <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Procedure Expertise
                  </Label>
                  <div className="grid md:grid-cols-3 gap-2">
                    {clinicalCriteria.procedures.slice(0, 9).map((procedure) => (
                      <label key={procedure} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedCriteria.procedures.includes(procedure)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedCriteria({
                                ...selectedCriteria,
                                procedures: [...selectedCriteria.procedures, procedure]
                              })
                            } else {
                              setSelectedCriteria({
                                ...selectedCriteria,
                                procedures: selectedCriteria.procedures.filter((p: string) => p !== procedure)
                              })
                            }
                          }}
                        />
                        <span>{procedure}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience and Location */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-semibold mb-3">Experience Level</Label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Any Experience</option>
                      {clinicalCriteria.experienceLevels.map((level) => (
                        <option key={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="text-base font-semibold mb-3">Geographic Targeting</Label>
                    <div className="flex gap-2">
                      <Input placeholder="City, State or ZIP" className="flex-1" />
                      <select className="p-2 border rounded-lg">
                        <option>50 miles</option>
                        <option>100 miles</option>
                        <option>250 miles</option>
                        <option>Nationwide</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Advanced Filters */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Advanced Filters
                    </Label>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-1">Shift Preferences</p>
                      <div className="space-y-1">
                        {['Days Only', 'Nights Only', 'Flexible'].map((shift) => (
                          <label key={shift} className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span>{shift}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Contract Type</p>
                      <div className="space-y-1">
                        {['Permanent', 'Locum Tenens', 'Travel'].map((type) => (
                          <label key={type} className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Facility Type</p>
                      <div className="space-y-1">
                        {['Level 1 Trauma', 'Academic', 'Community'].map((facility) => (
                          <label key={facility} className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span>{facility}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={startAdvancedScan}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <Activity className="h-4 w-4 mr-2 animate-pulse" />
                      Scanning {scanningProgress}%...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Start Advanced Clinical Search
                    </>
                  )}
                </Button>

                {scanningProgress > 0 && (
                  <div className="space-y-2">
                    <Progress value={scanningProgress} />
                    <p className="text-sm text-center text-muted-foreground">
                      Found {matchedProfiles} matching profiles across 19 data sources
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Data Sources Tab */}
        {activeTab === 'sources' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Integrated Data Sources</CardTitle>
                <CardDescription>
                  Real-time access to 19+ healthcare data sources with API integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {['Professional', 'Official', 'Healthcare', 'Research', 'Social', 'Compliance'].map((category) => (
                    <div key={category}>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        {category === 'Professional' && <Linkedin className="h-4 w-4" />}
                        {category === 'Official' && <Shield className="h-4 w-4" />}
                        {category === 'Healthcare' && <Building className="h-4 w-4" />}
                        {category === 'Research' && <BookOpen className="h-4 w-4" />}
                        {category === 'Social' && <Users className="h-4 w-4" />}
                        {category === 'Compliance' && <ShieldCheck className="h-4 w-4" />}
                        {category} Networks
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {dataSources
                          .filter(source => source.category === category)
                          .map((source) => (
                            <div key={source.id} className="p-4 border rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-medium flex items-center gap-2">
                                    {source.name}
                                    {source.api && (
                                      <Badge variant="outline" className="text-xs">
                                        <Key className="h-3 w-3 mr-1" />
                                        API
                                      </Badge>
                                    )}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {source.records} records
                                  </p>
                                </div>
                                <div className="text-right">
                                  {source.status === 'connected' && (
                                    <Badge variant="success" className="gap-1">
                                      <CheckCircle className="h-3 w-3" />
                                      Connected
                                    </Badge>
                                  )}
                                  {source.status === 'pending' && (
                                    <Badge variant="warning" className="gap-1">
                                      <Clock className="h-3 w-3" />
                                      Pending
                                    </Badge>
                                  )}
                                  {source.status === 'limited' && (
                                    <Badge variant="secondary" className="gap-1">
                                      <AlertCircle className="h-3 w-3" />
                                      Limited
                                    </Badge>
                                  )}
                                  {source.status === 'restricted' && (
                                    <Badge variant="destructive" className="gap-1">
                                      <Lock className="h-3 w-3" />
                                      Restricted
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                  Accuracy: {source.accuracy}%
                                </span>
                                <Button variant="ghost" size="sm" className="h-6 text-xs">
                                  Configure
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    Data Processing Pipeline
                  </h3>
                  <div className="grid md:grid-cols-4 gap-3 mt-3">
                    {[
                      { stage: 'Collection', icon: Download, status: 'Active', rate: '10K/min' },
                      { stage: 'Normalization', icon: GitBranch, status: 'Active', rate: '8K/min' },
                      { stage: 'Enrichment', icon: Sparkles, status: 'Active', rate: '5K/min' },
                      { stage: 'Validation', icon: ShieldCheck, status: 'Active', rate: '12K/min' }
                    ].map((pipeline) => {
                      const Icon = pipeline.icon
                      return (
                        <div key={pipeline.stage} className="text-center p-3 bg-background rounded-lg">
                          <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="font-medium text-sm">{pipeline.stage}</p>
                          <p className="text-xs text-muted-foreground">{pipeline.rate}</p>
                          <Badge variant="success" className="mt-1 text-xs">
                            {pipeline.status}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Personalization Tab */}
        {activeTab === 'personalization' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>100% Personalized Outreach Engine</CardTitle>
                <CardDescription>
                  AI-driven personalization using 40+ behavioral and contextual factors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(personalizationFactors).map(([category, factors]) => (
                    <div key={category} className="space-y-3">
                      <h3 className="font-semibold capitalize flex items-center gap-2">
                        {category === 'professional' && <Briefcase className="h-4 w-4" />}
                        {category === 'personal' && <Heart className="h-4 w-4" />}
                        {category === 'behavioral' && <Activity className="h-4 w-4" />}
                        {category === 'contextual' && <Globe className="h-4 w-4" />}
                        {category} Factors
                      </h3>
                      <div className="space-y-2">
                        {factors.map((factor) => (
                          <div key={factor} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                            <span className="text-sm">{factor}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={Math.random() * 100} className="w-20 h-2" />
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                  <h3 className="font-semibold mb-3">Personalization Preview</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-background rounded">
                      <p className="text-sm font-medium mb-1">Email Subject Line</p>
                      <p className="text-sm text-muted-foreground">
                        "Dr. Rodriguez, Your trauma expertise + Stanford connection makes you perfect for Cedar Sinai's new Level 1 center"
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded">
                      <p className="text-sm font-medium mb-1">Opening Line</p>
                      <p className="text-sm text-muted-foreground">
                        "I noticed your recent publication on rapid trauma assessment protocols - this aligns perfectly with Cedar Sinai's new evidence-based initiative..."
                      </p>
                    </div>
                    <div className="p-3 bg-background rounded">
                      <p className="text-sm font-medium mb-1">Value Proposition</p>
                      <p className="text-sm text-muted-foreground">
                        "Given your interest in work-life balance (based on your recent posts), you'll appreciate the 7-on/7-off schedule with no mandatory overtime..."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div>
                    <p className="font-semibold">Personalization Score</p>
                    <p className="text-sm text-muted-foreground">Based on 40+ data points</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{personalizationScore}%</p>
                    <Badge variant="success">Highly Personalized</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Precision Scoring Tab */}
        {activeTab === 'precision' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Precision Scoring Algorithm</CardTitle>
                <CardDescription>
                  Multi-dimensional scoring for maximum outreach effectiveness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(scoringMetrics.fit).map(([category, data]) => {
                    const score = Math.floor(Math.random() * 30) + 70
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium capitalize">{category} Fit</p>
                            <p className="text-xs text-muted-foreground">
                              Weight: {data.weight}% | Factors: {data.factors.join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">{score}</p>
                            <p className="text-xs text-muted-foreground">/100</p>
                          </div>
                        </div>
                        <Progress value={score} className="h-3" />
                      </div>
                    )
                  })}
                  
                  <div className="border-t pt-4">
                    {Object.entries(scoringMetrics.readiness).map(([category, data]) => {
                      const score = Math.floor(Math.random() * 30) + 70
                      return (
                        <div key={category} className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium capitalize">{category} Readiness</p>
                              <p className="text-xs text-muted-foreground">
                                Weight: {data.weight}% | Factors: {data.factors.join(', ')}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{score}</p>
                              <p className="text-xs text-muted-foreground">/100</p>
                            </div>
                          </div>
                          <Progress value={score} className="h-3" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Overall Precision Score</h3>
                    <Badge variant="success" className="text-lg px-3 py-1">
                      Top 3% Match
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-bold text-green-600 mb-2">{precisionScore}%</p>
                    <p className="text-sm text-muted-foreground">
                      This candidate has a {precisionScore}% likelihood of responding positively
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                    <div>
                      <p className="text-lg font-semibold">12x</p>
                      <p className="text-xs text-muted-foreground">Higher Response Rate</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">3.5x</p>
                      <p className="text-xs text-muted-foreground">Faster Placement</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">98%</p>
                      <p className="text-xs text-muted-foreground">Retention Rate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Integration Tab */}
        {activeTab === 'integration' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Platform Integrations</CardTitle>
                <CardDescription>
                  Seamless integration with your existing healthcare tech stack
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: 'Salesforce Health Cloud', icon: Cloud, status: 'Active', sync: 'Real-time' },
                    { name: 'Bullhorn ATS', icon: Server, status: 'Active', sync: 'Every 15 min' },
                    { name: 'Workday HCM', icon: Briefcase, status: 'Active', sync: 'Daily' },
                    { name: 'Microsoft Teams', icon: MessageSquare, status: 'Active', sync: 'Real-time' },
                    { name: 'Zoom', icon: Video, status: 'Active', sync: 'On-demand' },
                    { name: 'DocuSign', icon: FileText, status: 'Active', sync: 'Real-time' },
                    { name: 'Indeed', icon: Search, status: 'Pending', sync: 'N/A' },
                    { name: 'LinkedIn Recruiter', icon: Linkedin, status: 'Active', sync: 'Hourly' },
                    { name: 'Google Workspace', icon: Mail, status: 'Active', sync: 'Real-time' }
                  ].map((integration) => {
                    const Icon = integration.icon
                    return (
                      <div key={integration.name} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <Icon className="h-8 w-8 text-primary" />
                          <Badge variant={integration.status === 'Active' ? 'success' : 'secondary'}>
                            {integration.status}
                          </Badge>
                        </div>
                        <h4 className="font-medium mb-1">{integration.name}</h4>
                        <p className="text-xs text-muted-foreground mb-3">Sync: {integration.sync}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Terminal className="h-4 w-4" />
                    API Access
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-background rounded">
                      <p className="text-sm font-medium mb-1">REST API</p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        https://api.outreachhunter.ai/v2/
                      </code>
                    </div>
                    <div className="p-3 bg-background rounded">
                      <p className="text-sm font-medium mb-1">Webhook URL</p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        https://your-domain.com/webhooks/
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'insights' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Insights & Recommendations</CardTitle>
                <CardDescription>
                  Real-time intelligence and predictive analytics for outreach optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Market Insights
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>• ER physician demand up 34% in CA</p>
                        <p>• Night shift premiums increased 18%</p>
                        <p>• Locum rates hitting all-time highs</p>
                        <p>• 72% considering new opportunities</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Behavioral Predictions
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>• Best outreach time: Tue-Thu 7-9am</p>
                        <p>• Preferred channel: LinkedIn (82%)</p>
                        <p>• Response likelihood: Very High</p>
                        <p>• Decision timeframe: 2-3 weeks</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    AI Recommendations
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge className="mt-0.5">High Priority</Badge>
                      <div>
                        <p className="text-sm font-medium">Target Stanford Alumni Network</p>
                        <p className="text-xs text-muted-foreground">
                          87% of Stanford-trained ER physicians respond to alumni outreach
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="mt-0.5" variant="secondary">Timing</Badge>
                      <div>
                        <p className="text-sm font-medium">Launch Campaign Before March 15</p>
                        <p className="text-xs text-muted-foreground">
                          Contract renewal season - 3x higher response rates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge className="mt-0.5" variant="outline">Strategy</Badge>
                      <div>
                        <p className="text-sm font-medium">Lead with Work-Life Balance</p>
                        <p className="text-xs text-muted-foreground">
                          68% of ER physicians cite burnout as primary concern
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { metric: 'Predicted Responses', value: '147', change: '+23%' },
                    { metric: 'Qualified Leads', value: '89', change: '+18%' },
                    { metric: 'Interview Rate', value: '64%', change: '+12%' },
                    { metric: 'Placement Rate', value: '31%', change: '+8%' }
                  ].map((stat) => (
                    <div key={stat.metric} className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.metric}</p>
                      <Badge variant="success" className="mt-1 text-xs">{stat.change}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}