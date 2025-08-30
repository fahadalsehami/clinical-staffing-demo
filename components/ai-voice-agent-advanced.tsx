"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  Phone, Mic, MicOff, PhoneOff, Play, Pause, 
  Volume2, VolumeX, Activity, Brain, MessageSquare,
  CheckCircle, AlertCircle, XCircle, Clock,
  TrendingUp, User, Calendar, DollarSign,
  Briefcase, MapPin, Heart, Shield, Sparkles,
  BarChart3, FileText, Send, RefreshCw, ChevronDown, ChevronUp
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
    sentiment: 'positive',
    intent: 'introduction',
    keyPoints: ['Work-life balance', 'Cedar Sinai', 'Emergency medicine']
  },
  {
    id: '2',
    speaker: 'candidate',
    text: "Cedar Sinai? That's actually interesting. I've heard good things about their ED. But honestly, I'm pretty happy where I am right now. What makes this opportunity different?",
    timestamp: '0:18',
    sentiment: 'neutral',
    intent: 'curiosity_with_hesitation',
    keyPoints: ['Interest in Cedar Sinai', 'Currently satisfied', 'Open to hearing more']
  },
  {
    id: '3',
    speaker: 'agent',
    text: "I completely understand, and it's great that you're happy in your current role. What caught my attention for you specifically was their new flexible scheduling model - they're offering 7-on/7-off blocks with no overnight requirements after 5 years. Plus, they've just opened a state-of-the-art trauma center. What aspects of your current role do you enjoy most?",
    timestamp: '0:35',
    sentiment: 'positive',
    intent: 'discovery',
    keyPoints: ['Flexible scheduling', 'No overnight after 5 years', 'New trauma center']
  },
  {
    id: '4',
    speaker: 'candidate',
    text: "The scheduling does sound appealing. Right now I'm doing 12-hour shifts with irregular patterns. The trauma center interests me too - I'm actually pursuing additional trauma certification. What's the patient volume like?",
    timestamp: '0:58',
    sentiment: 'positive',
    intent: 'engaged_questioning',
    keyPoints: ['Schedule pain point', 'Trauma interest', 'Certification pursuit']
  },
  {
    id: '5',
    speaker: 'agent',
    text: "They're seeing about 280-300 patients daily with a 30% trauma case mix - perfect for someone building trauma expertise. They also offer full funding for additional certifications and have partnerships with UCLA for research opportunities. You mentioned irregular patterns - how is that affecting your work-life balance currently?",
    timestamp: '1:20',
    sentiment: 'positive',
    intent: 'value_building',
    keyPoints: ['High volume', 'Certification funding', 'Research opportunities']
  },
  {
    id: '6',
    speaker: 'candidate',
    text: "Honestly, it's been tough. My wife and I have two young kids, and the unpredictable schedule makes planning anything impossible. The certification funding is huge - I'm paying out of pocket right now. What about compensation? I'm at about $385K base currently.",
    timestamp: '1:45',
    sentiment: 'neutral',
    intent: 'personal_disclosure',
    keyPoints: ['Family impact', 'Financial concern', 'Current compensation']
  },
  {
    id: '7',
    speaker: 'agent',
    text: "I hear you on the family challenges - that's exactly why Cedar Sinai redesigned their scheduling. For compensation, they're offering $420-450K base, plus productivity bonuses averaging another $60K. They also provide on-site childcare and backup care services. Would having predictable 7-day blocks help with your family planning?",
    timestamp: '2:10',
    sentiment: 'positive',
    intent: 'addressing_pain_points',
    keyPoints: ['Higher compensation', 'Childcare benefits', 'Predictable schedule']
  },
  {
    id: '8',
    speaker: 'candidate',
    text: "Those numbers are compelling, and the childcare benefit is something we don't have. The 7-on/7-off would be life-changing honestly. But I'm concerned about relocating - we just bought our house last year. How flexible are they on start dates?",
    timestamp: '2:35',
    sentiment: 'positive',
    intent: 'interested_but_concerned',
    keyPoints: ['Compensation interest', 'Relocation concern', 'Timing flexibility']
  },
  {
    id: '9',
    speaker: 'agent',
    text: "They're very flexible on timing - anywhere from 3-6 months out works. They also offer a generous relocation package including home sale assistance and temporary housing. Many physicians actually commute from your area - it's about 35 minutes. Would you be open to a video call with their ED director next week to explore this further?",
    timestamp: '3:00',
    sentiment: 'positive',
    intent: 'moving_to_close',
    keyPoints: ['Flexible start', 'Relocation support', 'Commute option']
  },
  {
    id: '10',
    speaker: 'candidate',
    text: "You know what, yes. This sounds worth exploring. The combination of schedule, compensation, and especially that trauma center is really attractive. Can we do something Tuesday or Wednesday afternoon?",
    timestamp: '3:22',
    sentiment: 'positive',
    intent: 'commitment',
    keyPoints: ['Agreement to meet', 'Tuesday/Wednesday preference', 'Multiple value props resonated']
  },
  {
    id: '11',
    speaker: 'agent',
    text: "Perfect! I have slots available Tuesday at 2 PM or Wednesday at 3:30 PM. Which works better for you? I'll send you a calendar invite with a Zoom link, plus I'll include a detailed position overview and some videos of the new trauma facility.",
    timestamp: '3:40',
    sentiment: 'positive',
    intent: 'scheduling',
    keyPoints: ['Specific times offered', 'Follow-up materials promised']
  },
  {
    id: '12',
    speaker: 'candidate',
    text: "Wednesday at 3:30 works perfectly. Send it to my personal email - david.rodriguez@gmail.com. And Sarah, I appreciate you taking the time to understand what I'm looking for. This is much more relevant than most recruiting calls I get.",
    timestamp: '3:58',
    sentiment: 'positive',
    intent: 'confirmation_and_praise',
    keyPoints: ['Meeting confirmed', 'Email provided', 'Positive feedback']
  },
  {
    id: '13',
    speaker: 'agent',
    text: "Thank you Dr. Rodriguez, that means a lot! I'll send that invite within the hour. Before our Wednesday call, feel free to text me any questions at 555-0123. I'm also sending you a brief video from Dr. Kim, the ED director, sharing his vision for the department. Looking forward to connecting you both!",
    timestamp: '4:20',
    sentiment: 'positive',
    intent: 'follow_up_commitment',
    keyPoints: ['Immediate follow-up', 'Additional touchpoint', 'Personal video']
  },
  {
    id: '14',
    speaker: 'candidate',
    text: "Sounds great, Sarah. I'll review everything before Wednesday. Have a great rest of your day!",
    timestamp: '4:35',
    sentiment: 'positive',
    intent: 'positive_close',
    keyPoints: ['Commitment to review', 'Friendly closing']
  },
  {
    id: '15',
    speaker: 'agent',
    text: "You too, Dr. Rodriguez! I'm excited about this potential fit. Talk to you Wednesday!",
    timestamp: '4:42',
    sentiment: 'positive',
    intent: 'enthusiastic_close',
    keyPoints: ['Enthusiasm maintained', 'Next step confirmed']
  }
]

const agentStrategies: AgentStrategy[] = [
  {
    phase: 'intro',
    objective: 'Build rapport and earn permission to continue',
    talkingPoints: [
      'Mention specific hospital/practice name',
      'Reference work-life balance immediately',
      'Ask for just 2 minutes'
    ],
    questionsToAsk: [
      'Do you have 2 minutes?',
      'Is now a bad time?'
    ]
  },
  {
    phase: 'discovery',
    objective: 'Uncover pain points and motivations',
    talkingPoints: [
      'Acknowledge current satisfaction',
      'Highlight unique differentiators',
      'Show genuine interest in their situation'
    ],
    questionsToAsk: [
      'What aspects of your current role do you enjoy most?',
      'How is your current schedule affecting work-life balance?',
      'What would make you consider a change?'
    ]
  },
  {
    phase: 'presentation',
    objective: 'Present value proposition aligned with their needs',
    talkingPoints: [
      'Specific benefits matching their pain points',
      'Concrete numbers and facts',
      'Success stories of similar physicians'
    ],
    questionsToAsk: [
      'How does this compare to your current situation?',
      'What questions do you have about this?'
    ]
  },
  {
    phase: 'objection_handling',
    objective: 'Address concerns without being pushy',
    talkingPoints: [
      'Acknowledge the validity of concerns',
      'Provide specific solutions',
      'Offer flexibility and options'
    ],
    questionsToAsk: [
      'What would need to happen for this to work?',
      'Are there other concerns I can address?'
    ]
  },
  {
    phase: 'closing',
    objective: 'Secure next step commitment',
    talkingPoints: [
      'Propose specific next action',
      'Offer multiple time options',
      'Promise valuable follow-up materials'
    ],
    questionsToAsk: [
      'Would you be open to learning more?',
      'What day/time works best for you?'
    ]
  }
]

export function AIVoiceAgentAdvanced() {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [callDuration, setCallDuration] = useState(0)
  const [currentStrategy, setCurrentStrategy] = useState(agentStrategies[0])
  const [expandedSections, setExpandedSections] = useState({
    conversation: true,
    metrics: true,
    strategy: false,
    coaching: false
  })
  const intervalRef = useRef<NodeJS.Timeout>()
  const scrollRef = useRef<HTMLDivElement>(null)

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  useEffect(() => {
    if (isCallActive && !isPaused && currentTurnIndex < conversationScript.length) {
      intervalRef.current = setTimeout(() => {
        setCurrentTurnIndex(prev => prev + 1)
        
        // Update strategy based on conversation phase
        if (currentTurnIndex === 2) setCurrentStrategy(agentStrategies[1])
        if (currentTurnIndex === 4) setCurrentStrategy(agentStrategies[2])
        if (currentTurnIndex === 7) setCurrentStrategy(agentStrategies[3])
        if (currentTurnIndex === 9) setCurrentStrategy(agentStrategies[4])
      }, 3000)
    }
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [isCallActive, isPaused, currentTurnIndex])

  useEffect(() => {
    if (isCallActive && !isPaused) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isCallActive, isPaused])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [currentTurnIndex])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const calculateMetrics = (): CallMetrics => {
    const shown = conversationScript.slice(0, currentTurnIndex + 1)
    const agentTurns = shown.filter(t => t.speaker === 'agent').length
    const candidateTurns = shown.filter(t => t.speaker === 'candidate').length
    
    return {
      duration: formatDuration(callDuration),
      talkTime: {
        agent: agentTurns > 0 ? Math.round((agentTurns / (agentTurns + candidateTurns)) * 100) : 0,
        candidate: candidateTurns > 0 ? Math.round((candidateTurns / (agentTurns + candidateTurns)) * 100) : 0
      },
      sentiment: {
        positive: shown.filter(t => t.sentiment === 'positive').length,
        neutral: shown.filter(t => t.sentiment === 'neutral').length,
        negative: shown.filter(t => t.sentiment === 'negative').length
      },
      engagementScore: currentTurnIndex > 5 ? 85 : 65,
      objections: ['Relocation concern', 'Current satisfaction', 'Timing flexibility'],
      interests: ['Trauma center', 'Work-life balance', 'Higher compensation', 'Certification funding'],
      nextSteps: ['Wednesday 3:30 PM video call', 'Send position overview', 'Share facility videos']
    }
  }

  const metrics = calculateMetrics()

  return (
    <div className="space-y-4">
      {/* Control Panel - Mobile Optimized */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-3 md:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
              <Phone className="h-5 w-5 text-purple-600" />
              AI Voice Agent Demo
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs md:text-sm">
                <Activity className="h-3 w-3 mr-1" />
                {isCallActive ? 'Call Active' : 'Ready'}
              </Badge>
              <Badge variant="outline" className="text-xs md:text-sm">
                <Clock className="h-3 w-3 mr-1" />
                {formatDuration(callDuration)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {!isCallActive ? (
              <Button 
                onClick={() => {
                  setIsCallActive(true)
                  setCurrentTurnIndex(0)
                  setCallDuration(0)
                }}
                className="bg-green-600 hover:bg-green-700 text-sm md:text-base"
              >
                <Phone className="mr-2 h-4 w-4" />
                Start Call
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => setIsPaused(!isPaused)}
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  {isPaused ? <Play className="mr-1 h-3 w-3 md:h-4 md:w-4" /> : <Pause className="mr-1 h-3 w-3 md:h-4 md:w-4" />}
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  {isMuted ? <MicOff className="mr-1 h-3 w-3 md:h-4 md:w-4" /> : <Mic className="mr-1 h-3 w-3 md:h-4 md:w-4" />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </Button>
                <Button
                  onClick={() => {
                    setIsCallActive(false)
                    setIsPaused(false)
                    setCurrentTurnIndex(0)
                    setCallDuration(0)
                  }}
                  variant="destructive"
                  size="sm"
                  className="text-xs md:text-sm"
                >
                  <PhoneOff className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                  End Call
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Conversation Transcript - Mobile Optimized */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-3 md:pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                Live Conversation
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('conversation')}
                className="md:hidden"
              >
                {expandedSections.conversation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </CardHeader>
          {(expandedSections.conversation || window.innerWidth >= 768) && (
            <CardContent>
              <div 
                ref={scrollRef}
                className="h-[300px] md:h-[400px] overflow-y-auto space-y-3 pr-2"
              >
                <AnimatePresence>
                  {conversationScript.slice(0, currentTurnIndex + 1).map((turn) => (
                    <motion.div
                      key={turn.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${turn.speaker === 'agent' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[85%] md:max-w-[80%] ${
                        turn.speaker === 'agent' 
                          ? 'bg-purple-100 dark:bg-purple-900/30' 
                          : 'bg-blue-100 dark:bg-blue-900/30'
                      } rounded-lg p-3`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {turn.speaker === 'agent' ? '🤖 Agent' : '👨‍⚕️ Candidate'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{turn.timestamp}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              turn.sentiment === 'positive' ? 'text-green-600' :
                              turn.sentiment === 'negative' ? 'text-red-600' :
                              'text-yellow-600'
                            }`}
                          >
                            {turn.sentiment === 'positive' ? '😊' :
                             turn.sentiment === 'negative' ? '😟' : '😐'}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm mb-2">{turn.text}</p>
                        {turn.intent && (
                          <Badge variant="secondary" className="text-xs">
                            Intent: {turn.intent}
                          </Badge>
                        )}
                        {turn.keyPoints && turn.keyPoints.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {turn.keyPoints.map((point, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {point}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isCallActive && currentTurnIndex < conversationScript.length - 1 && (
                  <div className="flex justify-center">
                    <Badge variant="outline" className="animate-pulse">
                      <Activity className="h-3 w-3 mr-1" />
                      AI Processing...
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        {/* Real-time Metrics - Mobile Optimized */}
        <div className="space-y-4">
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3 md:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                  Call Analytics
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection('metrics')}
                  className="md:hidden"
                >
                  {expandedSections.metrics ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            {(expandedSections.metrics || window.innerWidth >= 768) && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Talk Time Ratio</p>
                    <div className="flex items-center gap-2">
                      <Progress value={metrics.talkTime.agent} className="h-2" />
                      <span className="text-xs font-medium">{metrics.talkTime.agent}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                    <div className="flex items-center gap-2">
                      <Progress value={metrics.engagementScore} className="h-2" />
                      <span className="text-xs font-medium">{metrics.engagementScore}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Sentiment Breakdown</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs bg-green-50 dark:bg-green-950/20">
                      😊 {metrics.sentiment.positive}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-yellow-50 dark:bg-yellow-950/20">
                      😐 {metrics.sentiment.neutral}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-red-50 dark:bg-red-950/20">
                      😟 {metrics.sentiment.negative}
                    </Badge>
                  </div>
                </div>

                {currentTurnIndex > 3 && (
                  <>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Key Interests Detected</p>
                      <div className="flex flex-wrap gap-1">
                        {metrics.interests.slice(0, 3).map((interest, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            <Heart className="h-3 w-3 mr-1" />
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Objections Raised</p>
                      <div className="flex flex-wrap gap-1">
                        {metrics.objections.slice(0, 2).map((objection, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {objection}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            )}
          </Card>

          {/* Agent Strategy - Mobile Optimized */}
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-3 md:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Brain className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                  AI Strategy
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSection('strategy')}
                  className="md:hidden"
                >
                  {expandedSections.strategy ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            {(expandedSections.strategy || window.innerWidth >= 768) && (
              <CardContent className="space-y-3">
                <div>
                  <Badge className="mb-2 text-xs">{currentStrategy.phase.replace('_', ' ').toUpperCase()}</Badge>
                  <p className="text-xs md:text-sm font-medium mb-1">Current Objective:</p>
                  <p className="text-xs text-muted-foreground">{currentStrategy.objective}</p>
                </div>
                
                <div>
                  <p className="text-xs md:text-sm font-medium mb-2">Talking Points:</p>
                  <ul className="space-y-1">
                    {currentStrategy.talkingPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Conversation Coaching - Mobile Optimized */}
          {currentTurnIndex > 5 && (
            <Card className="border-purple-200 dark:border-purple-800">
              <CardHeader className="pb-3 md:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                    AI Coaching
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection('coaching')}
                    className="md:hidden"
                  >
                    {expandedSections.coaching ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              {(expandedSections.coaching || window.innerWidth >= 768) && (
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">✅ What Worked Well</p>
                    <ul className="text-xs space-y-1">
                      <li>• Personalized opening with specific hospital name</li>
                      <li>• Discovered family pain point effectively</li>
                      <li>• Matched benefits to stated needs</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <p className="text-xs font-medium text-yellow-700 dark:text-yellow-300 mb-1">💡 Suggestions</p>
                    <ul className="text-xs space-y-1">
                      <li>• Could probe deeper on research interests</li>
                      <li>• Mention peer connections earlier</li>
                      <li>• Prepare relocation testimonials</li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div>
                      <p className="text-xs font-medium">Overall Performance</p>
                      <p className="text-lg md:text-xl font-bold text-purple-600">A+</p>
                    </div>
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
                  </div>
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* Next Steps - Mobile Optimized */}
      {currentTurnIndex === conversationScript.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Call Successful - Next Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {metrics.nextSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs md:text-sm font-bold text-green-600">{idx + 1}</span>
                    </div>
                    <span className="text-xs md:text-sm">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Button className="bg-green-600 hover:bg-green-700 text-sm">
                  <Send className="mr-2 h-4 w-4" />
                  Send Follow-up Email
                </Button>
                <Button variant="outline" className="text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="text-sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}