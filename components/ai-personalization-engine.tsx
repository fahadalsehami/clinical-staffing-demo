"use client"

import { useState } from 'react'
import { 
  Sparkles, Brain, Target, Zap, TrendingUp, 
  MessageSquare, Mail, Phone, Calendar, Clock,
  User, Building, MapPin, DollarSign, Award
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'

interface PersonalizationFactor {
  id: string
  category: string
  factor: string
  weight: number
  value: string | number
  impact: 'high' | 'medium' | 'low'
  icon: any
}

interface PersonalizedMessage {
  channel: string
  subject?: string
  content: string
  timing: string
  personalizationScore: number
  predictedResponse: number
}

interface Candidate {
  id: string
  name: string
  specialty: string
  location: string
  experience: number
  currentRole: string
  personalityType: string
  communicationStyle: string
  motivators: string[]
  painPoints: string[]
  careerStage: string
  engagementScore: number
}

const sampleCandidate: Candidate = {
  id: '1',
  name: 'Dr. Emily Rodriguez',
  specialty: 'Emergency Medicine',
  location: 'Los Angeles, CA',
  experience: 8,
  currentRole: 'Attending Physician',
  personalityType: 'Driver-Analytical',
  communicationStyle: 'Direct & Data-Driven',
  motivators: ['Work-life balance', 'Career growth', 'Compensation'],
  painPoints: ['Burnout', 'Administrative burden', 'Limited advancement'],
  careerStage: 'Mid-Career',
  engagementScore: 78
}

const personalizationFactors: PersonalizationFactor[] = [
  // Professional Factors
  { id: '1', category: 'Professional', factor: 'Years of Experience', weight: 8, value: '8 years', impact: 'high', icon: Award },
  { id: '2', category: 'Professional', factor: 'Current Position Level', weight: 7, value: 'Attending', impact: 'high', icon: Building },
  { id: '3', category: 'Professional', factor: 'Specialty Match', weight: 9, value: '95%', impact: 'high', icon: Target },
  { id: '4', category: 'Professional', factor: 'Career Trajectory', weight: 6, value: 'Ascending', impact: 'medium', icon: TrendingUp },
  
  // Personal Factors
  { id: '5', category: 'Personal', factor: 'Life Stage', weight: 7, value: 'Young Family', impact: 'high', icon: User },
  { id: '6', category: 'Personal', factor: 'Geographic Preference', weight: 8, value: 'West Coast', impact: 'high', icon: MapPin },
  { id: '7', category: 'Personal', factor: 'Work-Life Priority', weight: 9, value: 'High', impact: 'high', icon: Clock },
  { id: '8', category: 'Personal', factor: 'Compensation Expectations', weight: 7, value: '$450-500K', impact: 'medium', icon: DollarSign },
  
  // Behavioral Factors
  { id: '9', category: 'Behavioral', factor: 'Response History', weight: 6, value: 'Email Preferred', impact: 'medium', icon: Mail },
  { id: '10', category: 'Behavioral', factor: 'Engagement Pattern', weight: 5, value: 'Morning Active', impact: 'low', icon: Clock },
  { id: '11', category: 'Behavioral', factor: 'Content Preferences', weight: 4, value: 'Case Studies', impact: 'low', icon: MessageSquare },
  { id: '12', category: 'Behavioral', factor: 'Decision Timeline', weight: 8, value: '30-45 days', impact: 'high', icon: Calendar },
  
  // Psychographic Factors
  { id: '13', category: 'Psychographic', factor: 'Personality Type', weight: 6, value: 'Driver', impact: 'medium', icon: Brain },
  { id: '14', category: 'Psychographic', factor: 'Communication Style', weight: 7, value: 'Direct', impact: 'high', icon: MessageSquare },
  { id: '15', category: 'Psychographic', factor: 'Risk Tolerance', weight: 5, value: 'Moderate', impact: 'medium', icon: Target },
  { id: '16', category: 'Psychographic', factor: 'Innovation Interest', weight: 4, value: 'High', impact: 'low', icon: Sparkles }
]

const messageTemplates: PersonalizedMessage[] = [
  {
    channel: 'Email',
    subject: 'Dr. Rodriguez - Exclusive ER Opportunity with Better Work-Life Balance',
    content: `Hi Emily,

I noticed you've been at Cedar Sinai for 8 years - impressive dedication! Given your experience level and the fact you're managing a young family, I wanted to share an opportunity that specifically addresses work-life balance concerns many mid-career ER physicians face.

Our client offers:
• Flexible 3x12 shifts (your preferred schedule)
• No mandatory overtime or call
• $475K base (within your range) + productivity bonus
• Full relocation support for your family

The medical director role is opening next year - perfect timing for your career trajectory.

Worth a quick 15-minute call this week? I'm free Tuesday or Thursday mornings (I know that's when you prefer calls).

Best,
Sarah`,
    timing: 'Tuesday 9:00 AM',
    personalizationScore: 94,
    predictedResponse: 82
  },
  {
    channel: 'LinkedIn',
    content: `Emily - Saw your recent ACEP presentation on pediatric trauma protocols. Impressive work! 

Quick question: If you could design the perfect ER role, what would be your top 3 must-haves? 

I'm working with a Level 1 trauma center in Orange County that's building their department around physician input. Based on your background, you'd be an ideal voice in shaping their new model.`,
    timing: 'Wednesday 11:00 AM',
    personalizationScore: 91,
    predictedResponse: 75
  },
  {
    channel: 'Text',
    content: `Hi Dr. Rodriguez - Sarah from MedTalent here. I have an ER opportunity in Pasadena that matches your criteria (especially the work-life balance aspect). Worth a brief chat? I can call whenever works for your schedule.`,
    timing: 'Monday 2:00 PM',
    personalizationScore: 86,
    predictedResponse: 68
  }
]

const aiInsights = [
  { insight: 'High probability of response to work-life balance messaging', confidence: 92 },
  { insight: 'Prefers data-driven communication with specific details', confidence: 88 },
  { insight: 'Best engagement window: Weekday mornings 9-11 AM', confidence: 85 },
  { insight: 'Career advancement motivation increasing (director interest)', confidence: 79 },
  { insight: 'Geographic flexibility limited due to family considerations', confidence: 91 }
]

export function AIPersonalizationEngine() {
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedMessage, setSelectedMessage] = useState<PersonalizedMessage | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateMessages = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const categories = [...new Set(personalizationFactors.map(f => f.category))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="w-6 h-6 mr-2 text-primary" />
            AI Personalization Engine
          </h2>
          <p className="text-muted-foreground">100% personalized outreach based on 40+ behavioral factors</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            <Sparkles className="w-3 h-3 mr-1" />
            GPT-4 Powered
          </Badge>
          <Badge variant="default">
            {sampleCandidate.engagementScore}% Match
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2">
        <Button
          variant={activeTab === 'profile' ? 'default' : 'outline'}
          onClick={() => setActiveTab('profile')}
        >
          <User className="w-4 h-4 mr-2" />
          Candidate Profile
        </Button>
        <Button
          variant={activeTab === 'factors' ? 'default' : 'outline'}
          onClick={() => setActiveTab('factors')}
        >
          <Target className="w-4 h-4 mr-2" />
          Personalization Factors
        </Button>
        <Button
          variant={activeTab === 'messages' ? 'default' : 'outline'}
          onClick={() => setActiveTab('messages')}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Generated Messages
        </Button>
        <Button
          variant={activeTab === 'insights' ? 'default' : 'outline'}
          onClick={() => setActiveTab('insights')}
        >
          <Brain className="w-4 h-4 mr-2" />
          AI Insights
        </Button>
      </div>

      {activeTab === 'profile' && (
        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Candidate Intelligence Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Name</Label>
                  <p className="font-medium">{sampleCandidate.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Specialty</Label>
                  <p className="font-medium">{sampleCandidate.specialty}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Location</Label>
                  <p className="font-medium">{sampleCandidate.location}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Experience</Label>
                  <p className="font-medium">{sampleCandidate.experience} years</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Current Role</Label>
                  <p className="font-medium">{sampleCandidate.currentRole}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Career Stage</Label>
                  <p className="font-medium">{sampleCandidate.careerStage}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label className="text-sm text-muted-foreground mb-2 block">Personality Profile</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">Type: {sampleCandidate.personalityType}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium">Style: {sampleCandidate.communicationStyle}</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Key Motivators</Label>
                <div className="flex flex-wrap gap-2">
                  {sampleCandidate.motivators.map(m => (
                    <Badge key={m} variant="default">{m}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Pain Points</Label>
                <div className="flex flex-wrap gap-2">
                  {sampleCandidate.painPoints.map(p => (
                    <Badge key={p} variant="destructive">{p}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - sampleCandidate.engagementScore / 100)}`}
                      className="text-primary transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{sampleCandidate.engagementScore}%</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Likelihood to Engage</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Response Rate</span>
                  <span className="font-medium">High</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Best Channel</span>
                  <span className="font-medium">Email</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Optimal Time</span>
                  <span className="font-medium">9-11 AM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'factors' && (
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3">{category} Factors</h3>
              <div className="grid grid-cols-2 gap-4">
                {personalizationFactors
                  .filter(f => f.category === category)
                  .map((factor, index) => (
                    <motion.div
                      key={factor.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <factor.icon className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium text-sm">{factor.factor}</p>
                                <p className="text-xs text-muted-foreground">{factor.value}</p>
                              </div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={getImpactColor(factor.impact)}
                            >
                              {factor.impact}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-muted-foreground">Weight</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={factor.weight * 10} className="w-20 h-2" />
                              <span className="text-xs font-medium">{factor.weight}/10</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              AI-generated messages optimized for {sampleCandidate.name}'s profile
            </p>
            <Button onClick={generateMessages} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Regenerate Messages
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-4">
            {messageTemplates.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {message.channel === 'Email' && <Mail className="w-5 h-5 text-primary" />}
                        {message.channel === 'LinkedIn' && <MessageSquare className="w-5 h-5 text-blue-600" />}
                        {message.channel === 'Text' && <Phone className="w-5 h-5 text-green-600" />}
                        <div>
                          <p className="font-semibold">{message.channel}</p>
                          <p className="text-xs text-muted-foreground">{message.timing}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default">
                          {message.personalizationScore}% Personalized
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.predictedResponse}% response rate
                        </p>
                      </div>
                    </div>

                    {message.subject && (
                      <p className="font-medium mb-2">{message.subject}</p>
                    )}
                    
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {message.content}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="text-xs">
                          <Target className="w-3 h-3 mr-1" />
                          Work-Life Balance
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          Career Growth
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        Preview Full Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'insights' && (
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiInsights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                      <p className="text-sm">{item.insight}</p>
                    </div>
                    <Badge variant={item.confidence > 85 ? 'default' : 'secondary'}>
                      {item.confidence}%
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                <p className="text-sm font-medium mb-1">Primary Strategy</p>
                <p className="text-sm text-muted-foreground">
                  Lead with work-life balance benefits and flexible scheduling. Emphasize family-friendly policies.
                </p>
              </div>
              <div className="p-3 border-l-4 border-blue-500 bg-blue-500/5 rounded">
                <p className="text-sm font-medium mb-1">Message Timing</p>
                <p className="text-sm text-muted-foreground">
                  Schedule initial outreach for Tuesday or Thursday mornings between 9-11 AM PST.
                </p>
              </div>
              <div className="p-3 border-l-4 border-green-500 bg-green-500/5 rounded">
                <p className="text-sm font-medium mb-1">Follow-up Sequence</p>
                <p className="text-sm text-muted-foreground">
                  Use 3-touch email sequence with 4-day intervals. Include case studies in second touch.
                </p>
              </div>
              <div className="p-3 border-l-4 border-purple-500 bg-purple-500/5 rounded">
                <p className="text-sm font-medium mb-1">Value Proposition</p>
                <p className="text-sm text-muted-foreground">
                  Highlight leadership pathway and medical director opportunity timeline.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function Label({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <div className={`font-medium ${className}`}>{children}</div>
}