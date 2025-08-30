"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Mail,
  Send,
  Eye,
  Edit,
  Copy,
  CheckCircle,
  Clock,
  Target,
  FileText,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Calendar,
  DollarSign,
  MapPin,
  User,
  Building,
  Phone,
  Award,
  Briefcase,
  Star
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { jobOpportunities, facilities } from '@/lib/data/dummy-data'

export default function PresentationsPage() {
  const router = useRouter()
  const [profileData, setProfileData] = useState<any>(null)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [matchScore, setMatchScore] = useState(92)
  const [presentationReady, setPresentationReady] = useState(false)

  useEffect(() => {
    // Load profile data
    const data = localStorage.getItem('completeProfile')
    if (data) {
      setProfileData(JSON.parse(data))
    }
    
    // Select a relevant job and client for demo
    const cardioJobs = jobOpportunities.filter(j => 
      j.specialty.toLowerCase().includes('cardio') || 
      j.specialty === 'Internal Medicine'
    )
    const job = cardioJobs[0] || jobOpportunities[0]
    setSelectedJob(job)
    setSelectedClient(job.facility)
  }, [])

  const generateEmailPresentation = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const subject = `Exceptional ${profileData?.professional?.specialty || 'Cardiology'} Candidate - ${profileData?.personal?.name} - 92% Match`
    const content = generateEmailContent()
    
    setEmailSubject(subject)
    setEmailContent(content)
    setPresentationReady(true)
    setIsGenerating(false)
    
    toast.success("Email presentation generated successfully!")
  }

  const generateEmailContent = () => {
    if (!profileData || !selectedJob) return ''
    
    return `Dear ${selectedClient?.contactPerson?.name || 'Hiring Manager'},

I am excited to present an exceptional candidate for your ${selectedJob.title} position at ${selectedClient?.name}.

**CANDIDATE HIGHLIGHT**
${profileData.personal.name}, MD - ${profileData.professional.specialty}
Match Score: 92% | Years of Experience: ${profileData.professional.yearsExperience}

**KEY QUALIFICATIONS**
• Board Certified in ${profileData.professional.specialty}
• ${profileData.professional.yearsExperience}+ years of clinical experience
• Active medical licenses in CA, NY (TX available for renewal)
• Current DEA registration with schedules II-V
• Clean malpractice history (1 minor settled case, low risk profile)

**CLINICAL EXPERTISE**
${profileData.skills?.slice(0, 5).map((skill: string) => `• ${skill}`).join('\n')}

**EDUCATION & TRAINING**
• MD - Stanford University School of Medicine
• Residency - UCSF Medical Center (Internal Medicine)
• Fellowship - Mayo Clinic (Cardiology)
• Fellowship - Cleveland Clinic (Interventional Cardiology)

**WHY THIS CANDIDATE IS PERFECT FOR YOUR POSITION**
✓ Specialty match: Direct experience in ${selectedJob.specialty}
✓ Location preference: ${selectedClient?.location?.state} is a preferred location
✓ Availability: Can start within ${profileData.preferences?.availability || '60 days'}
✓ Compensation alignment: Salary expectations within your range

**VERIFICATION STATUS**
All credentials have been pre-verified through our AI-powered system:
✅ Medical Licenses - Verified
✅ DEA Registration - Active
✅ Board Certifications - Current
✅ Background Check - Clear
✅ Sanctions/Exclusions - None found

**NEXT STEPS**
This candidate is highly interested in your opportunity and available for interviews immediately. Their unique combination of clinical excellence, verified credentials, and cultural fit makes them an ideal addition to your team.

Would you like to schedule an interview? I can coordinate availability this week.

Best regards,
Sarah Mitchell
Senior Healthcare Recruiter
Clinical Staffing AI

P.S. This candidate has already expressed strong interest in ${selectedClient?.name} due to your reputation for ${selectedClient?.type === 'hospital' ? 'excellence in patient care' : 'innovative healthcare delivery'}.

---
View Full Profile: [Click Here]
Schedule Interview: [Click Here]
Decline: [Click Here]`
  }

  const sendPresentation = async () => {
    setIsSending(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSending(false)
    
    toast.success("Email sent successfully to " + selectedClient?.contactPerson?.email)
    
    // Redirect to client portal after a delay
    setTimeout(() => {
      router.push('/client')
    }, 2000)
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <p className="text-muted-foreground">Loading profile data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
                    index <= 4 ? 'bg-primary text-primary-foreground border-primary' : 
                    'border-muted-foreground/25 text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 4 && (
                    <div className={`w-full h-0.5 mx-2 ${
                      index <= 3 ? 'bg-primary' : 'bg-muted-foreground/25'
                    }`} style={{ width: '60px' }} />
                  )}
                </div>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-2">Step 4: Email Presentation</h1>
            <p className="text-muted-foreground">Generate and send professional candidate presentations to clients</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Job & Client Selection */}
            <div className="lg:col-span-1 space-y-6">
              {/* Selected Job */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Target Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedJob && (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">{selectedJob.title}</p>
                        <p className="text-sm text-muted-foreground">{selectedJob.facility.name}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {selectedJob.location.city}, {selectedJob.location.state}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          ${selectedJob.salaryRange.min.toLocaleString()} - ${selectedJob.salaryRange.max.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Start: {new Date(selectedJob.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Match Score</span>
                          <span className="text-2xl font-bold text-primary">{matchScore}%</span>
                        </div>
                        <Progress value={matchScore} className="h-2" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Client Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedClient && (
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">{selectedClient.name}</p>
                        <Badge variant="outline" className="mt-1">
                          {selectedClient.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="pt-3 border-t space-y-2">
                        <p className="text-sm font-medium">Contact Person</p>
                        <div className="space-y-1 text-sm">
                          <p>{selectedClient.contactPerson.name}</p>
                          <p className="text-muted-foreground">{selectedClient.contactPerson.title}</p>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {selectedClient.contactPerson.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {selectedClient.contactPerson.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Candidate Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Candidate Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{profileData.personal.name}</p>
                      <p className="text-sm text-muted-foreground">{profileData.professional.specialty}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="success">Verified</Badge>
                      <Badge variant="secondary">{profileData.professional.yearsExperience} years</Badge>
                      <Badge variant="outline">Available</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        Board Certified
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Background Clear
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Top 10% Match
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Email Presentation */}
            <div className="lg:col-span-2 space-y-6">
              {!presentationReady ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Email Presentation</CardTitle>
                    <CardDescription>
                      AI will create a professional presentation highlighting the candidate's strengths
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-8 border-2 border-dashed rounded-lg text-center">
                      <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Ready to Generate Presentation</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our AI will create a compelling email presentation that highlights why {profileData.personal.name} is perfect for this position
                      </p>
                      <Button 
                        onClick={generateEmailPresentation}
                        disabled={isGenerating}
                        className="gap-2"
                      >
                        {isGenerating ? (
                          <>
                            <Sparkles className="h-4 w-4 animate-pulse" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" />
                            Generate Presentation
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                        <p className="text-sm font-medium">Credentials Verified</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Target className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm font-medium">92% Match Score</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                        <p className="text-sm font-medium">Available Soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Email Preview */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Email Preview</CardTitle>
                          <CardDescription>Review and customize before sending</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>To</Label>
                        <Input 
                          value={`${selectedClient?.contactPerson?.name} <${selectedClient?.contactPerson?.email}>`}
                          readOnly
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Subject</Label>
                        <Input 
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Message</Label>
                        <div className="mt-1 p-4 bg-white dark:bg-gray-900 border rounded-lg max-h-96 overflow-y-auto">
                          <pre className="whitespace-pre-wrap font-sans text-sm">{emailContent}</pre>
                        </div>
                      </div>

                      {/* Email Analytics Preview */}
                      <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg">
                        <p className="text-sm font-medium mb-2">This email will include:</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Open tracking</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Click tracking</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Response buttons</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Calendar scheduling</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Send Actions */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Ready to Send</p>
                          <p className="text-sm text-muted-foreground">
                            Email will be sent to {selectedClient?.contactPerson?.name} at {selectedClient?.name}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Preview as Client
                          </Button>
                          <Button 
                            onClick={sendPresentation}
                            disabled={isSending}
                            className="gap-2"
                          >
                            {isSending ? (
                              <>
                                <Send className="h-4 w-4 animate-pulse" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                Send Presentation
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}