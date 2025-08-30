"use client"

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  ChevronRight,
  Sparkles,
  Shield,
  AlertCircle,
  Clock,
  DollarSign,
  Heart,
  Stethoscope,
  Scale,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { sleep } from '@/lib/utils'
import { toast } from 'sonner'

const extractedDataExample = {
  personal: {
    name: "Dr. Michael Chen",
    email: "michael.chen@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    dateOfBirth: "1985-03-15"
  },
  professional: {
    npiNumber: "1234567890",
    specialty: "Interventional Cardiology",
    subspecialty: "Structural Heart Disease",
    yearsExperience: 12,
    currentPosition: "Senior Interventional Cardiologist",
    currentEmployer: "Bay Area Medical Center",
    employmentDates: "2018 - Present",
    previousEmployers: [
      { name: "Stanford Health Care", role: "Cardiologist", dates: "2015-2018" },
      { name: "UCSF Medical Center", role: "Fellow", dates: "2013-2015" }
    ]
  },
  education: [
    { degree: "MD", institution: "Stanford University School of Medicine", year: "2012", gpa: "3.9" },
    { degree: "Residency", institution: "UCSF Medical Center", specialty: "Internal Medicine", year: "2013-2016" },
    { degree: "Fellowship", institution: "Mayo Clinic", specialty: "Cardiology", year: "2016-2018" },
    { degree: "Fellowship", institution: "Cleveland Clinic", specialty: "Interventional Cardiology", year: "2018-2019" }
  ],
  licenses: [
    { state: "CA", number: "A123456", status: "Active", expiry: "2025-12-31", type: "Medical License" },
    { state: "NY", number: "246810", status: "Active", expiry: "2024-06-30", type: "Medical License" },
    { state: "TX", number: "TX98765", status: "Inactive", expiry: "2023-01-15", type: "Medical License" }
  ],
  certifications: [
    { name: "Board Certified - Interventional Cardiology", issuer: "ABIM", date: "2019", expiry: "2029" },
    { name: "Board Certified - Cardiovascular Disease", issuer: "ABIM", date: "2017", expiry: "2027" },
    { name: "ACLS Provider", issuer: "AHA", date: "2023", expiry: "2025" },
    { name: "BLS Provider", issuer: "AHA", date: "2023", expiry: "2025" }
  ],
  deaRegistration: {
    number: "BC1234567",
    expiry: "2025-08-31",
    schedules: ["II", "III", "IV", "V"],
    states: ["CA", "NY"]
  },
  skills: [
    "Cardiac Catheterization",
    "Percutaneous Coronary Intervention",
    "Structural Heart Procedures",
    "TAVR/TAVI",
    "MitraClip",
    "Left Atrial Appendage Closure",
    "Intravascular Imaging",
    "Electronic Health Records (Epic, Cerner)"
  ],
  languages: ["English", "Mandarin Chinese", "Spanish (Conversational)"],
  publications: 12,
  presentations: 8,
  awards: [
    "Top Doctor - Cardiology, SF Magazine 2022",
    "Excellence in Patient Care Award 2021",
    "Best Research Presentation, ACC 2020"
  ],
  preferences: {
    desiredSalary: { min: 450000, max: 550000 },
    availability: "60 days notice",
    willingToRelocate: true,
    preferredLocations: ["California", "New York", "Texas"],
    shiftPreference: "Flexible",
    interestInTeaching: true
  },
  references: [
    { name: "Dr. Sarah Johnson", title: "Chief of Cardiology", organization: "Bay Area Medical Center", relationship: "Direct Supervisor" },
    { name: "Dr. Robert Williams", title: "Program Director", organization: "Mayo Clinic", relationship: "Fellowship Director" },
    { name: "Dr. Lisa Anderson", title: "Department Chair", organization: "Stanford Health Care", relationship: "Former Colleague" }
  ]
}

const analysisSteps = [
  { id: 'extract', label: 'Extracting Text', icon: FileText },
  { id: 'parse', label: 'Parsing Information', icon: Activity },
  { id: 'verify', label: 'Identifying Credentials', icon: Shield },
  { id: 'enrich', label: 'Enriching Data', icon: Sparkles },
  { id: 'validate', label: 'Validating Information', icon: CheckCircle }
]

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [extractedData, setExtractedData] = useState<typeof extractedDataExample | null>(null)
  const [showDetailedExtraction, setShowDetailedExtraction] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      handleUpload(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  })

  const handleUpload = async (uploadedFile: File) => {
    setIsProcessing(true)
    setUploadProgress(0)
    setCurrentStep(0)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 20) {
      await sleep(300)
      setUploadProgress(i)
    }

    // Simulate AI processing steps
    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(i)
      await sleep(1500)
    }

    setExtractedData(extractedDataExample)
    setAnalysisComplete(true)
    setIsProcessing(false)
    setShowDetailedExtraction(true)
    
    toast.success("Resume analyzed successfully! Found 3 licenses, 4 certifications, and DEA registration.")
  }

  const handleProceedToVerification = () => {
    // Store extracted data in localStorage for next steps
    localStorage.setItem('candidateData', JSON.stringify(extractedData))
    router.push('/verification')
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
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-3xl mx-auto mb-8">
              {['Upload', 'AI Analysis', 'Verification', 'Profile', 'Matching'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index === 0 ? 'bg-primary text-primary-foreground border-primary' : 
                    'border-muted-foreground/25 text-muted-foreground'
                  }`}>
                    {index === 0 ? '1' : index + 1}
                  </div>
                  {index < 4 && (
                    <div className={`w-full h-0.5 mx-2 ${
                      index === 0 && analysisComplete ? 'bg-primary' : 'bg-muted-foreground/25'
                    }`} style={{ width: '60px' }} />
                  )}
                </div>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-2">Step 1: Upload Your Resume</h1>
            <p className="text-muted-foreground">Our AI will extract and analyze all relevant information from your CV</p>
          </div>

          {!analysisComplete ? (
            <Card>
              <CardContent className="p-8">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
                    ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary'}
                    ${isProcessing ? 'pointer-events-none' : ''}`}
                >
                  <input {...getInputProps()} />
                  
                  {!file && !isProcessing && (
                    <>
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        {isDragActive ? 'Drop your resume here' : 'Drag & drop your resume or CV'}
                      </h3>
                      <p className="text-muted-foreground mb-4">or click to browse</p>
                      <p className="text-sm text-muted-foreground">Supports PDF, DOC, DOCX (Max 10MB)</p>
                    </>
                  )}

                  {isProcessing && (
                    <div className="space-y-6">
                      <div className="flex justify-center space-x-2">
                        {analysisSteps.map((step, index) => {
                          const Icon = step.icon
                          return (
                            <motion.div
                              key={step.id}
                              initial={{ scale: 0.8, opacity: 0.5 }}
                              animate={{
                                scale: index === currentStep ? 1.1 : index < currentStep ? 1 : 0.8,
                                opacity: index <= currentStep ? 1 : 0.5
                              }}
                              transition={{ duration: 0.3 }}
                              className={`flex flex-col items-center p-3 rounded-lg ${
                                index === currentStep ? 'bg-primary/10' : ''
                              }`}
                            >
                              <Icon className={`h-8 w-8 mb-2 ${
                                index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                              }`} />
                              <span className={`text-xs ${
                                index === currentStep ? 'text-primary font-semibold' : 'text-muted-foreground'
                              }`}>
                                {step.label}
                              </span>
                            </motion.div>
                          )
                        })}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis in Progress</h3>
                        <p className="text-muted-foreground mb-4">
                          {analysisSteps[currentStep]?.label || 'Processing'}...
                        </p>
                        <Progress value={(currentStep + 1) / analysisSteps.length * 100} className="w-full max-w-xs mx-auto" />
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        <span>Using advanced NLP and OCR technology</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Analysis Summary */}
                <Card className="mb-6 border-green-500/20 bg-green-50/50 dark:bg-green-950/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          AI Analysis Complete
                        </CardTitle>
                        <CardDescription>Successfully extracted comprehensive professional information</CardDescription>
                      </div>
                      <Badge className="bg-green-500">100% Extracted</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary">{extractedData?.licenses.length}</div>
                        <p className="text-sm text-muted-foreground">Medical Licenses</p>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary">{extractedData?.certifications.length}</div>
                        <p className="text-sm text-muted-foreground">Certifications</p>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary">{extractedData?.professional.yearsExperience}</div>
                        <p className="text-sm text-muted-foreground">Years Experience</p>
                      </div>
                      <div className="text-center p-3 bg-background rounded-lg">
                        <div className="text-2xl font-bold text-primary">{extractedData?.education.length}</div>
                        <p className="text-sm text-muted-foreground">Degrees/Training</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Extraction Results */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  {/* Personal & Professional Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal & Professional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{extractedData?.personal.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">NPI Number</p>
                          <p className="font-medium">{extractedData?.professional.npiNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Primary Specialty</p>
                          <p className="font-medium">{extractedData?.professional.specialty}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Position</p>
                        <p className="font-medium">{extractedData?.professional.currentPosition}</p>
                        <p className="text-sm text-muted-foreground">{extractedData?.professional.currentEmployer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contact Information</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {extractedData?.personal.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            {extractedData?.personal.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {extractedData?.personal.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Licenses & DEA */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Licenses & DEA Registration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Medical Licenses</p>
                        <div className="space-y-2">
                          {extractedData?.licenses.map((license, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                              <div className="flex items-center gap-2">
                                <Badge variant={license.status === 'Active' ? 'success' : 'secondary'}>
                                  {license.state}
                                </Badge>
                                <span className="text-sm">{license.number}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                Exp: {license.expiry}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">DEA Registration</p>
                        <div className="p-3 bg-muted/30 rounded space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Number:</span>
                            <span className="text-sm">{extractedData?.deaRegistration.number}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Schedules:</span>
                            <span className="text-sm">{extractedData?.deaRegistration.schedules.join(', ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Expires:</span>
                            <span className="text-sm">{extractedData?.deaRegistration.expiry}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Education & Certifications */}
                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education & Training
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {extractedData?.education.map((edu, index) => (
                        <div key={index} className="flex items-start justify-between pb-3 border-b last:border-0">
                          <div>
                            <p className="font-medium">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            {edu.specialty && (
                              <p className="text-xs text-muted-foreground">{edu.specialty}</p>
                            )}
                          </div>
                          <Badge variant="outline">{edu.year}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Board Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {extractedData?.certifications.map((cert, index) => (
                        <div key={index} className="flex items-start justify-between pb-3 border-b last:border-0">
                          <div>
                            <p className="font-medium text-sm">{cert.name}</p>
                            <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={new Date(cert.expiry) > new Date('2024-12-31') ? 'success' : 'warning'}>
                              Valid until {cert.expiry}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Skills & Languages */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Stethoscope className="h-5 w-5" />
                      Clinical Skills & Competencies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Clinical Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {extractedData?.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {extractedData?.languages.map((lang, index) => (
                          <Badge key={index} variant="outline">{lang}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Career Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Salary Expectations</p>
                        <p className="font-medium">
                          ${extractedData?.preferences.desiredSalary.min.toLocaleString()} - 
                          ${extractedData?.preferences.desiredSalary.max.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Availability</p>
                        <p className="font-medium">{extractedData?.preferences.availability}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Preferred Locations</p>
                        <p className="font-medium">{extractedData?.preferences.preferredLocations.join(', ')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">Ready for Verification</p>
                    <p className="text-sm text-muted-foreground">AI has extracted all critical information</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => {
                      setFile(null)
                      setAnalysisComplete(false)
                      setExtractedData(null)
                    }}>
                      Upload Different Resume
                    </Button>
                    <Button onClick={handleProceedToVerification} className="gap-2">
                      Proceed to Verification
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