"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  Phone, Mic, MicOff, PhoneOff, Play, Pause, 
  Volume2, VolumeX, Activity, Brain, MessageSquare,
  CheckCircle, AlertCircle, XCircle, Clock,
  TrendingUp, User, Calendar, DollarSign,
  Briefcase, MapPin, Heart, Shield, Sparkles,
  BarChart3, FileText, Send, RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'

interface ConversationTurn {
  id: string
  speaker: 'agent' | 'candidate'
  text: string
  timestamp: string
  sentiment: 'positive' | 'neutral' | 'negative'
  intent?: string
  keyPoints?: string[]
}

interface CallMetrics {
  duration: string
  talkTime: { agent: number, candidate: number }
  sentiment: { positive: number, neutral: number, negative: number }
  engagementScore: number
  objections: string[]
  interests: string[]
  nextSteps: string[]
}

interface AgentStrategy {
  phase: 'intro' | 'discovery' | 'presentation' | 'objection_handling' | 'closing' | 'follow_up'
  objective: string
  talkingPoints: string[]
  questionsToAsk: string[]
}

const conversationScript: ConversationTurn[] = [
  {
    id: '1',
    speaker: 'agent',
    text: "Hi Dr. Rodriguez, this is Sarah from MedTalent Partners. I know you're busy, so I'll be brief. I'm calling about an exciting emergency medicine opportunity at Cedar Sinai that specifically addresses the work-life balance challenges many physicians face. Do you have 2 minutes?",
    timestamp: '0:00',
    sentiment: 'neutral',
    intent: 'introduction'
  },
  {
    id: '2',
    speaker: 'candidate',
    text: "Oh, hi Sarah. I wasn't expecting a call, but... sure, I can spare a couple minutes. What's this about exactly?",
    timestamp: '0:18',
    sentiment: 'neutral',
    intent: 'cautious_interest'
  },
  {
    id: '3',
    speaker: 'agent',
    text: "I appreciate your time, Dr. Rodriguez. I noticed your recent publication on pediatric trauma protocols - impressive work! The reason I'm reaching out is that Cedar Sinai is launching a new evidence-based ER initiative, and they're specifically looking for someone with your expertise in pediatric emergency care. They're offering a unique 7-on/7-off schedule with no mandatory overtime. How does your current schedule compare?",
    timestamp: '0:26',
    sentiment: 'positive',
    intent: 'value_proposition',
    keyPoints: ['Personalized reference', 'Specific opportunity', 'Work-life balance focus']
  },
  {
    id: '4',
    speaker: 'candidate',
    text: "Well, right now I'm doing five 12-hour shifts a week, plus call twice a month. It's been pretty exhausting, especially with two young kids at home. The 7-on/7-off sounds interesting... but I'm curious, what's the patient volume like?",
    timestamp: '0:52',
    sentiment: 'positive',
    intent: 'engaged_with_concerns',
    keyPoints: ['Current pain point identified', 'Interest in schedule', 'Quality concern raised']
  },
  {
    id: '5',
    speaker: 'agent',
    text: "That's a great question, and I understand the concern about volume - it directly impacts quality of care. They see about 180-200 patients per day across a 52-bed ER, with excellent physician-to-patient ratios. They maintain 4-5 attendings during peak hours, plus residents. Most importantly, they have dedicated scribes and a rapid triage system that's reduced door-to-doctor time by 40%. How does that compare to your current facility?",
    timestamp: '1:10',
    sentiment: 'positive',
    intent: 'addressing_concerns',
    keyPoints: ['Specific metrics provided', 'Quality indicators highlighted']
  },
  {
    id: '6',
    speaker: 'candidate',
    text: "That's actually better staffing than we have. We're seeing similar volume but with only 3 attendings most shifts. The scribe support would be huge - I spend way too much time on documentation. What about compensation? I'm currently at $425K base.",
    timestamp: '1:35',
    sentiment: 'positive',
    intent: 'compensation_inquiry',
    keyPoints: ['Positive comparison', 'Compensation discussion opened']
  },
  {
    id: '7',
    speaker: 'agent',
    text: "I'm glad you asked about compensation. The base range is $450-500K, depending on experience, plus productivity bonuses that typically add another 15-20%. With your 8 years of experience and subspecialty training, you'd likely be at the higher end. They also offer a $50K signing bonus, full relocation support, and excellent benefits including a 6% 401k match. Would it be helpful if I sent you the complete compensation package details?",
    timestamp: '1:58',
    sentiment: 'positive',
    intent: 'compensation_presentation',
    keyPoints: ['Above current comp', 'Additional incentives', 'Moving toward next steps']
  },
  {
    id: '8',
    speaker: 'candidate',
    text: "Yes, I'd definitely like to see that. This is sounding more interesting than I expected. My main concern would be relocating the family - my spouse works here too. Do they have any spousal placement assistance?",
    timestamp: '2:25',
    sentiment: 'positive',
    intent: 'interested_with_objection',
    keyPoints: ['Interest confirmed', 'Relocation concern', 'Spousal consideration']
  },
  {
    id: '9',
    speaker: 'agent',
    text: "Absolutely, and that's such an important consideration. Cedar Sinai has a comprehensive relocation program that includes spousal career assistance. They work with a placement firm that has helped 90% of relocating spouses find positions within 60 days. Plus, Los Angeles has a thriving healthcare market. What field is your spouse in?",
    timestamp: '2:42',
    sentiment: 'positive',
    intent: 'objection_handling'
  },
  {
    id: '10',
    speaker: 'candidate',
    text: "She's a pediatric nurse practitioner. That's really good to know about the placement assistance. Look, I wasn't planning on making any moves right now, but this does sound like it could be worth exploring. What would be the next step?",
    timestamp: '3:05',
    sentiment: 'positive',
    intent: 'ready_to_proceed',
    keyPoints: ['Objection addressed', 'Interest in next steps']
  },
  {
    id: '11',
    speaker: 'agent',
    text: "I'm so glad you're interested, Dr. Rodriguez! The next step would be a casual video call with Dr. James Mitchell, the ER Director. He's also a parent and made a similar move for work-life balance three years ago. He's available Tuesday at 7 PM or Thursday at 8 PM - both after typical bedtime routines. Which works better for you?",
    timestamp: '3:25',
    sentiment: 'positive',
    intent: 'scheduling',
    keyPoints: ['Specific next step', 'Personalized scheduling options']
  },
  {
    id: '12',
    speaker: 'candidate',
    text: "Thursday at 8 PM would work well. Can you send me some information about the position and the hospital before then? I'd like to do some research and discuss it with my wife.",
    timestamp: '3:45',
    sentiment: 'positive',
    intent: 'commitment',
    keyPoints: ['Meeting scheduled', 'Information requested', 'Family involvement']
  },
  {
    id: '13',
    speaker: 'agent',
    text: "Perfect! I'll send you a comprehensive packet within the hour including the position details, compensation structure, relocation benefits, and some videos from current physicians about their experience. I'll also include information about schools and neighborhoods since you mentioned having young children. The video call invite will come from Dr. Mitchell directly. Is this the best number to text you a confirmation?",
    timestamp: '4:02',
    sentiment: 'positive',
    intent: 'confirmation',
    keyPoints: ['Follow-up materials', 'Personal touches', 'Contact confirmation']
  },
  {
    id: '14',
    speaker: 'candidate',
    text: "Yes, this number works for texts. Sarah, I really appreciate how prepared you were for this call. You clearly did your homework. I'll look for that information and I'll see Dr. Mitchell on Thursday.",
    timestamp: '4:20',
    sentiment: 'positive',
    intent: 'positive_close',
    keyPoints: ['Appreciation expressed', 'Commitment confirmed']
  },
  {
    id: '15',
    speaker: 'agent',
    text: "Thank you so much, Dr. Rodriguez! I'm excited about this potential fit. I'll send everything shortly, and I'll follow up on Wednesday to make sure you have everything you need for Thursday's call. Have a wonderful rest of your day, and good luck with your shift tonight!",
    timestamp: '4:35',
    sentiment: 'positive',
    intent: 'closing',
    keyPoints: ['Follow-up scheduled', 'Personal touch', 'Professional close']
  }
]

const realTimeMetrics = {
  intents: {
    interest_level: 85,
    objection_severity: 20,
    commitment_probability: 78,
    satisfaction_score: 92
  },
  topics: [
    { topic: 'Work-Life Balance', mentions: 4, sentiment: 'positive' },
    { topic: 'Compensation', mentions: 3, sentiment: 'positive' },
    { topic: 'Patient Care Quality', mentions: 2, sentiment: 'neutral' },
    { topic: 'Relocation', mentions: 2, sentiment: 'concerned' },
    { topic: 'Family Considerations', mentions: 3, sentiment: 'important' }
  ],
  keyMoments: [
    { time: '0:52', event: 'Pain point identified', impact: 'high' },
    { time: '1:35', event: 'Compensation interest', impact: 'high' },
    { time: '2:25', event: 'Spousal concern raised', impact: 'medium' },
    { time: '3:05', event: 'Ready to proceed signal', impact: 'critical' },
    { time: '3:45', event: 'Meeting confirmed', impact: 'success' }
  ]
}

export function AIVoiceAgentAdvanced() {
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle')
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [activeTab, setActiveTab] = useState<'conversation' | 'analytics' | 'strategy' | 'coaching'>('conversation')
  const [agentStrategy, setAgentStrategy] = useState<AgentStrategy>({
    phase: 'intro',
    objective: 'Build rapport and identify pain points',
    talkingPoints: [
      'Reference recent publication',
      'Mention work-life balance',
      'Highlight 7-on/7-off schedule'
    ],
    questionsToAsk: [
      'Current schedule satisfaction?',
      'Important factors in next role?',
      'Timeline for making a change?'
    ]
  })
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (callState === 'active' && isPlaying) {
      intervalRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1)
        
        // Auto-advance conversation
        if (currentTurnIndex < conversationScript.length - 1) {
          if (callDuration % 3 === 0) {
            setCurrentTurnIndex(prev => prev + 1)
            updateStrategy(currentTurnIndex)
          }
        } else {
          setIsPlaying(false)
          setCallState('ended')
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [callState, isPlaying, callDuration, currentTurnIndex])

  const updateStrategy = (turnIndex: number) => {
    if (turnIndex < 3) {
      setAgentStrategy({
        phase: 'intro',
        objective: 'Build rapport and identify pain points',
        talkingPoints: ['Reference recent work', 'Work-life balance focus', 'Brief value prop'],
        questionsToAsk: ['Current schedule?', 'Pain points?']
      })
    } else if (turnIndex < 6) {
      setAgentStrategy({
        phase: 'discovery',
        objective: 'Understand needs and concerns',
        talkingPoints: ['Specific metrics', 'Quality indicators', 'Staffing levels'],
        questionsToAsk: ['Patient volume concerns?', 'Compensation expectations?']
      })
    } else if (turnIndex < 9) {
      setAgentStrategy({
        phase: 'presentation',
        objective: 'Present compelling offer',
        talkingPoints: ['Compensation package', 'Benefits', 'Relocation support'],
        questionsToAsk: ['Other concerns?', 'Decision timeline?']
      })
    } else if (turnIndex < 12) {
      setAgentStrategy({
        phase: 'objection_handling',
        objective: 'Address concerns and build confidence',
        talkingPoints: ['Spousal assistance', 'Family considerations', 'Success stories'],
        questionsToAsk: ['What would make this ideal?', 'Ready for next steps?']
      })
    } else {
      setAgentStrategy({
        phase: 'closing',
        objective: 'Secure commitment and next steps',
        talkingPoints: ['Schedule meeting', 'Send materials', 'Follow-up plan'],
        questionsToAsk: ['Best time for call?', 'Preferred contact method?']
      })
    }
  }

  const startCall = () => {
    setCallState('connecting')
    setTimeout(() => {
      setCallState('active')
      setIsPlaying(true)
    }, 2000)
  }

  const endCall = () => {
    setCallState('ended')
    setIsPlaying(false)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getCurrentSentiment = () => {
    const recent = conversationScript.slice(Math.max(0, currentTurnIndex - 2), currentTurnIndex + 1)
    const sentiments = recent.map(turn => turn.sentiment)
    const positive = sentiments.filter(s => s === 'positive').length
    const negative = sentiments.filter(s => s === 'negative').length
    
    if (positive > negative) return 'positive'
    if (negative > positive) return 'negative'
    return 'neutral'
  }

  const getEngagementLevel = () => {
    const progress = (currentTurnIndex / conversationScript.length) * 100
    if (progress < 30) return 'Warming Up'
    if (progress < 60) return 'Engaged'
    if (progress < 90) return 'Highly Engaged'
    return 'Committed'
  }

  return (
    <div className="space-y-6">
      {/* Call Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              AI Voice Agent - Live Call Simulation
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={callState === 'active' ? 'default' : 'secondary'}>
                {callState === 'idle' && 'Ready'}
                {callState === 'connecting' && 'Connecting...'}
                {callState === 'active' && 'Live Call'}
                {callState === 'ended' && 'Call Ended'}
              </Badge>
              {callState === 'active' && (
                <Badge variant="outline" className="font-mono">
                  {formatDuration(callDuration)}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Dr. Emily Rodriguez</span>
                <Badge variant="outline" className="text-xs">Emergency Medicine</Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Los Angeles, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">8 years experience</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {callState === 'idle' && (
                <Button onClick={startCall} size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Start Call
                </Button>
              )}
              {callState === 'active' && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={endCall}
                  >
                    <PhoneOff className="w-4 h-4" />
                  </Button>
                </>
              )}
              {callState === 'ended' && (
                <Button 
                  variant="outline"
                  onClick={() => {
                    setCallState('idle')
                    setCurrentTurnIndex(0)
                    setCallDuration(0)
                  }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Real-time Status Bar */}
          {callState === 'active' && (
            <div className="grid grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg mb-6">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Sentiment</p>
                <Badge variant={getCurrentSentiment() === 'positive' ? 'default' : 'secondary'}>
                  {getCurrentSentiment()}
                </Badge>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                <p className="font-medium text-sm">{getEngagementLevel()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Interest Level</p>
                <p className="font-medium text-sm">{realTimeMetrics.intents.interest_level}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Next Step Probability</p>
                <p className="font-medium text-sm">{realTimeMetrics.intents.commitment_probability}%</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex space-x-2 mb-6">
            {['conversation', 'analytics', 'strategy', 'coaching'].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab as any)}
                className="capitalize"
              >
                {tab === 'conversation' && <MessageSquare className="w-4 h-4 mr-2" />}
                {tab === 'analytics' && <BarChart3 className="w-4 h-4 mr-2" />}
                {tab === 'strategy' && <Brain className="w-4 h-4 mr-2" />}
                {tab === 'coaching' && <Sparkles className="w-4 h-4 mr-2" />}
                {tab}
              </Button>
            ))}
          </div>

          {/* Conversation Tab */}
          {activeTab === 'conversation' && (
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              <AnimatePresence>
                {conversationScript.slice(0, currentTurnIndex + 1).map((turn, index) => (
                  <motion.div
                    key={turn.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${turn.speaker === 'agent' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[70%] ${turn.speaker === 'agent' ? 'order-2' : 'order-1'}`}>
                      <div className={`p-4 rounded-lg ${
                        turn.speaker === 'agent' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium">
                            {turn.speaker === 'agent' ? 'Sarah (AI Agent)' : 'Dr. Rodriguez'}
                          </span>
                          <span className="text-xs opacity-70">{turn.timestamp}</span>
                        </div>
                        <p className="text-sm">{turn.text}</p>
                        {turn.keyPoints && (
                          <div className="mt-2 pt-2 border-t border-white/20">
                            <div className="flex flex-wrap gap-1">
                              {turn.keyPoints.map((point, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {point}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {turn.intent && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          Intent: {turn.intent.replace(/_/g, ' ')}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {callState === 'active' && isPlaying && (
                <div className="flex justify-start">
                  <div className="bg-primary/10 rounded-lg p-4 max-w-[70%]">
                    <div className="flex items-center gap-2">
                      <div className="animate-pulse flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      <span className="text-xs text-muted-foreground">AI Agent is listening...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Live Metrics
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Interest Level</span>
                          <span className="text-sm font-medium">{realTimeMetrics.intents.interest_level}%</span>
                        </div>
                        <Progress value={realTimeMetrics.intents.interest_level} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Commitment Probability</span>
                          <span className="text-sm font-medium">{realTimeMetrics.intents.commitment_probability}%</span>
                        </div>
                        <Progress value={realTimeMetrics.intents.commitment_probability} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Satisfaction Score</span>
                          <span className="text-sm font-medium">{realTimeMetrics.intents.satisfaction_score}%</span>
                        </div>
                        <Progress value={realTimeMetrics.intents.satisfaction_score} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Key Topics
                    </h4>
                    <div className="space-y-2">
                      {realTimeMetrics.topics.map((topic) => (
                        <div key={topic.topic} className="flex items-center justify-between">
                          <span className="text-sm">{topic.topic}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {topic.mentions}x
                            </Badge>
                            <Badge 
                              variant={
                                topic.sentiment === 'positive' ? 'default' :
                                topic.sentiment === 'negative' ? 'destructive' :
                                'secondary'
                              }
                              className="text-xs"
                            >
                              {topic.sentiment}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Key Moments Timeline
                  </h4>
                  <div className="space-y-3">
                    {realTimeMetrics.keyMoments.map((moment, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {moment.time}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-sm">{moment.event}</p>
                        </div>
                        <Badge 
                          variant={
                            moment.impact === 'critical' || moment.impact === 'success' ? 'default' :
                            moment.impact === 'high' ? 'secondary' :
                            'outline'
                          }
                        >
                          {moment.impact}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Strategy Tab */}
          {activeTab === 'strategy' && (
            <div className="space-y-4">
              <Card className="border-primary">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Current Phase: {agentStrategy.phase.replace(/_/g, ' ').toUpperCase()}
                  </h4>
                  <div className="p-3 bg-primary/5 rounded-lg mb-3">
                    <p className="text-sm font-medium mb-1">Objective</p>
                    <p className="text-sm text-muted-foreground">{agentStrategy.objective}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Key Talking Points</p>
                      <div className="space-y-1">
                        {agentStrategy.talkingPoints.map((point, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-sm">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Questions to Ask</p>
                      <div className="space-y-1">
                        {agentStrategy.questionsToAsk.map((question, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <MessageSquare className="w-3 h-3 text-blue-500" />
                            <span className="text-sm">{question}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Recommended Responses</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">
                        If candidate shows high interest:
                      </p>
                      <p className="text-sm">
                        "That's wonderful to hear! Let me schedule that video call with Dr. Mitchell right away. 
                        He's excited to discuss how we can make this transition smooth for your entire family."
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-1">
                        If candidate has concerns:
                      </p>
                      <p className="text-sm">
                        "I completely understand your concerns about [specific issue]. Many of our physicians had similar 
                        questions. Would it help if I connected you with Dr. Sarah Chen who made a similar move last year?"
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
                        If candidate needs time:
                      </p>
                      <p className="text-sm">
                        "Of course, this is a big decision. I'll send you all the information we discussed. 
                        Would it be alright if I followed up next Tuesday to see if you have any questions?"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Coaching Tab */}
          {activeTab === 'coaching' && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Performance Analysis
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">Strengths</span>
                      </div>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>• Excellent personalization - referenced specific publication</li>
                        <li>• Strong objection handling on spousal concerns</li>
                        <li>• Clear next steps with specific scheduling options</li>
                        <li>• Built rapport through shared parent experience</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">Areas for Improvement</span>
                      </div>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>• Could have asked more discovery questions early</li>
                        <li>• Compensation discussion could be more consultative</li>
                        <li>• Consider asking about decision timeline earlier</li>
                      </ul>
                    </div>

                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Brain className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">Learning Insights</span>
                      </div>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>• Work-life balance resonates strongly with mid-career physicians</li>
                        <li>• Spousal career support is critical for relocations</li>
                        <li>• Evening scheduling shows respect for physician schedules</li>
                        <li>• Specific metrics build credibility quickly</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Conversation Score</h4>
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold text-primary mb-2">92/100</div>
                    <Badge variant="default" className="mb-3">Excellent Performance</Badge>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Rapport</p>
                        <p className="text-lg font-medium">95%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Discovery</p>
                        <p className="text-lg font-medium">88%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Closing</p>
                        <p className="text-lg font-medium">94%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Post-Call Summary */}
      {callState === 'ended' && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Call Summary - Successful Outcome
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Key Outcomes</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Interview scheduled for Thursday 8 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">High interest in position (85% score)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Spousal concerns addressed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Information packet requested</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Follow-up Actions</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Send comprehensive packet within 1 hour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Wednesday check-in scheduled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Text confirmation of Thursday meeting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Add school/neighborhood info to packet</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <p className="text-sm font-medium mb-1">AI Recommendation</p>
              <p className="text-sm text-muted-foreground">
                High probability of successful placement (78%). Candidate showed strong interest in work-life balance 
                and compensation package. Key to closing will be addressing family relocation comprehensively. 
                Consider introducing to other relocated physicians with families.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}