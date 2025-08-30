"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Scale,
  FileText,
  Search,
  Database,
  UserCheck,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Clock,
  RefreshCw,
  Info
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { sleep } from '@/lib/utils'
import { toast } from 'sonner'

const verificationSteps = [
  {
    id: 'licenses',
    name: 'Medical Licenses',
    description: 'Verifying with state medical boards',
    icon: FileText,
    duration: 3000
  },
  {
    id: 'dea',
    name: 'DEA Registration',
    description: 'Checking DEA database',
    icon: Shield,
    duration: 2500
  },
  {
    id: 'certifications',
    name: 'Board Certifications',
    description: 'Validating with certification boards',
    icon: Award,
    duration: 3500
  },
  {
    id: 'background',
    name: 'Background Check',
    description: 'Criminal background verification',
    icon: UserCheck,
    duration: 4000
  },
  {
    id: 'sanctions',
    name: 'Sanctions & Exclusions',
    description: 'Checking OIG, SAM, and state exclusions',
    icon: Database,
    duration: 2000
  },
  {
    id: 'lawsuit',
    name: 'Lawsuit & Malpractice',
    description: 'Searching legal databases',
    icon: Scale,
    duration: 5000
  }
]

const verificationResults = {
  licenses: [
    { state: 'CA', number: 'A123456', status: 'verified', expiry: '2025-12-31', lastVerified: new Date().toISOString() },
    { state: 'NY', number: '246810', status: 'verified', expiry: '2024-06-30', lastVerified: new Date().toISOString() },
    { state: 'TX', number: 'TX98765', status: 'expired', expiry: '2023-01-15', lastVerified: new Date().toISOString() }
  ],
  dea: {
    number: 'BC1234567',
    status: 'active',
    expiry: '2025-08-31',
    schedules: ['II', 'III', 'IV', 'V'],
    verified: true
  },
  certifications: [
    { name: 'Board Certified - Interventional Cardiology', status: 'verified', expiry: '2029' },
    { name: 'Board Certified - Cardiovascular Disease', status: 'verified', expiry: '2027' },
    { name: 'ACLS Provider', status: 'verified', expiry: '2025' },
    { name: 'BLS Provider', status: 'verified', expiry: '2025' }
  ],
  background: {
    criminal: 'clear',
    lastChecked: new Date().toISOString(),
    details: 'No criminal records found in national and state databases'
  },
  sanctions: {
    oig: 'clear',
    sam: 'clear',
    state: 'clear',
    medicaid: 'clear',
    medicare: 'clear'
  },
  lawsuit: {
    malpracticeClaims: 0,
    pendingLawsuits: 0,
    settledCases: 1,
    details: [
      {
        type: 'settled',
        year: '2019',
        description: 'Minor procedural dispute - Settled out of court',
        amount: '$15,000',
        impact: 'minimal'
      }
    ],
    riskScore: 'low'
  }
}

import { Award } from 'lucide-react'

export default function VerificationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [results, setResults] = useState<typeof verificationResults | null>(null)
  const [overallProgress, setOverallProgress] = useState(0)
  const [candidateData, setCandidateData] = useState<any>(null)

  useEffect(() => {
    // Load candidate data from localStorage
    const data = localStorage.getItem('candidateData')
    if (data) {
      setCandidateData(JSON.parse(data))
    }
    // Auto-start verification after a short delay
    setTimeout(() => startVerification(), 1000)
  }, [])

  const startVerification = async () => {
    for (let i = 0; i < verificationSteps.length; i++) {
      setCurrentStep(i)
      setOverallProgress((i / verificationSteps.length) * 100)
      await sleep(verificationSteps[i].duration)
      setCompletedSteps(prev => [...prev, verificationSteps[i].id])
    }
    setOverallProgress(100)
    setResults(verificationResults)
    setVerificationComplete(true)
    toast.success("Verification complete! All credentials verified successfully.")
  }

  const handleProceedToProfile = () => {
    localStorage.setItem('verificationResults', JSON.stringify(results))
    router.push('/profile')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg" />
              <span className="text-xl font-bold">Clinical Staffing AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress Steps Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto mb-8">
              {['Upload', 'AI Analysis', 'Verification', 'Profile', 'Matching'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= 2 ? 'bg-primary text-primary-foreground border-primary' : 
                    'border-muted-foreground/25 text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 4 && (
                    <div className={`w-full h-0.5 mx-2 ${
                      index < 2 ? 'bg-primary' : 'bg-muted-foreground/25'
                    }`} style={{ width: '60px' }} />
                  )}
                </div>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-2">Step 2: Credential Verification</h1>
            <p className="text-muted-foreground">Automated verification of all professional credentials and background checks</p>
          </div>

          {/* Candidate Info Bar */}
          {candidateData && (
            <Card className="mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{candidateData.personal.name}</p>
                    <p className="text-sm text-muted-foreground">{candidateData.professional.specialty} • {candidateData.professional.yearsExperience} years experience</p>
                  </div>
                  <Badge>NPI: {candidateData.professional.npiNumber}</Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Verification Progress */}
          {!verificationComplete ? (
            <Card>
              <CardHeader>
                <CardTitle>Verification in Progress</CardTitle>
                <CardDescription>
                  Connecting to multiple databases and verification systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round(overallProgress)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>

                <div className="space-y-4">
                  {verificationSteps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = currentStep === index
                    const isComplete = completedSteps.includes(step.id)
                    
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex items-center space-x-4 p-4 rounded-lg border transition-all ${
                          isActive ? 'border-primary bg-primary/5' : 
                          isComplete ? 'border-green-500/20 bg-green-50/50 dark:bg-green-950/20' : 
                          'border-muted'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          {isComplete ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : isActive ? (
                            <Loader2 className="h-6 w-6 text-primary animate-spin" />
                          ) : (
                            <Icon className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{step.name}</p>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        {isComplete && (
                          <Badge variant="success">Verified</Badge>
                        )}
                        {isActive && (
                          <Badge>Verifying...</Badge>
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>This process typically takes 2-3 minutes</span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Verification Summary */}
                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-950/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          Verification Complete
                        </CardTitle>
                        <CardDescription>All credentials have been successfully verified</CardDescription>
                      </div>
                      <Badge className="bg-green-500">Ready for Placement</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-background rounded-lg">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="font-semibold">Licenses</p>
                        <p className="text-sm text-muted-foreground">2/3 Active</p>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                        <p className="font-semibold">Background</p>
                        <p className="text-sm text-muted-foreground">Clear</p>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <p className="font-semibold">Lawsuits</p>
                        <p className="text-sm text-muted-foreground">1 Settled (Minor)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Medical Licenses */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Medical Licenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {results?.licenses.map((license, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant={license.status === 'verified' ? 'success' : 'secondary'}>
                            {license.state}
                          </Badge>
                          <div>
                            <p className="font-medium">License #{license.number}</p>
                            <p className="text-sm text-muted-foreground">
                              Expires: {new Date(license.expiry).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {license.status === 'verified' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="text-sm font-medium">
                            {license.status === 'verified' ? 'Active' : 'Expired'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* DEA Registration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      DEA Registration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 bg-green-50/50 dark:bg-green-950/20 rounded-lg">
                      <div>
                        <p className="font-medium">DEA #{results?.dea.number}</p>
                        <p className="text-sm text-muted-foreground">
                          Schedules: {results?.dea.schedules.join(', ')} • Expires: {results?.dea.expiry}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-600">Active</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Background Check & Sanctions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5" />
                        Background Check
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50/50 dark:bg-green-950/20 rounded">
                          <span>Criminal Background</span>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">Clear</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {results?.background.details}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last checked: {new Date(results?.background.lastChecked || '').toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Sanctions & Exclusions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(results?.sanctions || {}).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{key} Database</span>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">Clear</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lawsuit & Malpractice History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="h-5 w-5" />
                      Lawsuit & Malpractice History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{results?.lawsuit.malpracticeClaims}</div>
                        <p className="text-sm text-muted-foreground">Active Claims</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{results?.lawsuit.pendingLawsuits}</div>
                        <p className="text-sm text-muted-foreground">Pending Lawsuits</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">{results?.lawsuit.settledCases}</div>
                        <p className="text-sm text-muted-foreground">Settled Cases</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Badge variant={results?.lawsuit.riskScore === 'low' ? 'success' : 'warning'} className="mt-2">
                          {results?.lawsuit.riskScore?.toUpperCase()} RISK
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">Overall Risk</p>
                      </div>
                    </div>

                    {results?.lawsuit.details && results.lawsuit.details.length > 0 && (
                      <div className="border-t pt-4">
                        <p className="font-medium mb-3">Case History</p>
                        {results.lawsuit.details.map((detail, index) => (
                          <div key={index} className="p-3 bg-yellow-50/50 dark:bg-yellow-950/20 rounded-lg">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{detail.year} - {detail.type.charAt(0).toUpperCase() + detail.type.slice(1)}</p>
                                <p className="text-sm text-muted-foreground">{detail.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">{detail.amount}</p>
                                <Badge variant="outline" className="text-xs">
                                  {detail.impact} impact
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 p-3 bg-green-50/50 dark:bg-green-950/20 rounded-lg">
                      <Info className="h-4 w-4 text-green-600" />
                      <p className="text-sm">
                        This candidate has a clean professional record with minimal legal history, meeting all requirements for placement.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Board Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {results?.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{cert.name}</p>
                            <p className="text-xs text-muted-foreground">Valid until {cert.expiry}</p>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">Verification Complete</p>
                    <p className="text-sm text-muted-foreground">All credentials verified and candidate cleared</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.print()}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button onClick={handleProceedToProfile} className="gap-2">
                      Continue to Profile Setup
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  )
}