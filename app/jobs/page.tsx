"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Calendar,
  Building,
  Clock,
  ChevronRight,
  Star,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { jobOpportunities } from '@/lib/data/dummy-data'
import { formatCurrency } from '@/lib/utils'

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedUrgency, setSelectedUrgency] = useState('all')

  // Add match scores to jobs
  const jobsWithScores = jobOpportunities.map(job => ({
    ...job,
    matchScore: Math.floor(Math.random() * 30) + 70
  }))

  // Filter jobs
  const filteredJobs = jobsWithScores.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.city.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecialty = selectedSpecialty === 'all' || job.specialty === selectedSpecialty
    const matchesType = selectedType === 'all' || job.type === selectedType
    const matchesUrgency = selectedUrgency === 'all' || job.urgency === selectedUrgency

    return matchesSearch && matchesSpecialty && matchesType && matchesUrgency
  })

  const specialties = ['all', ...new Set(jobOpportunities.map(j => j.specialty))]
  const types = ['all', 'permanent', 'locum', 'part_time', 'contract']
  const urgencies = ['all', 'high', 'medium', 'low']

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
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</Link>
                <Link href="/jobs" className="text-primary font-medium">Jobs</Link>
                <Link href="/profile" className="text-muted-foreground hover:text-primary">Profile</Link>
              </div>
            </div>
            <Button>Post New Job</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Job Opportunities</h1>
          <p className="text-muted-foreground">Find your perfect healthcare position with AI-powered matching</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs, facilities, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm">Specialty</Label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                  >
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>
                        {specialty === 'all' ? 'All Specialties' : specialty}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label className="text-sm">Job Type</Label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.replace('_', ' ').charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label className="text-sm">Urgency</Label>
                  <select
                    value={selectedUrgency}
                    onChange={(e) => setSelectedUrgency(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                  >
                    {urgencies.map(urgency => (
                      <option key={urgency} value={urgency}>
                        {urgency === 'all' ? 'All Urgencies' : urgency.charAt(0).toUpperCase() + urgency.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredJobs.length} of {jobOpportunities.length} opportunities
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              Sort by Match
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Building className="h-4 w-4" />
                            <span>{job.facility.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {job.urgency === 'high' && (
                            <Badge variant="destructive">Urgent</Badge>
                          )}
                          <Badge variant={job.type === 'permanent' ? 'default' : 'secondary'}>
                            {job.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{job.location.city}, {job.location.state}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{formatCurrency(job.salaryRange.min)} - {formatCurrency(job.salaryRange.max)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Start: {new Date(job.startDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.requirements.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="md:w-48 space-y-4">
                      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-0">
                        <CardContent className="p-4 text-center">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {job.matchScore}%
                          </div>
                          <p className="text-xs text-muted-foreground">Match Score</p>
                          <Progress value={job.matchScore} className="mt-2" />
                        </CardContent>
                      </Card>
                      
                      <Button className="w-full">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="w-full">
                        Save Job
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No jobs found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchTerm('')
                setSelectedSpecialty('all')
                setSelectedType('all')
                setSelectedUrgency('all')
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}