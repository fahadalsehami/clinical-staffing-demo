export interface HealthcareProfessional {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  specialty: string
  yearsExperience: number
  location: {
    city: string
    state: string
    zipCode: string
  }
  credentials: Credential[]
  skills: string[]
  availability: 'immediate' | 'two_weeks' | 'one_month' | 'flexible'
  salaryExpectation: {
    min: number
    max: number
  }
  resume?: {
    uploadDate: string
    fileName: string
    analyzed: boolean
    extractedData?: any
  }
  profileCompleteness: number
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
}

export interface Credential {
  id: string
  type: 'license' | 'certification' | 'dea' | 'background_check'
  name: string
  issuingBody: string
  issueDate: string
  expiryDate?: string
  state?: string
  number: string
  status: 'valid' | 'expired' | 'pending_verification'
}

export interface JobOpportunity {
  id: string
  title: string
  facility: Facility
  specialty: string
  type: 'permanent' | 'locum' | 'part_time' | 'contract'
  description: string
  requirements: string[]
  qualifications: string[]
  salaryRange: {
    min: number
    max: number
  }
  benefits: string[]
  schedule: string
  startDate: string
  urgency: 'high' | 'medium' | 'low'
  location: {
    city: string
    state: string
    zipCode: string
  }
  matchScore?: number
  status: 'open' | 'filled' | 'pending' | 'closed'
  postedDate: string
  applications: Application[]
}

export interface Facility {
  id: string
  name: string
  type: 'hospital' | 'clinic' | 'urgent_care' | 'private_practice'
  size: 'large' | 'medium' | 'small'
  description: string
  location: {
    city: string
    state: string
    address: string
  }
  contactPerson: {
    name: string
    title: string
    email: string
    phone: string
  }
}

export interface Application {
  id: string
  professionalId: string
  jobId: string
  status: 'pending' | 'reviewed' | 'interview_scheduled' | 'accepted' | 'rejected'
  appliedDate: string
  matchScore: number
  notes?: string
}

export interface EmailPresentation {
  id: string
  candidateId: string
  jobId: string
  clientId: string
  subject: string
  content: string
  sentDate: string
  openedDate?: string
  responseDate?: string
  response?: ClientResponse
  status: 'sent' | 'opened' | 'responded' | 'expired'
  trackingId: string
}

export interface ClientResponse {
  id: string
  presentationId: string
  decision: 'accept' | 'reject' | 'negotiate'
  feedback?: string
  negotiationTerms?: {
    salary?: number
    startDate?: string
    schedule?: string
    other?: string
  }
  respondedBy: string
  respondedAt: string
}

export interface DashboardMetrics {
  totalCandidates: number
  activePlacements: number
  openPositions: number
  averageMatchScore: number
  placementRate: number
  averageTimeToFill: number
  revenueThisMonth: number
  revenueGrowth: number
}