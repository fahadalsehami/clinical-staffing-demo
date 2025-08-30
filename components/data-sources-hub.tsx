"use client"

import { useState } from 'react'
import { 
  Database, Shield, Activity, Check, X, AlertCircle, 
  RefreshCw, Settings, Download, Upload, Zap, Globe,
  Users, Building, FileText, Link2, Cloud, Lock
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'

interface DataSource {
  id: string
  name: string
  category: string
  status: 'connected' | 'disconnected' | 'syncing' | 'error'
  records: number
  lastSync: string
  accuracy: number
  apiType: 'REST' | 'GraphQL' | 'SOAP' | 'Webhook' | 'File'
  syncFrequency: string
  icon: any
  dataPoints: string[]
  compliance: string[]
}

const dataSources: DataSource[] = [
  {
    id: 'npi',
    name: 'NPI Registry',
    category: 'Government',
    status: 'connected',
    records: 5234892,
    lastSync: '2 mins ago',
    accuracy: 100,
    apiType: 'REST',
    syncFrequency: 'Real-time',
    icon: Shield,
    dataPoints: ['NPI Number', 'License Status', 'Specialties', 'Practice Locations'],
    compliance: ['HIPAA', 'CMS']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Sales Navigator',
    category: 'Social',
    status: 'connected',
    records: 12456789,
    lastSync: '5 mins ago',
    accuracy: 98,
    apiType: 'GraphQL',
    syncFrequency: 'Every 15 mins',
    icon: Users,
    dataPoints: ['Work History', 'Education', 'Skills', 'Connections'],
    compliance: ['GDPR', 'CCPA']
  },
  {
    id: 'epic',
    name: 'Epic EHR',
    category: 'Healthcare',
    status: 'syncing',
    records: 250000000,
    lastSync: '1 hour ago',
    accuracy: 95,
    apiType: 'REST',
    syncFrequency: 'Hourly',
    icon: Activity,
    dataPoints: ['Clinical Experience', 'Patient Volume', 'Procedures', 'Outcomes'],
    compliance: ['HIPAA', 'HL7']
  },
  {
    id: 'doximity',
    name: 'Doximity',
    category: 'Professional',
    status: 'connected',
    records: 2100000,
    lastSync: '10 mins ago',
    accuracy: 96,
    apiType: 'REST',
    syncFrequency: 'Every 30 mins',
    icon: Building,
    dataPoints: ['Peer Network', 'Publications', 'Clinical Interests', 'Affiliations'],
    compliance: ['HIPAA']
  },
  {
    id: 'cms',
    name: 'CMS PECOS',
    category: 'Government',
    status: 'connected',
    records: 1800000,
    lastSync: '30 mins ago',
    accuracy: 100,
    apiType: 'SOAP',
    syncFrequency: 'Daily',
    icon: FileText,
    dataPoints: ['Medicare Enrollment', 'Billing Records', 'Sanctions', 'Quality Scores'],
    compliance: ['CMS', 'HIPAA']
  },
  {
    id: 'healthgrades',
    name: 'Healthgrades',
    category: 'Public',
    status: 'connected',
    records: 1200000,
    lastSync: '15 mins ago',
    accuracy: 92,
    apiType: 'REST',
    syncFrequency: 'Every 2 hours',
    icon: Globe,
    dataPoints: ['Patient Reviews', 'Ratings', 'Procedures', 'Insurance Accepted'],
    compliance: ['CCPA']
  },
  {
    id: 'dea',
    name: 'DEA Registration',
    category: 'Government',
    status: 'connected',
    records: 1900000,
    lastSync: '1 hour ago',
    accuracy: 100,
    apiType: 'REST',
    syncFrequency: 'Daily',
    icon: Lock,
    dataPoints: ['DEA Number', 'Prescribing Authority', 'Schedule Classes', 'Expiration'],
    compliance: ['DEA', 'HIPAA']
  },
  {
    id: 'facebook',
    name: 'Facebook Graph API',
    category: 'Social',
    status: 'error',
    records: 8900000,
    lastSync: '2 days ago',
    accuracy: 85,
    apiType: 'GraphQL',
    syncFrequency: 'On-demand',
    icon: Users,
    dataPoints: ['Personal Interests', 'Location', 'Life Events', 'Groups'],
    compliance: ['GDPR', 'CCPA']
  },
  {
    id: 'salesforce',
    name: 'Salesforce Health Cloud',
    category: 'CRM',
    status: 'connected',
    records: 450000,
    lastSync: '20 mins ago',
    accuracy: 99,
    apiType: 'REST',
    syncFrequency: 'Real-time',
    icon: Cloud,
    dataPoints: ['Contact History', 'Engagement Score', 'Pipeline Status', 'Notes'],
    compliance: ['HIPAA', 'SOC2']
  },
  {
    id: 'indeed',
    name: 'Indeed Resume Database',
    category: 'Employment',
    status: 'connected',
    records: 3400000,
    lastSync: '45 mins ago',
    accuracy: 90,
    apiType: 'REST',
    syncFrequency: 'Every 4 hours',
    icon: FileText,
    dataPoints: ['Resume', 'Job History', 'Skills', 'Salary Expectations'],
    compliance: ['CCPA']
  }
]

const syncMetrics = {
  totalRecords: 287340970,
  successRate: 98.7,
  avgSyncTime: '2.3s',
  dataQuality: 96,
  lastFullSync: '6 hours ago',
  nextScheduled: 'in 2 hours'
}

export function DataSourcesHub() {
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null)
  const [syncingAll, setSyncingAll] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleSyncAll = () => {
    setSyncingAll(true)
    setTimeout(() => setSyncingAll(false), 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-500'
      case 'syncing': return 'text-blue-500'
      case 'error': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <Check className="w-4 h-4" />
      case 'syncing': return <RefreshCw className="w-4 h-4 animate-spin" />
      case 'error': return <X className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const categories = [...new Set(dataSources.map(ds => ds.category))]

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{dataSources.filter(ds => ds.status === 'connected').length}/{dataSources.length}</div>
            <p className="text-sm text-muted-foreground">Connected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{(syncMetrics.totalRecords / 1000000).toFixed(1)}M</div>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{syncMetrics.successRate}%</div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{syncMetrics.dataQuality}%</div>
            <p className="text-sm text-muted-foreground">Data Quality</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{syncMetrics.avgSyncTime}</div>
            <p className="text-sm text-muted-foreground">Avg Sync Time</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{syncMetrics.nextScheduled}</div>
            <p className="text-sm text-muted-foreground">Next Sync</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
          >
            <Database className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === 'connections' ? 'default' : 'outline'}
            onClick={() => setActiveTab('connections')}
          >
            <Link2 className="w-4 h-4 mr-2" />
            Connections
          </Button>
          <Button
            variant={activeTab === 'compliance' ? 'default' : 'outline'}
            onClick={() => setActiveTab('compliance')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Compliance
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleSyncAll} disabled={syncingAll}>
            {syncingAll ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync All
              </>
            )}
          </Button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Data Sources by Category */}
          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center">
                {category}
                <Badge variant="secondary" className="ml-2">
                  {dataSources.filter(ds => ds.category === category).length} sources
                </Badge>
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {dataSources
                  .filter(ds => ds.category === category)
                  .map((source, index) => (
                    <motion.div
                      key={source.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedSource(source)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <source.icon className="w-5 h-5 text-primary" />
                              <div>
                                <h4 className="font-semibold">{source.name}</h4>
                                <p className="text-xs text-muted-foreground">{source.apiType} API</p>
                              </div>
                            </div>
                            <div className={`flex items-center space-x-1 ${getStatusColor(source.status)}`}>
                              {getStatusIcon(source.status)}
                              <span className="text-xs capitalize">{source.status}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Records</span>
                              <span className="font-medium">{(source.records / 1000000).toFixed(1)}M</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Accuracy</span>
                              <span className="font-medium">{source.accuracy}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Last Sync</span>
                              <span className="font-medium">{source.lastSync}</span>
                            </div>
                            <Progress value={source.accuracy} className="h-1" />
                          </div>

                          <div className="mt-3 pt-3 border-t">
                            <div className="flex flex-wrap gap-1">
                              {source.compliance.map(comp => (
                                <Badge key={comp} variant="outline" className="text-xs">
                                  {comp}
                                </Badge>
                              ))}
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

      {activeTab === 'connections' && (
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>API Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dataSources.map(source => (
                <div key={source.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <source.icon className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">{source.name}</div>
                      <div className="text-xs text-muted-foreground">{source.apiType} • {source.syncFrequency}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      source.status === 'connected' ? 'bg-green-500' :
                      source.status === 'syncing' ? 'bg-blue-500 animate-pulse' :
                      source.status === 'error' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`} />
                    <Button size="sm" variant="ghost">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">API Response Time</span>
                    <span className="text-sm font-medium">238ms</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Data Completeness</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Sync Success Rate</span>
                    <span className="text-sm font-medium">98.7%</span>
                  </div>
                  <Progress value={98.7} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Uptime (30 days)</span>
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>HIPAA Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Encryption at Rest</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Encryption in Transit</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Access Controls</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Audit Logging</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">BAA Signed</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GDPR Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Minimization</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Right to Erasure</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Portability</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consent Management</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">DPA Signed</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SOC 2 Type II</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Security</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Availability</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Processing Integrity</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Confidentiality</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Privacy</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Selected Source Detail Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedSource(null)}>
          <Card className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <selectedSource.icon className="w-6 h-6 text-primary" />
                  <CardTitle>{selectedSource.name}</CardTitle>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedSource(null)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div className={`flex items-center space-x-2 mt-1 ${getStatusColor(selectedSource.status)}`}>
                    {getStatusIcon(selectedSource.status)}
                    <span className="capitalize">{selectedSource.status}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">API Type</Label>
                  <p className="mt-1">{selectedSource.apiType}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Total Records</Label>
                  <p className="mt-1">{selectedSource.records.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Sync Frequency</Label>
                  <p className="mt-1">{selectedSource.syncFrequency}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Data Accuracy</Label>
                  <p className="mt-1">{selectedSource.accuracy}%</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Last Sync</Label>
                  <p className="mt-1">{selectedSource.lastSync}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Data Points</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedSource.dataPoints.map(point => (
                    <Badge key={point} variant="secondary">{point}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Compliance Standards</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedSource.compliance.map(comp => (
                    <Badge key={comp} variant="outline">{comp}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Zap className="w-4 h-4 mr-2" />
                  Test Connection
                </Button>
                <Button variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
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