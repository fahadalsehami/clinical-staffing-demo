"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowUp,
  ArrowDown,
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Activity,
  FileText,
  Calendar,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { dashboardMetrics, professionals, jobOpportunities, emailPresentations } from '@/lib/data/dummy-data'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(dashboardMetrics)
  const recentPlacements = professionals.slice(0, 5)
  const urgentJobs = jobOpportunities.filter(j => j.urgency === 'high').slice(0, 3)
  const recentActivity = [
    { type: 'placement', message: 'Dr. Sarah Johnson placed at Cedar Ridge Hospital', time: '2 hours ago' },
    { type: 'application', message: 'New application from Dr. Michael Chen', time: '3 hours ago' },
    { type: 'verification', message: 'Credentials verified for 3 candidates', time: '5 hours ago' },
    { type: 'presentation', message: 'Email presentation sent to Mountain View Clinic', time: '1 day ago' },
    { type: 'response', message: 'Client accepted candidate for Cardiology position', time: '1 day ago' }
  ]

  const chartData = [
    { name: 'Jan', placements: 12, revenue: 145000 },
    { name: 'Feb', placements: 15, revenue: 178000 },
    { name: 'Mar', placements: 18, revenue: 210000 },
    { name: 'Apr', placements: 22, revenue: 265000 },
    { name: 'May', placements: 20, revenue: 242000 },
    { name: 'Jun', placements: 25, revenue: 298000 }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg" />
                <span className="text-xl font-bold">Clinical Staffing AI</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard" className="text-primary font-medium">Dashboard</Link>
                <Link href="/profile" className="text-muted-foreground hover:text-primary">Profile</Link>
                <Link href="/jobs" className="text-muted-foreground hover:text-primary">Jobs</Link>
                <Link href="/presentations" className="text-muted-foreground hover:text-primary">Presentations</Link>
                <Link href="/client" className="text-muted-foreground hover:text-primary">Client Portal</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">Settings</Button>
              <Button size="sm">New Placement</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-muted-foreground">Track your healthcare staffing metrics and performance</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Candidates',
              value: metrics.totalCandidates,
              change: '+12%',
              icon: Users,
              trend: 'up'
            },
            {
              title: 'Active Placements',
              value: metrics.activePlacements,
              change: '+8%',
              icon: Briefcase,
              trend: 'up'
            },
            {
              title: 'Open Positions',
              value: metrics.openPositions,
              change: '-5%',
              icon: FileText,
              trend: 'down'
            },
            {
              title: 'Revenue This Month',
              value: formatCurrency(metrics.revenueThisMonth),
              change: `+${(metrics.revenueGrowth * 100).toFixed(0)}%`,
              icon: DollarSign,
              trend: 'up'
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    {metric.trend === 'up' ? (
                      <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                      {metric.change}
                    </span>
                    <span className="ml-1">from last month</span>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Performance Indicators */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Match Score
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{metrics.averageMatchScore}%</div>
              <Progress value={metrics.averageMatchScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">Average candidate-job match</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Placement Rate
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{(metrics.placementRate * 100).toFixed(0)}%</div>
              <Progress value={metrics.placementRate * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">Success rate this quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Time to Fill
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{metrics.averageTimeToFill} days</div>
              <Progress value={(30 - metrics.averageTimeToFill) / 30 * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">Average position fill time</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Urgent Jobs */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Urgent Positions</CardTitle>
              <CardDescription>High priority openings requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {urgentJobs.map((job) => (
                <div key={job.id} className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{job.title}</p>
                    <p className="text-xs text-muted-foreground">{job.facility.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(job.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
              <Link href="/jobs">
                <Button variant="outline" className="w-full" size="sm">
                  View All Jobs
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and actions in your staffing pipeline</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Revenue & Placements Trend</CardTitle>
            <CardDescription>Monthly performance over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive chart visualization</p>
                <p className="text-sm text-muted-foreground">Revenue and placement trends</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}