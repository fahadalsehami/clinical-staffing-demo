import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface Candidate {
  id: string
  name: string
  email: string
  phone: string
  specialty: string
  experience: number
  location: string
  availability: string
  desiredSalary: number
  licenses: string[]
  certifications: string[]
  score?: number
  status: 'new' | 'contacted' | 'interested' | 'interviewing' | 'offered' | 'placed' | 'rejected'
  lastContact?: Date
  notes?: string
  resumeUrl?: string
  linkedinUrl?: string
  tags?: string[]
}

export interface Campaign {
  id: string
  name: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  targetSpecialty: string
  targetLocation: string
  targetExperience: { min: number; max: number }
  messageSent: number
  responses: number
  interviews: number
  placements: number
  createdAt: Date
  updatedAt: Date
}

export interface Conversation {
  id: string
  candidateId: string
  campaignId: string
  messages: Message[]
  sentiment: 'positive' | 'neutral' | 'negative'
  nextAction?: string
  scheduledFollowUp?: Date
}

export interface Message {
  id: string
  sender: 'agent' | 'candidate'
  content: string
  timestamp: Date
  channel: 'email' | 'sms' | 'voice' | 'linkedin'
  read: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: 'recruiter' | 'admin' | 'client'
  avatar?: string
  organization?: string
}

interface AppState {
  // User
  user: User | null
  setUser: (user: User | null) => void
  
  // Candidates
  candidates: Candidate[]
  addCandidate: (candidate: Candidate) => void
  updateCandidate: (id: string, updates: Partial<Candidate>) => void
  deleteCandidate: (id: string) => void
  
  // Campaigns
  campaigns: Campaign[]
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  
  // Conversations
  conversations: Conversation[]
  addConversation: (conversation: Conversation) => void
  addMessage: (conversationId: string, message: Message) => void
  
  // UI State
  selectedCandidateId: string | null
  setSelectedCandidateId: (id: string | null) => void
  selectedCampaignId: string | null
  setSelectedCampaignId: (id: string | null) => void
  
  // Filters
  filters: {
    specialty: string
    location: string
    status: string
    minScore: number
  }
  setFilters: (filters: Partial<AppState['filters']>) => void
  
  // Statistics
  getStatistics: () => {
    totalCandidates: number
    activeCampaigns: number
    placementRate: number
    avgTimeToFill: number
    responseRate: number
  }
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      candidates: [],
      campaigns: [],
      conversations: [],
      selectedCandidateId: null,
      selectedCampaignId: null,
      filters: {
        specialty: '',
        location: '',
        status: '',
        minScore: 0
      },
      
      // User actions
      setUser: (user) => set({ user }),
      
      // Candidate actions
      addCandidate: (candidate) => set((state) => ({ 
        candidates: [...state.candidates, candidate] 
      })),
      
      updateCandidate: (id, updates) => set((state) => ({
        candidates: state.candidates.map(c => 
          c.id === id ? { ...c, ...updates } : c
        )
      })),
      
      deleteCandidate: (id) => set((state) => ({
        candidates: state.candidates.filter(c => c.id !== id)
      })),
      
      // Campaign actions
      addCampaign: (campaign) => set((state) => ({ 
        campaigns: [...state.campaigns, campaign] 
      })),
      
      updateCampaign: (id, updates) => set((state) => ({
        campaigns: state.campaigns.map(c => 
          c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
        )
      })),
      
      deleteCampaign: (id) => set((state) => ({
        campaigns: state.campaigns.filter(c => c.id !== id)
      })),
      
      // Conversation actions
      addConversation: (conversation) => set((state) => ({ 
        conversations: [...state.conversations, conversation] 
      })),
      
      addMessage: (conversationId, message) => set((state) => ({
        conversations: state.conversations.map(c => 
          c.id === conversationId 
            ? { ...c, messages: [...c.messages, message] }
            : c
        )
      })),
      
      // UI State actions
      setSelectedCandidateId: (id) => set({ selectedCandidateId: id }),
      setSelectedCampaignId: (id) => set({ selectedCampaignId: id }),
      
      // Filter actions
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      
      // Statistics
      getStatistics: () => {
        const state = get()
        const totalCandidates = state.candidates.length
        const activeCampaigns = state.campaigns.filter(c => c.status === 'active').length
        const placedCandidates = state.candidates.filter(c => c.status === 'placed').length
        const placementRate = totalCandidates > 0 ? (placedCandidates / totalCandidates) * 100 : 0
        
        const campaigns = state.campaigns
        const totalResponses = campaigns.reduce((sum, c) => sum + c.responses, 0)
        const totalSent = campaigns.reduce((sum, c) => sum + c.messageSent, 0)
        const responseRate = totalSent > 0 ? (totalResponses / totalSent) * 100 : 0
        
        return {
          totalCandidates,
          activeCampaigns,
          placementRate,
          avgTimeToFill: 18, // Mock for now
          responseRate
        }
      }
    }),
    {
      name: 'outreach-hunter-storage',
      partialize: (state) => ({
        user: state.user,
        candidates: state.candidates,
        campaigns: state.campaigns,
        conversations: state.conversations
      })
    }
  )
)

// Helper functions
export const generateId = () => Math.random().toString(36).substr(2, 9)

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '555-0101',
    specialty: 'Emergency Medicine',
    experience: 8,
    location: 'Los Angeles, CA',
    availability: 'Immediate',
    desiredSalary: 425000,
    licenses: ['CA', 'NV'],
    certifications: ['ABEM', 'ATLS', 'PALS'],
    score: 92,
    status: 'interested',
    linkedinUrl: 'linkedin.com/in/sarahjohnson',
    tags: ['trauma', 'leadership', 'research']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@email.com',
    phone: '555-0102',
    specialty: 'Critical Care',
    experience: 12,
    location: 'San Francisco, CA',
    availability: '30 days',
    desiredSalary: 480000,
    licenses: ['CA'],
    certifications: ['ABIM', 'FCCP'],
    score: 88,
    status: 'interviewing',
    linkedinUrl: 'linkedin.com/in/michaelchen',
    tags: ['ICU', 'teaching', 'protocols']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '555-0103',
    specialty: 'Hospitalist',
    experience: 5,
    location: 'San Diego, CA',
    availability: '60 days',
    desiredSalary: 350000,
    licenses: ['CA', 'AZ'],
    certifications: ['ABIM', 'SHM'],
    score: 85,
    status: 'new',
    linkedinUrl: 'linkedin.com/in/emilyrodriguez',
    tags: ['nocturnist', 'quality', 'EMR']
  }
]

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'ER Physicians - West Coast',
    status: 'active',
    targetSpecialty: 'Emergency Medicine',
    targetLocation: 'California',
    targetExperience: { min: 5, max: 15 },
    messageSent: 450,
    responses: 124,
    interviews: 42,
    placements: 8,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-20')
  },
  {
    id: '2',
    name: 'Critical Care - Q1 2024',
    status: 'active',
    targetSpecialty: 'Critical Care',
    targetLocation: 'Nationwide',
    targetExperience: { min: 3, max: 20 },
    messageSent: 320,
    responses: 89,
    interviews: 28,
    placements: 5,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-02-18')
  }
]