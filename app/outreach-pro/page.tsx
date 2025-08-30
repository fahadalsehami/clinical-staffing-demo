"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Brain, Filter, Database, Target, BarChart3, 
  ArrowLeft, Sparkles, Users, TrendingUp, Zap,
  Phone, Code, Menu, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ClinicalCriteriaBuilder } from '@/components/clinical-criteria-builder'
import { DataSourcesHub } from '@/components/data-sources-hub'
import { AIPersonalizationEngine } from '@/components/ai-personalization-engine'
import { PrecisionScoringAlgorithm } from '@/components/precision-scoring-algorithm'
import { AIVoiceAgentAdvanced } from '@/components/ai-voice-agent-advanced'
import { RecruitmentAgentIntegration } from '@/components/recruitment-agent-integration'
import { APIDocumentation } from '@/components/api-documentation'

const tabs = [
  { id: 'criteria', label: 'Criteria Builder', icon: Filter, description: 'Define precise clinical targeting parameters' },
  { id: 'datasources', label: 'Data Sources', icon: Database, description: '19+ integrated healthcare data sources' },
  { id: 'personalization', label: 'AI Personalization', icon: Brain, description: '100% personalized outreach with 40+ factors' },
  { id: 'scoring', label: 'Precision Scoring', icon: Target, description: 'Multi-dimensional candidate assessment' },
  { id: 'voice', label: 'Voice Agent', icon: Phone, description: 'AI-powered voice conversations with real-time intent detection' },
  { id: 'recruitment', label: 'Recruitment Hub', icon: Users, description: 'End-to-end recruitment automation and workflow' },
  { id: 'api', label: 'API Docs', icon: Code, description: 'Complete API documentation and integration guides' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Campaign performance and insights' }
]

const analyticsData = {
  campaigns: [
    { name: 'ER Physicians - West Coast', sent: 450, opened: 387, responded: 124, meetings: 42, placements: 8 },
    { name: 'Critical Care - Nationwide', sent: 320, opened: 278, responded: 89, meetings: 28, placements: 5 },
    { name: 'Trauma Surgeons - Level 1', sent: 180, opened: 156, responded: 67, meetings: 19, placements: 3 }
  ],
  metrics: {
    totalOutreach: 2847,
    responseRate: 34.2,
    meetingRate: 12.8,
    placementRate: 4.6,
    avgTimeToResponse: '18 hours',
    avgTimeToPlacement: '21 days',
    roi: '14:1',
    costPerPlacement: 1280
  },
  insights: [
    { type: 'success', message: 'LinkedIn InMail 3.2x more effective than email for senior physicians' },
    { type: 'warning', message: 'Response rates drop 40% after 3rd follow-up' },
    { type: 'info', message: 'Tuesday 9-11 AM shows highest engagement (42% open rate)' },
    { type: 'success', message: 'Personalized subject lines increase open rates by 67%' }
  ]
}

export default function OutreachProPage() {
  const [activeTab, setActiveTab] = useState('criteria')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950 dark:via-background dark:to-pink-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-background/80 border-b">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="px-2 md:px-4">
                  <ArrowLeft className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Back</span>
                </Button>
              </Link>
              <div className="relative">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-base md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Outreach Pro
                </span>
                <Badge variant="secondary" className="hidden md:inline-flex ml-2 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Advanced AI
                </Badge>
              </div>
            </div>
            
            {/* Desktop Stats */}
            <div className="hidden lg:flex items-center space-x-4">
              <Badge variant="outline" className="gap-1">
                <Users className="h-3 w-3" />
                2.4M Profiles
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Database className="h-3 w-3" />
                19 Sources
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Zap className="h-3 w-3" />
                GPT-4 Powered
              </Badge>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Stats */}
          <div className="flex md:hidden items-center space-x-2 mt-3 pb-2">
            <Badge variant="outline" className="gap-1 text-xs">
              <Users className="h-3 w-3" />
              2.4M
            </Badge>
            <Badge variant="outline" className="gap-1 text-xs">
              <Database className="h-3 w-3" />
              19 Sources
            </Badge>
            <Badge variant="outline" className="gap-1 text-xs">
              <Zap className="h-3 w-3" />
              GPT-4
            </Badge>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-4 md:py-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 md:mb-3">
            AI Healthcare Recruitment Platform
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-3xl mx-auto px-2">
            Complete suite with voice agents, data enrichment, and precision targeting for healthcare staffing
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8"
        >
          <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardContent className="p-3 md:p-6 text-center">
              <div className="text-xl md:text-3xl font-bold text-purple-600">87%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Automation</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardContent className="p-3 md:p-6 text-center">
              <div className="text-xl md:text-3xl font-bold text-purple-600">92%</div>
              <div className="text-xs md:text-sm text-muted-foreground">Match Rate</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardContent className="p-3 md:p-6 text-center">
              <div className="text-xl md:text-3xl font-bold text-purple-600">18d</div>
              <div className="text-xs md:text-sm text-muted-foreground">Time to Fill</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardContent className="p-3 md:p-6 text-center">
              <div className="text-xl md:text-3xl font-bold text-purple-600">14:1</div>
              <div className="text-xs md:text-sm text-muted-foreground">ROI</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tab Navigation - Desktop */}
        <div className="hidden md:block mb-6">
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5 mx-auto mb-1" />
                <div className="text-xs font-medium">{tab.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Navigation - Mobile Dropdown */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full p-3 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                {tabs.find(t => t.id === activeTab)?.icon && (
                  <div className="text-purple-600">
                    {(() => {
                      const Icon = tabs.find(t => t.id === activeTab)?.icon
                      return Icon ? <Icon className="h-5 w-5" /> : null
                    })()}
                  </div>
                )}
                <span className="font-medium">{tabs.find(t => t.id === activeTab)?.label}</span>
              </div>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 overflow-hidden"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full p-3 flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      activeTab === tab.id ? 'bg-purple-50 dark:bg-purple-950/20 text-purple-600' : ''
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{tab.label}</div>
                      <div className="text-xs text-muted-foreground">{tab.description}</div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6"
        >
          {activeTab === 'criteria' && <ClinicalCriteriaBuilder />}
          {activeTab === 'datasources' && <DataSourcesHub />}
          {activeTab === 'personalization' && <AIPersonalizationEngine />}
          {activeTab === 'scoring' && <PrecisionScoringAlgorithm />}
          {activeTab === 'voice' && <AIVoiceAgentAdvanced />}
          {activeTab === 'recruitment' && <RecruitmentAgentIntegration />}
          {activeTab === 'api' && <APIDocumentation />}
          
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4">Campaign Performance</h3>
                <div className="space-y-3 md:space-y-4">
                  {analyticsData.campaigns.map((campaign, idx) => (
                    <Card key={idx} className="border-purple-100 dark:border-purple-900">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <h4 className="font-medium text-sm md:text-base mb-2 md:mb-0">{campaign.name}</h4>
                          <Badge variant="outline" className="w-fit text-xs">
                            {campaign.placements} Placements
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 text-xs md:text-sm">
                          <div>
                            <div className="text-muted-foreground">Sent</div>
                            <div className="font-semibold">{campaign.sent}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Opened</div>
                            <div className="font-semibold">{campaign.opened}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Responded</div>
                            <div className="font-semibold">{campaign.responded}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Meetings</div>
                            <div className="font-semibold">{campaign.meetings}</div>
                          </div>
                          <div className="col-span-2 md:col-span-1">
                            <div className="text-muted-foreground">Conversion</div>
                            <div className="font-semibold text-green-600">
                              {((campaign.placements / campaign.sent) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4">Key Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <Card className="border-purple-100 dark:border-purple-900">
                    <CardContent className="p-3 md:p-4">
                      <div className="text-xs md:text-sm text-muted-foreground">Response Rate</div>
                      <div className="text-lg md:text-2xl font-bold text-purple-600">
                        {analyticsData.metrics.responseRate}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-purple-100 dark:border-purple-900">
                    <CardContent className="p-3 md:p-4">
                      <div className="text-xs md:text-sm text-muted-foreground">Meeting Rate</div>
                      <div className="text-lg md:text-2xl font-bold text-purple-600">
                        {analyticsData.metrics.meetingRate}%
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-purple-100 dark:border-purple-900">
                    <CardContent className="p-3 md:p-4">
                      <div className="text-xs md:text-sm text-muted-foreground">Avg Time to Fill</div>
                      <div className="text-lg md:text-2xl font-bold text-purple-600">
                        {analyticsData.metrics.avgTimeToPlacement}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-purple-100 dark:border-purple-900">
                    <CardContent className="p-3 md:p-4">
                      <div className="text-xs md:text-sm text-muted-foreground">ROI</div>
                      <div className="text-lg md:text-2xl font-bold text-purple-600">
                        {analyticsData.metrics.roi}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-4">AI Insights</h3>
                <div className="space-y-2 md:space-y-3">
                  {analyticsData.insights.map((insight, idx) => (
                    <div
                      key={idx}
                      className={`p-3 md:p-4 rounded-lg border text-xs md:text-sm ${
                        insight.type === 'success' 
                          ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                          : insight.type === 'warning'
                          ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
                          : 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
                      }`}
                    >
                      {insight.message}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Bottom Actions - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 md:mt-8 flex flex-col md:flex-row gap-3 md:gap-4 justify-center"
        >
          <Button 
            size="lg" 
            className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm md:text-base"
          >
            <Phone className="mr-2 h-4 w-4" />
            Start Voice Campaign
          </Button>
          <Button size="lg" variant="outline" className="w-full md:w-auto text-sm md:text-base">
            <TrendingUp className="mr-2 h-4 w-4" />
            View Full Analytics
          </Button>
        </motion.div>
      </div>
    </div>
  )
}