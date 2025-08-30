"use client"

import { useState } from 'react'
import { 
  Code, Key, Shield, Database, GitBranch, 
  Terminal, FileText, Lock, Cloud, Server,
  CheckCircle, AlertCircle, Copy, ExternalLink,
  Book, Zap, Settings, Download, ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  description: string
  auth: boolean
  rateLimit: string
  example?: {
    request?: any
    response?: any
  }
}

interface DataSource {
  name: string
  type: string
  authentication: string
  baseUrl: string
  documentation: string
  requiredParams: string[]
  optionalParams: string[]
  rateLimit: string
  dataRefresh: string
}

const apiEndpoints: Record<string, APIEndpoint[]> = {
  'Candidate Management': [
    {
      method: 'GET',
      path: '/api/v2/candidates',
      description: 'Retrieve list of candidates with filters',
      auth: true,
      rateLimit: '1000/hour',
      example: {
        request: {
          specialty: 'emergency_medicine',
          location: 'CA',
          experience_min: 5,
          limit: 50
        },
        response: {
          data: [
            {
              id: 'cand_123',
              name: 'Dr. Emily Rodriguez',
              specialty: 'Emergency Medicine',
              score: 92,
              status: 'active'
            }
          ],
          pagination: { page: 1, total: 234 }
        }
      }
    },
    {
      method: 'POST',
      path: '/api/v2/candidates/search',
      description: 'Advanced candidate search with AI scoring',
      auth: true,
      rateLimit: '500/hour',
      example: {
        request: {
          criteria: {
            specialties: ['emergency_medicine', 'critical_care'],
            certifications: ['ACLS', 'PALS'],
            procedures: ['intubation', 'central_line'],
            experience: { min: 5, max: 15 },
            location: { city: 'Los Angeles', radius: 50 }
          },
          scoring: {
            weights: {
              clinical_fit: 0.3,
              geographic_fit: 0.2,
              compensation_match: 0.25,
              availability: 0.25
            }
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/api/v2/candidates/{id}/profile',
      description: 'Get detailed candidate profile with enriched data',
      auth: true,
      rateLimit: '2000/hour'
    },
    {
      method: 'POST',
      path: '/api/v2/candidates/{id}/enrich',
      description: 'Trigger data enrichment from all sources',
      auth: true,
      rateLimit: '100/hour'
    }
  ],
  'Outreach & Engagement': [
    {
      method: 'POST',
      path: '/api/v2/outreach/campaigns',
      description: 'Create multi-channel outreach campaign',
      auth: true,
      rateLimit: '100/hour',
      example: {
        request: {
          name: 'ER Physicians Q1 2024',
          candidates: ['cand_123', 'cand_456'],
          channels: ['email', 'linkedin', 'voice'],
          personalization: {
            enabled: true,
            factors: ['work_life_balance', 'compensation', 'location']
          },
          schedule: {
            start_date: '2024-01-15',
            timezone: 'America/Los_Angeles',
            optimal_timing: true
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/api/v2/outreach/messages/generate',
      description: 'Generate AI-personalized messages',
      auth: true,
      rateLimit: '500/hour'
    },
    {
      method: 'POST',
      path: '/api/v2/voice/calls/initiate',
      description: 'Initiate AI voice agent call',
      auth: true,
      rateLimit: '50/hour'
    },
    {
      method: 'GET',
      path: '/api/v2/voice/calls/{id}/transcript',
      description: 'Get call transcript and analysis',
      auth: true,
      rateLimit: '1000/hour'
    }
  ],
  'Data Sources': [
    {
      method: 'GET',
      path: '/api/v2/sources',
      description: 'List all connected data sources',
      auth: true,
      rateLimit: '1000/hour'
    },
    {
      method: 'POST',
      path: '/api/v2/sources/connect',
      description: 'Connect new data source',
      auth: true,
      rateLimit: '10/hour',
      example: {
        request: {
          source: 'linkedin',
          credentials: {
            client_id: 'your_client_id',
            client_secret: 'your_client_secret',
            redirect_uri: 'https://app.example.com/callback'
          },
          sync_config: {
            frequency: 'hourly',
            full_sync: false,
            incremental: true
          }
        }
      }
    },
    {
      method: 'POST',
      path: '/api/v2/sources/{source}/sync',
      description: 'Trigger manual data sync',
      auth: true,
      rateLimit: '20/hour'
    }
  ],
  'Analytics & Reporting': [
    {
      method: 'GET',
      path: '/api/v2/analytics/dashboard',
      description: 'Get dashboard metrics',
      auth: true,
      rateLimit: '1000/hour'
    },
    {
      method: 'GET',
      path: '/api/v2/analytics/campaigns/{id}/performance',
      description: 'Get campaign performance metrics',
      auth: true,
      rateLimit: '500/hour'
    },
    {
      method: 'POST',
      path: '/api/v2/reports/generate',
      description: 'Generate custom report',
      auth: true,
      rateLimit: '50/hour'
    }
  ],
  'Webhooks': [
    {
      method: 'POST',
      path: '/api/v2/webhooks',
      description: 'Register webhook endpoint',
      auth: true,
      rateLimit: '10/hour',
      example: {
        request: {
          url: 'https://your-app.com/webhooks/outreach',
          events: ['candidate.responded', 'interview.scheduled', 'offer.accepted'],
          secret: 'your_webhook_secret'
        }
      }
    },
    {
      method: 'GET',
      path: '/api/v2/webhooks',
      description: 'List registered webhooks',
      auth: true,
      rateLimit: '100/hour'
    }
  ]
}

const dataSources: DataSource[] = [
  {
    name: 'LinkedIn Sales Navigator',
    type: 'OAuth 2.0',
    authentication: 'Client ID + Secret',
    baseUrl: 'https://api.linkedin.com/v2',
    documentation: 'https://docs.microsoft.com/linkedin',
    requiredParams: ['client_id', 'client_secret', 'redirect_uri'],
    optionalParams: ['scope', 'state'],
    rateLimit: '100 requests/day per user',
    dataRefresh: 'Real-time'
  },
  {
    name: 'NPI Registry',
    type: 'REST API',
    authentication: 'API Key',
    baseUrl: 'https://npiregistry.cms.hhs.gov/api',
    documentation: 'https://npiregistry.cms.hhs.gov/api-page',
    requiredParams: ['version', 'number'],
    optionalParams: ['enumeration_type', 'taxonomy_description', 'state'],
    rateLimit: 'Unlimited',
    dataRefresh: 'Monthly'
  },
  {
    name: 'Epic FHIR',
    type: 'FHIR R4',
    authentication: 'OAuth 2.0 + SMART',
    baseUrl: 'https://fhir.epic.com',
    documentation: 'https://fhir.epic.com/Documentation',
    requiredParams: ['client_id', 'private_key', 'iss', 'sub'],
    optionalParams: ['launch', 'scope'],
    rateLimit: '1000/hour',
    dataRefresh: 'Real-time'
  },
  {
    name: 'Doximity',
    type: 'REST API',
    authentication: 'Bearer Token',
    baseUrl: 'https://api.doximity.com/v1',
    documentation: 'https://developer.doximity.com',
    requiredParams: ['api_key', 'api_secret'],
    optionalParams: ['specialty', 'location', 'radius'],
    rateLimit: '500/hour',
    dataRefresh: 'Daily'
  }
]

const integrationSteps = [
  {
    step: 1,
    title: 'Register Application',
    description: 'Create an application in the Outreach Hunter developer portal',
    code: `// Register at https://developers.outreachhunter.ai
// Obtain your credentials:
{
  "client_id": "oh_client_abc123",
  "client_secret": "oh_secret_xyz789",
  "api_key": "oh_key_def456"
}`
  },
  {
    step: 2,
    title: 'Install SDK',
    description: 'Install the Outreach Hunter SDK for your platform',
    code: `# Node.js
npm install @outreachhunter/sdk

# Python
pip install outreachhunter

# Ruby
gem install outreachhunter`
  },
  {
    step: 3,
    title: 'Initialize Client',
    description: 'Initialize the API client with your credentials',
    code: `// JavaScript/TypeScript
import { OutreachHunter } from '@outreachhunter/sdk';

const client = new OutreachHunter({
  apiKey: process.env.OH_API_KEY,
  apiSecret: process.env.OH_API_SECRET,
  environment: 'production'
});

// Python
from outreachhunter import Client

client = Client(
  api_key=os.environ['OH_API_KEY'],
  api_secret=os.environ['OH_API_SECRET']
)`
  },
  {
    step: 4,
    title: 'Make API Calls',
    description: 'Start making API calls to search and engage candidates',
    code: `// Search for candidates
const candidates = await client.candidates.search({
  specialty: 'emergency_medicine',
  location: 'CA',
  experience: { min: 5, max: 15 }
});

// Create outreach campaign
const campaign = await client.outreach.createCampaign({
  name: 'Q1 ER Recruitment',
  candidates: candidates.data.map(c => c.id),
  channels: ['email', 'linkedin', 'voice']
});

// Get analytics
const metrics = await client.analytics.getCampaignMetrics(campaign.id);`
  }
]

export function APIDocumentation() {
  const [activeTab, setActiveTab] = useState<'endpoints' | 'sources' | 'authentication' | 'quickstart'>('endpoints')
  const [selectedEndpointCategory, setSelectedEndpointCategory] = useState('Candidate Management')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500'
      case 'POST': return 'bg-blue-500'
      case 'PUT': return 'bg-yellow-500'
      case 'DELETE': return 'bg-red-500'
      case 'PATCH': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            API Documentation & Integration Guide
          </h2>
          <p className="text-muted-foreground">Complete reference for integrating with Outreach Hunter Pro</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">API v2.0</Badge>
          <Badge variant="outline">REST + GraphQL</Badge>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download SDK
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b">
        {['endpoints', 'sources', 'authentication', 'quickstart'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 border-b-2 transition-colors capitalize ${
              activeTab === tab 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'endpoints' && <Terminal className="w-4 h-4 inline mr-2" />}
            {tab === 'sources' && <Database className="w-4 h-4 inline mr-2" />}
            {tab === 'authentication' && <Shield className="w-4 h-4 inline mr-2" />}
            {tab === 'quickstart' && <Zap className="w-4 h-4 inline mr-2" />}
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Endpoints Tab */}
      {activeTab === 'endpoints' && (
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">API Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {Object.keys(apiEndpoints).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedEndpointCategory(category)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                      selectedEndpointCategory === category ? 'bg-muted font-medium' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category}</span>
                      <Badge variant="outline" className="text-xs">
                        {apiEndpoints[category].length}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="col-span-3 space-y-4">
            {apiEndpoints[selectedEndpointCategory].map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={`${getMethodColor(endpoint.method)} text-white`}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {endpoint.path}
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        {endpoint.auth && (
                          <Badge variant="outline" className="text-xs">
                            <Lock className="w-3 h-3 mr-1" />
                            Auth Required
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {endpoint.rateLimit}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{endpoint.description}</p>
                    
                    {endpoint.example && (
                      <div className="space-y-3">
                        {endpoint.example.request && (
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium">Request Example</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={() => copyToClipboard(JSON.stringify(endpoint.example?.request, null, 2), `req-${index}`)}
                              >
                                {copiedCode === `req-${index}` ? (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                ) : (
                                  <Copy className="w-3 h-3 mr-1" />
                                )}
                                Copy
                              </Button>
                            </div>
                            <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                              <code>{JSON.stringify(endpoint.example.request, null, 2)}</code>
                            </pre>
                          </div>
                        )}
                        
                        {endpoint.example.response && (
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium">Response Example</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={() => copyToClipboard(JSON.stringify(endpoint.example?.response, null, 2), `res-${index}`)}
                              >
                                {copiedCode === `res-${index}` ? (
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                ) : (
                                  <Copy className="w-3 h-3 mr-1" />
                                )}
                                Copy
                              </Button>
                            </div>
                            <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                              <code>{JSON.stringify(endpoint.example.response, null, 2)}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Data Sources Tab */}
      {activeTab === 'sources' && (
        <div className="grid grid-cols-2 gap-6">
          {dataSources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{source.name}</CardTitle>
                    <Badge variant="outline">{source.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Authentication</p>
                      <p className="font-medium">{source.authentication}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rate Limit</p>
                      <p className="font-medium">{source.rateLimit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data Refresh</p>
                      <p className="font-medium">{source.dataRefresh}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Base URL</p>
                      <code className="text-xs bg-muted px-1 rounded">{source.baseUrl}</code>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Required Parameters</p>
                    <div className="flex flex-wrap gap-1">
                      {source.requiredParams.map((param) => (
                        <Badge key={param} variant="default" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Optional Parameters</p>
                    <div className="flex flex-wrap gap-1">
                      {source.optionalParams.map((param) => (
                        <Badge key={param} variant="outline" className="text-xs">
                          {param}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-3 h-3 mr-2" />
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Authentication Tab */}
      {activeTab === 'authentication' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    API Key Authentication
                  </h4>
                  <Badge variant="default">Recommended</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Use API keys for server-to-server communication and backend integrations.
                </p>
                <pre className="bg-muted p-3 rounded text-sm">
                  <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.outreachhunter.ai/v2/candidates`}</code>
                </pre>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  OAuth 2.0
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Use OAuth 2.0 for user-facing applications and third-party integrations.
                </p>
                <pre className="bg-muted p-3 rounded text-sm">
                  <code>{`// Authorization URL
https://auth.outreachhunter.ai/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  response_type=code&
  scope=read:candidates write:outreach

// Token Exchange
POST https://auth.outreachhunter.ai/oauth/token
{
  "grant_type": "authorization_code",
  "code": "AUTH_CODE",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET"
}`}</code>
                </pre>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Webhook Signatures
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Verify webhook payloads using HMAC-SHA256 signatures.
                </p>
                <pre className="bg-muted p-3 rounded text-sm">
                  <code>{`// Node.js Example
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return hash === signature;
}`}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Shield, text: 'Never expose API keys in client-side code', status: 'critical' },
                { icon: Lock, text: 'Use environment variables for credentials', status: 'critical' },
                { icon: Key, text: 'Rotate API keys regularly (every 90 days)', status: 'important' },
                { icon: Cloud, text: 'Implement rate limiting on your end', status: 'recommended' },
                { icon: Server, text: 'Use webhook signatures to verify payloads', status: 'important' },
                { icon: Database, text: 'Encrypt sensitive data at rest', status: 'critical' }
              ].map((practice, index) => (
                <div key={index} className="flex items-center gap-3">
                  <practice.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm flex-1">{practice.text}</span>
                  <Badge variant={
                    practice.status === 'critical' ? 'destructive' :
                    practice.status === 'important' ? 'default' :
                    'secondary'
                  }>
                    {practice.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Start Tab */}
      {activeTab === 'quickstart' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrationSteps.map((step) => (
                <div key={step.step} className="relative">
                  {step.step < integrationSteps.length && (
                    <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
                  )}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      <div className="relative">
                        <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-6 text-xs"
                          onClick={() => copyToClipboard(step.code, `step-${step.step}`)}
                        >
                          {copiedCode === `step-${step.step}` ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <Copy className="w-3 h-3 mr-1" />
                          )}
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Book className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">Full Documentation</p>
                    <p className="text-xs text-muted-foreground">Comprehensive API reference</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View Docs
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <GitBranch className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="font-medium">Sample Code</p>
                    <p className="text-xs text-muted-foreground">GitHub repositories</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-3 h-3 mr-2" />
                  View Examples
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium">Postman Collection</p>
                    <p className="text-xs text-muted-foreground">Ready-to-use API calls</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-3 h-3 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}