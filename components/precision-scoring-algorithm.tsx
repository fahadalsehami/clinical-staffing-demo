"use client"

import { useState } from 'react'
import { 
  Target, TrendingUp, Activity, BarChart3, 
  Zap, Award, Clock, DollarSign, MapPin,
  Building, Users, Brain, AlertCircle, Check
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'

interface ScoringMetric {
  id: string
  category: string
  metric: string
  value: number
  maxValue: number
  weight: number
  score: number
  icon: any
  status: 'excellent' | 'good' | 'fair' | 'poor'
}

interface ScoreBreakdown {
  category: string
  score: number
  maxScore: number
  metrics: ScoringMetric[]
}

const scoringMetrics: ScoringMetric[] = [
  // Clinical Fit
  { id: '1', category: 'Clinical Fit', metric: 'Specialty Match', value: 95, maxValue: 100, weight: 10, score: 9.5, icon: Target, status: 'excellent' },
  { id: '2', category: 'Clinical Fit', metric: 'Experience Level', value: 85, maxValue: 100, weight: 8, score: 6.8, icon: Award, status: 'good' },
  { id: '3', category: 'Clinical Fit', metric: 'Procedure Competency', value: 92, maxValue: 100, weight: 7, score: 6.4, icon: Activity, status: 'excellent' },
  { id: '4', category: 'Clinical Fit', metric: 'Certification Status', value: 100, maxValue: 100, weight: 9, score: 9.0, icon: Check, status: 'excellent' },
  
  // Geographic Fit
  { id: '5', category: 'Geographic', metric: 'Location Preference', value: 80, maxValue: 100, weight: 8, score: 6.4, icon: MapPin, status: 'good' },
  { id: '6', category: 'Geographic', metric: 'License Coverage', value: 75, maxValue: 100, weight: 6, score: 4.5, icon: Building, status: 'fair' },
  { id: '7', category: 'Geographic', metric: 'Relocation Willingness', value: 60, maxValue: 100, weight: 5, score: 3.0, icon: Users, status: 'fair' },
  
  // Engagement Likelihood
  { id: '8', category: 'Engagement', metric: 'Career Timing', value: 88, maxValue: 100, weight: 9, score: 7.9, icon: Clock, status: 'good' },
  { id: '9', category: 'Engagement', metric: 'Market Activity', value: 72, maxValue: 100, weight: 7, score: 5.0, icon: Activity, status: 'fair' },
  { id: '10', category: 'Engagement', metric: 'Response History', value: 85, maxValue: 100, weight: 6, score: 5.1, icon: TrendingUp, status: 'good' },
  { id: '11', category: 'Engagement', metric: 'Digital Footprint', value: 90, maxValue: 100, weight: 4, score: 3.6, icon: Brain, status: 'excellent' },
  
  // Economic Alignment
  { id: '12', category: 'Economic', metric: 'Compensation Match', value: 82, maxValue: 100, weight: 8, score: 6.6, icon: DollarSign, status: 'good' },
  { id: '13', category: 'Economic', metric: 'Benefits Priority', value: 78, maxValue: 100, weight: 5, score: 3.9, icon: Award, status: 'good' },
  { id: '14', category: 'Economic', metric: 'Market Rate Alignment', value: 95, maxValue: 100, weight: 6, score: 5.7, icon: BarChart3, status: 'excellent' },
  
  // Quality Indicators
  { id: '15', category: 'Quality', metric: 'Credential Verification', value: 100, maxValue: 100, weight: 10, score: 10.0, icon: Check, status: 'excellent' },
  { id: '16', category: 'Quality', metric: 'Reference Quality', value: 88, maxValue: 100, weight: 7, score: 6.2, icon: Users, status: 'good' },
  { id: '17', category: 'Quality', metric: 'Performance Metrics', value: 91, maxValue: 100, weight: 8, score: 7.3, icon: BarChart3, status: 'excellent' },
  { id: '18', category: 'Quality', metric: 'Risk Assessment', value: 94, maxValue: 100, weight: 9, score: 8.5, icon: AlertCircle, status: 'excellent' }
]

const calculateCategoryScores = (): ScoreBreakdown[] => {
  const categories = [...new Set(scoringMetrics.map(m => m.category))]
  
  return categories.map(category => {
    const metrics = scoringMetrics.filter(m => m.category === category)
    const totalScore = metrics.reduce((sum, m) => sum + m.score, 0)
    const maxScore = metrics.reduce((sum, m) => sum + m.weight, 0)
    
    return {
      category,
      score: totalScore,
      maxScore,
      metrics
    }
  })
}

const overallScore = Math.round(
  (scoringMetrics.reduce((sum, m) => sum + m.score, 0) / 
   scoringMetrics.reduce((sum, m) => sum + m.weight, 0)) * 100
)

export function PrecisionScoringAlgorithm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'overview' | 'detailed' | 'optimize'>('overview')
  const categoryScores = calculateCategoryScores()

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-500 bg-green-500/10'
      case 'good': return 'text-blue-500 bg-blue-500/10'
      case 'fair': return 'text-yellow-500 bg-yellow-500/10'
      case 'poor': return 'text-red-500 bg-red-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-500' }
    if (score >= 85) return { grade: 'A', color: 'text-green-500' }
    if (score >= 80) return { grade: 'B+', color: 'text-blue-500' }
    if (score >= 75) return { grade: 'B', color: 'text-blue-500' }
    if (score >= 70) return { grade: 'C+', color: 'text-yellow-500' }
    if (score >= 65) return { grade: 'C', color: 'text-yellow-500' }
    return { grade: 'D', color: 'text-red-500' }
  }

  const scoreGrade = getScoreGrade(overallScore)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Target className="w-6 h-6 mr-2 text-primary" />
            Precision Scoring Algorithm
          </h2>
          <p className="text-muted-foreground">Multi-dimensional candidate assessment with weighted scoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={activeView === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveView('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeView === 'detailed' ? 'default' : 'outline'}
            onClick={() => setActiveView('detailed')}
          >
            Detailed
          </Button>
          <Button
            variant={activeView === 'optimize' ? 'default' : 'outline'}
            onClick={() => setActiveView('optimize')}
          >
            Optimize
          </Button>
        </div>
      </div>

      {/* Overall Score Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
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
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - overallScore / 100)}`}
                    className="text-primary transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{overallScore}</span>
                  <span className={`text-xl font-bold ${scoreGrade.color}`}>{scoreGrade.grade}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Overall Match Score</h3>
                <p className="text-muted-foreground mb-3">Based on {scoringMetrics.length} weighted metrics</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="default">
                    <Zap className="w-3 h-3 mr-1" />
                    High Priority
                  </Badge>
                  <Badge variant="secondary">
                    Top 5% Match
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {categoryScores.map((category) => {
                const percentage = Math.round((category.score / category.maxScore) * 100)
                return (
                  <div key={category.category} className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">{category.category}</p>
                    <p className="text-2xl font-bold">{percentage}%</p>
                    <Progress value={percentage} className="h-2 mt-2" />
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {activeView === 'overview' && (
        <div className="grid grid-cols-2 gap-6">
          {categoryScores.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCategory(category.category)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {Math.round((category.score / category.maxScore) * 100)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {category.score.toFixed(1)} / {category.maxScore} pts
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.metrics.slice(0, 3).map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <metric.icon className="w-4 h-4 text-muted-foreground" />
                          <span>{metric.metric}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(metric.status)}
                        >
                          {metric.value}%
                        </Badge>
                      </div>
                    ))}
                    {category.metrics.length > 3 && (
                      <p className="text-xs text-muted-foreground text-center pt-2">
                        +{category.metrics.length - 3} more metrics
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {activeView === 'detailed' && (
        <div className="space-y-4">
          {categoryScores.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{category.category}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Score:</span>
                    <Badge variant="default">
                      {Math.round((category.score / category.maxScore) * 100)}%
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.metrics.map((metric) => (
                    <div key={metric.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <metric.icon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{metric.metric}</p>
                          <p className="text-xs text-muted-foreground">Weight: {metric.weight}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">{metric.value}%</p>
                          <p className="text-xs text-muted-foreground">{metric.score.toFixed(1)} pts</p>
                        </div>
                        <Badge 
                          variant="outline"
                          className={getStatusColor(metric.status)}
                        >
                          {metric.status}
                        </Badge>
                        <Progress value={metric.value} className="w-24 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeView === 'optimize' && (
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border-l-4 border-yellow-500 bg-yellow-500/5 rounded">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">Improve Location Match</p>
                  <Badge variant="outline" className="text-xs">+8 pts potential</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Consider expanding search to adjacent markets or offering relocation incentives
                </p>
              </div>
              <div className="p-3 border-l-4 border-blue-500 bg-blue-500/5 rounded">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">Enhance Market Activity Signal</p>
                  <Badge variant="outline" className="text-xs">+5 pts potential</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Recent LinkedIn activity suggests increased openness to opportunities
                </p>
              </div>
              <div className="p-3 border-l-4 border-green-500 bg-green-500/5 rounded">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">Compensation Alignment</p>
                  <Badge variant="outline" className="text-xs">+3 pts potential</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Current offer is 82% aligned - consider performance bonuses to bridge gap
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Score Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">vs. Average Candidate</span>
                  <Badge variant="default" className="bg-green-500">+24%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">vs. Top 10% Candidates</span>
                  <Badge variant="default" className="bg-blue-500">+7%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">vs. Last Successful Placement</span>
                  <Badge variant="default" className="bg-green-500">+12%</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">vs. Client Minimum</span>
                  <Badge variant="default" className="bg-green-500">+31%</Badge>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                <p className="text-sm font-medium mb-1">Placement Prediction</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Success Probability</p>
                  <p className="text-lg font-bold text-primary">87%</p>
                </div>
                <Progress value={87} className="h-2 mt-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}