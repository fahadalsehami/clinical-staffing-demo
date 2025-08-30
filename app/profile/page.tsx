"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  ChevronRight,
  CheckCircle,
  Edit,
  Save,
  Briefcase,
  GraduationCap,
  Award,
  Shield,
  Heart,
  FileText,
  Plus,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [candidateData, setCandidateData] = useState<any>(null)
  const [verificationResults, setVerificationResults] = useState<any>(null)
  const [startDate, setStartDate] = useState('')
  const [availability, setAvailability] = useState('60 days')
  const [salaryMin, setSalaryMin] = useState('450000')
  const [salaryMax, setSalaryMax] = useState('550000')
  const [preferredLocations, setPreferredLocations] = useState<string[]>(['California', 'New York', 'Texas'])
  const [newLocation, setNewLocation] = useState('')
  const [profileCompleteness, setProfileCompleteness] = useState(85)

  useEffect(() => {
    // Load data from localStorage
    const candidate = localStorage.getItem('candidateData')
    const verification = localStorage.getItem('verificationResults')
    
    if (candidate) {
      const data = JSON.parse(candidate)
      setCandidateData(data)
      setSalaryMin(data.preferences?.desiredSalary?.min || '450000')
      setSalaryMax(data.preferences?.desiredSalary?.max || '550000')
      setPreferredLocations(data.preferences?.preferredLocations || ['California', 'New York', 'Texas'])
    }
    if (verification) {
      setVerificationResults(JSON.parse(verification))
    }
  }, [])

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast.success("Profile updated successfully!")
    setProfileCompleteness(95)
  }

  const handleProceedToPresentation = () => {
    // Save profile data
    const profileData = {
      ...candidateData,
      preferences: {
        ...candidateData?.preferences,
        startDate,
        availability,
        desiredSalary: {
          min: parseInt(salaryMin),
          max: parseInt(salaryMax)
        },
        preferredLocations
      }
    }
    localStorage.setItem('completeProfile', JSON.stringify(profileData))
    router.push('/presentations')
  }

  const addLocation = () => {
    if (newLocation && !preferredLocations.includes(newLocation)) {
      setPreferredLocations([...preferredLocations, newLocation])
      setNewLocation('')
    }
  }

  const removeLocation = (location: string) => {
    setPreferredLocations(preferredLocations.filter(l => l !== location))
  }

  if (!candidateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-center text-muted-foreground">Loading profile data...</p>
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
              {isEditing ? (
                <Button onClick={handleSaveProfile}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
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
                    index <= 3 ? 'bg-primary text-primary-foreground border-primary' : 
                    'border-muted-foreground/25 text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 4 && (
                    <div className={`w-full h-0.5 mx-2 ${
                      index < 3 ? 'bg-primary' : 'bg-muted-foreground/25'
                    }`} style={{ width: '60px' }} />
                  )}
                </div>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-2">Step 3: Complete Your Profile</h1>
            <p className="text-muted-foreground">Set your preferences and availability for job matching</p>
          </div>

          {/* Profile Completeness */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Completeness</CardTitle>
                  <CardDescription>Complete your profile for better job matches</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{profileCompleteness}%</div>
                  <p className="text-sm text-muted-foreground">Almost there!</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={profileCompleteness} className="h-2" />
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Basic Info</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Credentials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {profileCompleteness >= 95 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span>Preferences</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Profile Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Personal Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{candidateData.personal.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NPI Number</p>
                    <p className="font-medium">{candidateData.professional.npiNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {candidateData.personal.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {candidateData.personal.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {candidateData.personal.location}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Specialty</p>
                    <p className="font-medium">{candidateData.professional.specialty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Years of Experience</p>
                    <p className="font-medium">{candidateData.professional.yearsExperience} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Position</p>
                    <p className="font-medium">{candidateData.professional.currentPosition}</p>
                    <p className="text-sm text-muted-foreground">{candidateData.professional.currentEmployer}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verification Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Medical Licenses</span>
                    <Badge variant="success">Verified</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">DEA Registration</span>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Background Check</span>
                    <Badge variant="success">Clear</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Malpractice History</span>
                    <Badge variant="warning">1 Settled</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preferences and Availability */}
            <div className="lg:col-span-2 space-y-6">
              {/* Availability and Start Date */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Availability & Start Date
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Preferred Start Date</Label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        disabled={!isEditing}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <Label>Notice Period</Label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        disabled={!isEditing}
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="Immediate">Immediate</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="30 days">30 days</option>
                        <option value="60 days">60 days</option>
                        <option value="90 days">90 days</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Based on your selection, you could start as early as{' '}
                      <span className="font-medium text-foreground">
                        {startDate ? new Date(startDate).toLocaleDateString() : 'TBD'}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Salary Expectations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Compensation Expectations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Minimum Salary</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          value={salaryMin}
                          onChange={(e) => setSalaryMin(e.target.value)}
                          disabled={!isEditing}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Maximum Salary</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          value={salaryMax}
                          onChange={(e) => setSalaryMax(e.target.value)}
                          disabled={!isEditing}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm">
                      Salary Range: <span className="font-medium">${parseInt(salaryMin).toLocaleString()} - ${parseInt(salaryMax).toLocaleString()}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on your experience and specialty, this range is competitive for your market
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Preferred Locations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Preferred Work Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {preferredLocations.map((location, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {location}
                        {isEditing && (
                          <button
                            onClick={() => removeLocation(location)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add location..."
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addLocation()}
                      />
                      <Button onClick={addLocation} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="relocate"
                      disabled={!isEditing}
                      defaultChecked={candidateData.preferences?.willingToRelocate}
                    />
                    <Label htmlFor="relocate">Willing to relocate for the right opportunity</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Work Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Shift Preference</Label>
                      <select
                        disabled={!isEditing}
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                        defaultValue="Flexible"
                      >
                        <option>Day Shift Only</option>
                        <option>Night Shift Only</option>
                        <option>Flexible</option>
                        <option>No Weekends</option>
                      </select>
                    </div>
                    <div>
                      <Label>Employment Type</Label>
                      <select
                        disabled={!isEditing}
                        className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                        defaultValue="Full-time"
                      >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Locum Tenens</option>
                        <option>Contract</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="teaching" disabled={!isEditing} defaultChecked />
                      <Label htmlFor="teaching">Interested in teaching opportunities</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="research" disabled={!isEditing} />
                      <Label htmlFor="research">Interested in research positions</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="leadership" disabled={!isEditing} />
                      <Label htmlFor="leadership">Open to leadership roles</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">Profile Ready for Matching</p>
                  <p className="text-sm text-muted-foreground">Your profile will be used to find the best job matches</p>
                </div>
                <Button onClick={handleProceedToPresentation} className="gap-2">
                  Generate Email Presentation
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

import { Loader2 } from 'lucide-react'