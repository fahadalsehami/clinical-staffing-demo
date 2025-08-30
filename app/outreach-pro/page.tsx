"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Brain, Filter, Database, Target, BarChart3, 
  ArrowLeft, Sparkles, Users, TrendingUp, Zap,
  Phone, Code
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-background dark:to-purple-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/outreach-advanced">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Outreach Hunter Pro
                </span>
                <Badge variant="secondary" className="ml-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Advanced AI Suite
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Advanced Clinical Outreach Intelligence Platform
          </h1>
          <p className="text-lg text-muted-foreground">
            Precision-targeted healthcare talent acquisition with AI-driven personalization
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-shrink-0"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              )
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {tabs.find(t => t.id === activeTab)?.description}
          </p>
        </div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
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
              {/* Summary Cards */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{analyticsData.metrics.totalOutreach}</div>
                    <p className="text-sm text-muted-foreground">Total Outreach</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">+23% this month</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{analyticsData.metrics.responseRate}%</div>
                    <p className="text-sm text-muted-foreground">Response Rate</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">+8.2% vs average</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">{analyticsData.metrics.roi}</div>
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">Industry leading</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold">${analyticsData.metrics.costPerPlacement}</div>
                    <p className="text-sm text-muted-foreground">Cost per Placement</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">-42% vs traditional</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Performance */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Campaign Performance</h3>
                  <div className="space-y-4">
                    {analyticsData.campaigns.map((campaign) => (
                      <div key={campaign.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{campaign.name}</span>
                          <Badge variant="outline">
                            {((campaign.placements / campaign.sent) * 100).toFixed(1)}% conversion
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Sent</span>
                              <span>{campaign.sent}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: '100%' }} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Opened</span>
                              <span>{campaign.opened}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-green-500" style={{ width: `${(campaign.opened / campaign.sent) * 100}%` }} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Responded</span>
                              <span>{campaign.responded}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-500" style={{ width: `${(campaign.responded / campaign.sent) * 100}%` }} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-muted-foreground">Meetings</span>
                              <span>{campaign.meetings}</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500" style={{ width: `${(campaign.meetings / campaign.sent) * 100}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Insights */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" />
                    AI-Generated Insights
                  </h3>
                  <div className="space-y-3">
                    {analyticsData.insights.map((insight, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg flex items-start space-x-3 ${
                          insight.type === 'success' ? 'bg-green-50 dark:bg-green-950/20' :
                          insight.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-950/20' :
                          'bg-blue-50 dark:bg-blue-950/20'
                        }`}
                      >
                        <Badge 
                          variant={
                            insight.type === 'success' ? 'default' :
                            insight.type === 'warning' ? 'secondary' :
                            'outline'
                          }
                          className="mt-0.5"
                        >
                          {insight.type}
                        </Badge>
                        <p className="text-sm">{insight.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}