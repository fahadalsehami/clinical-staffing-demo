"use client"

import { useState } from 'react'
import { 
  Users, Brain, Zap, CheckCircle, Clock, AlertCircle,
  ArrowRight, MessageSquare, Calendar, DollarSign,
  FileText, Video, Phone, Mail, Send, RefreshCw,
  TrendingUp, Target, Award, Shield, Sparkles,
  Database, GitBranch, Activity, BarChart3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'

interface CandidateJourney {
  id: string
  name: string
  stage: string
  score: number
  nextAction: string
  timeline: string
  engagementLevel: 'cold' | 'warm' | 'hot' | 'committed'
  lastContact: string
  preferredChannel: string
  keyFactors: string[]
}

interface WorkflowStep {
  id: string
  name: string
  status: 'completed' | 'active' | 'pending' | 'blocked'
  duration: string
  automationLevel: number
  description: string
  actions: string[]
}

interface AgentTask {
  id: string
  type: 'outreach' | 'screening' | 'scheduling' | 'negotiation' | 'onboarding'
  priority: 'high' | 'medium' | 'low'
  candidate: string
  action: string
  dueTime: string
  status: 'pending' | 'in_progress' | 'completed'
  aiConfidence: number
}

const candidates: CandidateJourney[] = [
  {
    id: '1',
    name: 'Dr. Emily Rodriguez',
    stage: 'Interview Scheduled',
    score: 92,
    nextAction: 'Prepare interview packet',
    timeline: 'Thursday 8 PM',
    engagementLevel: 'hot',
    lastContact: '2 hours ago',
    preferredChannel: 'Phone',
    keyFactors: ['Work-life balance', 'Compensation', 'Family support']
  },
  {
    id: '2',
    name: 'Dr. James Mitchell',
    stage: 'Initial Outreach',
    score: 78,
    nextAction: 'Send personalized LinkedIn message',
    timeline: 'Today 3 PM',
    engagementLevel: 'warm',
    lastContact: '3 days ago',
    preferredChannel: 'LinkedIn',
    keyFactors: ['Career growth', 'Research opportunities', 'Location']
  },
  {
    id: '3',
    name: 'Dr. Sarah Chen',
    stage: 'Negotiation',
    score: 95,
    nextAction: 'Present counter-offer',
    timeline: 'Tomorrow 10 AM',
    engagementLevel: 'committed',
    lastContact: 'Yesterday',
    preferredChannel: 'Email',
    keyFactors: ['Sign-on bonus', 'Start date flexibility', 'CME allowance']
  },
  {
    id: '4',
    name: 'Dr. Michael Thompson',
    stage: 'Background Check',
    score: 88,
    nextAction: 'Complete verification',
    timeline: '2 days',
    engagementLevel: 'committed',
    lastContact: 'Today',
    preferredChannel: 'Text',
    keyFactors: ['Quick placement', 'Housing assistance', 'Visa support']
  }
]

const workflowSteps: WorkflowStep[] = [
  {
    id: '1',
    name: 'Discovery & Sourcing',
    status: 'completed',
    duration: '2-4 hours',
    automationLevel: 95,
    description: 'AI identifies and qualifies candidates from 19+ sources',
    actions: ['Search databases', 'Score candidates', 'Build profiles', 'Rank by fit']
  },
  {
    id: '2',
    name: 'Initial Engagement',
    status: 'completed',
    duration: '24-48 hours',
    automationLevel: 90,
    description: 'Personalized multi-channel outreach campaigns',
    actions: ['Generate messages', 'Send outreach', 'Track responses', 'Schedule follow-ups']
  },
  {
    id: '3',
    name: 'Screening & Qualification',
    status: 'active',
    duration: '1-2 days',
    automationLevel: 85,
    description: 'AI voice agent conducts initial screening calls',
    actions: ['Conduct calls', 'Assess interest', 'Verify credentials', 'Score readiness']
  },
  {
    id: '4',
    name: 'Interview Coordination',
    status: 'pending',
    duration: '2-3 days',
    automationLevel: 80,
    description: 'Automated scheduling and preparation',
    actions: ['Schedule meetings', 'Send prep materials', 'Coordinate stakeholders', 'Send reminders']
  },
  {
    id: '5',
    name: 'Offer & Negotiation',
    status: 'pending',
    duration: '3-5 days',
    automationLevel: 70,
    description: 'AI-assisted offer generation and negotiation',
    actions: ['Generate offers', 'Handle negotiations', 'Document agreements', 'Finalize terms']
  },
  {
    id: '6',
    name: 'Onboarding',
    status: 'pending',
    duration: '1-2 weeks',
    automationLevel: 85,
    description: 'Automated onboarding and credentialing',
    actions: ['Process paperwork', 'Schedule orientation', 'Coordinate relocation', 'Track progress']
  }
]

const agentTasks: AgentTask[] = [
  {
    id: '1',
    type: 'scheduling',
    priority: 'high',
    candidate: 'Dr. Rodriguez',
    action: 'Confirm Thursday 8 PM video call with hiring manager',
    dueTime: 'In 2 hours',
    status: 'pending',
    aiConfidence: 95
  },
  {
    id: '2',
    type: 'outreach',
    priority: 'medium',
    candidate: 'Dr. Mitchell',
    action: 'Send LinkedIn InMail with Stanford alumni angle',
    dueTime: 'Today 3 PM',
    status: 'pending',
    aiConfidence: 88
  },
  {
    id: '3',
    type: 'negotiation',
    priority: 'high',
    candidate: 'Dr. Chen',
    action: 'Present revised offer with 10% sign-on bonus increase',
    dueTime: 'Tomorrow 10 AM',
    status: 'in_progress',
    aiConfidence: 92
  },
  {
    id: '4',
    type: 'screening',
    priority: 'low',
    candidate: 'Dr. Thompson',
    action: 'Verify DEA registration and state licenses',
    dueTime: 'In 2 days',
    status: 'pending',
    aiConfidence: 100
  }
]

const integrations = [
  { name: 'Salesforce', status: 'connected', sync: 'Real-time', records: '45K' },
  { name: 'Bullhorn', status: 'connected', sync: 'Every 15 min', records: '32K' },
  { name: 'LinkedIn Recruiter', status: 'connected', sync: 'Hourly', records: '128K' },
  { name: 'Indeed', status: 'pending', sync: 'Daily', records: '0' },
  { name: 'Slack', status: 'connected', sync: 'Real-time', records: 'N/A' },
  { name: 'Zoom', status: 'connected', sync: 'On-demand', records: 'N/A' }
]

export function RecruitmentAgentIntegration() {
  const [activeView, setActiveView] = useState<'pipeline' | 'workflow' | 'tasks' | 'analytics'>('pipeline')
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateJourney | null>(null)

  const getEngagementColor = (level: string) => {
    switch (level) {
      case 'cold': return 'text-blue-500 bg-blue-500/10'
      case 'warm': return 'text-yellow-500 bg-yellow-500/10'
      case 'hot': return 'text-orange-500 bg-orange-500/10'
      case 'committed': return 'text-green-500 bg-green-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            AI Recruitment Agent Hub
          </h2>
          <p className="text-muted-foreground">Intelligent end-to-end recruitment automation</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Activity className="w-3 h-3" />
            12 Active Pipelines
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Users className="w-3 h-3" />
            47 Candidates
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Zap className="w-3 h-3" />
            87% Automated
          </Badge>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex space-x-2">
        <Button
          variant={activeView === 'pipeline' ? 'default' : 'outline'}
          onClick={() => setActiveView('pipeline')}
        >
          <GitBranch className="w-4 h-4 mr-2" />
          Pipeline
        </Button>
        <Button
          variant={activeView === 'workflow' ? 'default' : 'outline'}
          onClick={() => setActiveView('workflow')}
        >
          <Activity className="w-4 h-4 mr-2" />
          Workflow
        </Button>
        <Button
          variant={activeView === 'tasks' ? 'default' : 'outline'}
          onClick={() => setActiveView('tasks')}
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Agent Tasks
        </Button>
        <Button
          variant={activeView === 'analytics' ? 'default' : 'outline'}
          onClick={() => setActiveView('analytics')}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics
        </Button>
      </div>

      {/* Pipeline View */}
      {activeView === 'pipeline' && (
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Candidate Pipelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidates.map((candidate) => (
                <motion.div
                  key={candidate.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground">{candidate.stage}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getEngagementColor(candidate.engagementLevel)}>
                        {candidate.engagementLevel}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">Score: {candidate.score}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next Action</span>
                      <span className="font-medium">{candidate.nextAction}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Timeline</span>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {candidate.timeline}
                      </Badge>
                    </div>
                    <Progress value={candidate.score} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {selectedCandidate ? (
            <Card>
              <CardHeader>
                <CardTitle>Candidate Journey Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">{selectedCandidate.name}</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Stage:</span>
                        <p className="font-medium">{selectedCandidate.stage}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Match Score:</span>
                        <p className="font-medium">{selectedCandidate.score}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Contact:</span>
                        <p className="font-medium">{selectedCandidate.lastContact}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Preferred Channel:</span>
                        <p className="font-medium">{selectedCandidate.preferredChannel}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Key Decision Factors</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.keyFactors.map((factor) => (
                        <Badge key={factor} variant="secondary">{factor}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">AI Recommendations</h5>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <p className="text-sm">
                          <strong>Next Best Action:</strong> {selectedCandidate.nextAction}
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <p className="text-sm">
                          <strong>Timing:</strong> Contact via {selectedCandidate.preferredChannel} {selectedCandidate.timeline}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Select a candidate to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Workflow View */}
      {activeView === 'workflow' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Recruitment Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 border rounded-lg ${
                      step.status === 'active' ? 'border-primary bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-100 text-green-600' :
                          step.status === 'active' ? 'bg-primary/20 text-primary' :
                          step.status === 'blocked' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {step.status === 'completed' ? <CheckCircle className="w-5 h-5" /> :
                           step.status === 'active' ? <Activity className="w-5 h-5 animate-pulse" /> :
                           step.status === 'blocked' ? <AlertCircle className="w-5 h-5" /> :
                           <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{step.name}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={step.status === 'completed' ? 'default' : 'outline'}>
                          {step.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{step.duration}</p>
                      </div>
                    </div>
                    
                    <div className="ml-13 space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Automation Level</span>
                        <span className="text-sm font-medium">{step.automationLevel}%</span>
                      </div>
                      <Progress value={step.automationLevel} className="h-2" />
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {step.actions.map((action) => (
                          <Badge key={action} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tasks View */}
      {activeView === 'tasks' && (
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Agent Task Queue</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agentTasks.map((task) => (
                <div key={task.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                      <span className="font-medium text-sm">{task.candidate}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {task.dueTime}
                    </Badge>
                  </div>
                  
                  <p className="text-sm mb-2">{task.action}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Progress value={task.aiConfidence} className="w-20 h-2" />
                      <span className="text-xs text-muted-foreground">{task.aiConfidence}% confidence</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Zap className="w-3 h-3 mr-1" />
                      Execute
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {integrations.map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{integration.name}</p>
                      <p className="text-xs text-muted-foreground">Sync: {integration.sync}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                        {integration.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{integration.records} records</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">API Health</span>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                    <p className="font-medium">99.9%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Response</p>
                    <p className="font-medium">142ms</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Requests</p>
                    <p className="font-medium">24.5K/hr</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics View */}
      {activeView === 'analytics' && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-primary" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">47</p>
              <p className="text-sm text-muted-foreground">Active Candidates</p>
              <Progress value={68} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-8 h-8 text-green-500" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">89%</p>
              <p className="text-sm text-muted-foreground">Placement Rate</p>
              <Progress value={89} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">18 days</p>
              <p className="text-sm text-muted-foreground">Avg Time to Fill</p>
              <Progress value={75} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 text-purple-500" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">$1,180</p>
              <p className="text-sm text-muted-foreground">Cost per Hire</p>
              <Progress value={92} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-8 h-8 text-yellow-500" />
                <Activity className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">87%</p>
              <p className="text-sm text-muted-foreground">Automation Rate</p>
              <Progress value={87} className="h-1 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 text-orange-500" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">4.8/5</p>
              <p className="text-sm text-muted-foreground">Candidate Satisfaction</p>
              <Progress value={96} className="h-1 mt-2" />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}