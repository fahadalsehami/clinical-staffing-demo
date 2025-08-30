"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Award,
  Shield,
  Scale,
  FileText,
  Star,
  ChevronRight,
  Download,
  Video,
  Send,
  ThumbsUp,
  ThumbsDown,
  Edit3
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import confetti from 'canvas-confetti'

export default function ClientPage() {
  const [selectedResponse, setSelectedResponse] = useState<'accept' | 'reject' | 'negotiate' | null>(null)
  const [negotiationTerms, setNegotiationTerms] = useState({
    salary: '',
    startDate: '',
    other: ''
  })
  const [interviewDate, setInterviewDate] = useState('')
  const [interviewTime, setInterviewTime] = useState('')
  const [responseSubmitted, setResponseSubmitted] = useState(false)

  // Demo candidate data
  const candidate = {
    name: "Dr. Michael Chen",
    specialty: "Interventional Cardiology",
    experience: 12,
    matchScore: 92,
    availability: "60 days",
    salaryExpectation: "$450,000 - $550,000",
    location: "San Francisco, CA",
    email: "michael.chen@email.com",
    phone: "(555) 123-4567",
    npi: "1234567890"
  }

  const handleAccept = () => {
    setSelectedResponse('accept')
  }

  const handleReject = () => {
    setSelectedResponse('reject')
  }

  const handleNegotiate = () => {
    setSelectedResponse('negotiate')
  }

  const submitResponse = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setResponseSubmitted(true)
    
    if (selectedResponse === 'accept') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      toast.success("Acceptance sent! The recruiter will coordinate next steps.")
    } else if (selectedResponse === 'negotiate') {
      toast.success("Negotiation terms sent to the recruiter.")
    } else {
      toast.success("Response submitted. Thank you for your feedback.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-950 dark:via-background dark:to-cyan-950">
      {/* Client Portal Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg" />
              <div>
                <span className="text-xl font-bold">Clinical Staffing AI</span>
                <span className="text-sm text-muted-foreground block">Client Portal</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">Cedar Ridge Hospital</Badge>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Dr. Sarah Johnson
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!responseSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Email Header Simulation */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">From: Sarah Mitchell &lt;sarah@clinicalstaffingai.com&gt;</p>
                    <h2 className="text-xl font-semibold mt-1">
                      Exceptional Interventional Cardiology Candidate - Dr. Michael Chen - 92% Match
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">Received 2 hours ago</p>
                  </div>
                  <Badge className="bg-green-500">New Candidate</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Candidate Overview */}
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              {/* Main Candidate Card */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{candidate.name}, MD</CardTitle>
                      <CardDescription className="text-lg">{candidate.specialty}</CardDescription>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{candidate.matchScore}%</div>
                      <p className="text-sm text-muted-foreground">Match Score</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Key Highlights */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Key Highlights
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{candidate.experience} years of experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Board Certified in Cardiology</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Active licenses in CA, NY</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Available in {candidate.availability}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Expertise */}
                  <div>
                    <h3 className="font-semibold mb-3">Clinical Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Cardiac Catheterization",
                        "PCI",
                        "TAVR",
                        "Structural Heart",
                        "Intravascular Imaging"
                      ].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Contact & Availability */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Contact Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {candidate.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          {candidate.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {candidate.location}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Preferences</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          {candidate.salaryExpectation}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          Available in {candidate.availability}
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-muted-foreground" />
                          NPI: {candidate.npi}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Verification Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Medical Licenses</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">DEA Registration</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Board Certification</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Background Check</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Malpractice History</span>
                      <Badge variant="warning">1 Settled</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Full CV
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Verification Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      References
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Response Section */}
            <Card>
              <CardHeader>
                <CardTitle>Your Response</CardTitle>
                <CardDescription>Please select how you'd like to proceed with this candidate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Response Options */}
                {!selectedResponse && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card 
                      className="cursor-pointer hover:border-green-500 transition-colors"
                      onClick={handleAccept}
                    >
                      <CardContent className="p-6 text-center">
                        <ThumbsUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-1">Accept</h3>
                        <p className="text-sm text-muted-foreground">
                          Move forward with this candidate
                        </p>
                      </CardContent>
                    </Card>

                    <Card 
                      className="cursor-pointer hover:border-yellow-500 transition-colors"
                      onClick={handleNegotiate}
                    >
                      <CardContent className="p-6 text-center">
                        <MessageSquare className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-1">Negotiate</h3>
                        <p className="text-sm text-muted-foreground">
                          Discuss terms and conditions
                        </p>
                      </CardContent>
                    </Card>

                    <Card 
                      className="cursor-pointer hover:border-red-500 transition-colors"
                      onClick={handleReject}
                    >
                      <CardContent className="p-6 text-center">
                        <ThumbsDown className="h-8 w-8 text-red-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-1">Pass</h3>
                        <p className="text-sm text-muted-foreground">
                          Not a fit at this time
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Accept Flow */}
                {selectedResponse === 'accept' && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-green-50/50 dark:bg-green-950/20 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          Great choice! Let's schedule an interview.
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Preferred Interview Date</Label>
                          <Input 
                            type="date" 
                            value={interviewDate}
                            onChange={(e) => setInterviewDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <Label>Preferred Time</Label>
                          <Input 
                            type="time"
                            value={interviewTime}
                            onChange={(e) => setInterviewTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Interview Format</Label>
                        <div className="grid md:grid-cols-3 gap-3 mt-2">
                          <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                            <input type="radio" name="format" defaultChecked />
                            <Video className="h-4 w-4" />
                            <span>Video Call</span>
                          </label>
                          <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                            <input type="radio" name="format" />
                            <Phone className="h-4 w-4" />
                            <span>Phone Call</span>
                          </label>
                          <label className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                            <input type="radio" name="format" />
                            <User className="h-4 w-4" />
                            <span>In-Person</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <Label>Additional Message (Optional)</Label>
                        <textarea 
                          className="w-full mt-1 p-3 border rounded-lg resize-none"
                          rows={3}
                          placeholder="Any specific topics you'd like to discuss or questions for the candidate..."
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Negotiate Flow */}
                {selectedResponse === 'negotiate' && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-yellow-50/50 dark:bg-yellow-950/20 rounded-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Edit3 className="h-5 w-5 text-yellow-600" />
                          Let's discuss terms
                        </h3>
                      </div>

                      <div>
                        <Label>Proposed Salary</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input 
                            type="number"
                            placeholder="e.g., 425000"
                            value={negotiationTerms.salary}
                            onChange={(e) => setNegotiationTerms({...negotiationTerms, salary: e.target.value})}
                            className="pl-8"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Preferred Start Date</Label>
                        <Input 
                          type="date"
                          value={negotiationTerms.startDate}
                          onChange={(e) => setNegotiationTerms({...negotiationTerms, startDate: e.target.value})}
                        />
                      </div>

                      <div>
                        <Label>Other Terms or Questions</Label>
                        <textarea 
                          className="w-full mt-1 p-3 border rounded-lg resize-none"
                          rows={4}
                          value={negotiationTerms.other}
                          onChange={(e) => setNegotiationTerms({...negotiationTerms, other: e.target.value})}
                          placeholder="Schedule flexibility, call coverage, sign-on bonus, relocation assistance, etc..."
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Reject Flow */}
                {selectedResponse === 'reject' && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-red-50/50 dark:bg-red-950/20 rounded-lg">
                        <h3 className="font-semibold mb-2">
                          We appreciate your honesty
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your feedback helps us find better matches in the future
                        </p>
                      </div>

                      <div>
                        <Label>Reason for Passing (Optional)</Label>
                        <select className="w-full mt-1 p-3 border rounded-lg bg-background">
                          <option value="">Select a reason...</option>
                          <option>Not enough experience</option>
                          <option>Salary expectations too high</option>
                          <option>Not available soon enough</option>
                          <option>Found another candidate</option>
                          <option>Position no longer available</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <Label>Additional Feedback (Optional)</Label>
                        <textarea 
                          className="w-full mt-1 p-3 border rounded-lg resize-none"
                          rows={3}
                          placeholder="Any specific feedback that would help us find better matches..."
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Submit Button */}
                {selectedResponse && (
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedResponse(null)}
                    >
                      Change Response
                    </Button>
                    <Button 
                      onClick={submitResponse}
                      className="gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Submit Response
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Response Submitted!</h2>
                {selectedResponse === 'accept' && (
                  <>
                    <p className="text-muted-foreground mb-6">
                      Great! We'll coordinate with Dr. Chen to schedule the interview on{' '}
                      {interviewDate ? new Date(interviewDate).toLocaleDateString() : 'your preferred date'}.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a calendar invite within the next hour.
                    </p>
                  </>
                )}
                {selectedResponse === 'negotiate' && (
                  <p className="text-muted-foreground">
                    We've received your negotiation terms and will discuss them with the candidate.
                    We'll get back to you within 24 hours.
                  </p>
                )}
                {selectedResponse === 'reject' && (
                  <p className="text-muted-foreground">
                    Thank you for your feedback. We'll use this information to find better matches for your future needs.
                  </p>
                )}
                <div className="mt-8 flex justify-center gap-4">
                  <Link href="/dashboard">
                    <Button variant="outline">Back to Dashboard</Button>
                  </Link>
                  <Link href="/">
                    <Button>View More Candidates</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}