"use client"

import { useState } from 'react'
import { Plus, X, Search, Filter, ChevronDown, Sparkles, Target, Database } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'

interface CriteriaRule {
  id: string
  field: string
  operator: string
  value: string | string[]
  weight: number
}

interface CriteriaGroup {
  id: string
  name: string
  logic: 'AND' | 'OR'
  rules: CriteriaRule[]
  groups: CriteriaGroup[]
}

const clinicalFields = [
  { id: 'specialty', label: 'Specialty', type: 'select', options: ['Emergency Medicine', 'Critical Care', 'Trauma Surgery', 'Anesthesiology', 'Internal Medicine'] },
  { id: 'experience', label: 'Years Experience', type: 'range', min: 0, max: 40 },
  { id: 'certification', label: 'Board Certification', type: 'multiselect', options: ['ABEM', 'ABIM', 'ABS', 'ABA', 'AOBEM'] },
  { id: 'procedures', label: 'Procedures', type: 'multiselect', options: ['Intubation', 'Central Line', 'Chest Tube', 'Lumbar Puncture', 'Ultrasound'] },
  { id: 'emr', label: 'EMR Systems', type: 'multiselect', options: ['Epic', 'Cerner', 'Athena', 'eClinicalWorks', 'NextGen'] },
  { id: 'shifts', label: 'Shift Preference', type: 'select', options: ['Days', 'Nights', 'Swing', 'Rotating', 'Flexible'] },
  { id: 'location', label: 'Location', type: 'location', radius: true },
  { id: 'compensation', label: 'Compensation Range', type: 'range', min: 200000, max: 800000 },
  { id: 'facility', label: 'Facility Type', type: 'multiselect', options: ['Level 1 Trauma', 'Academic', 'Community', 'Rural', 'Urban'] },
  { id: 'volume', label: 'Patient Volume/Day', type: 'range', min: 50, max: 500 },
  { id: 'acuity', label: 'Acuity Level', type: 'select', options: ['High', 'Medium', 'Low', 'Mixed'] },
  { id: 'teaching', label: 'Teaching Interest', type: 'boolean' },
  { id: 'research', label: 'Research Experience', type: 'boolean' },
  { id: 'leadership', label: 'Leadership Roles', type: 'multiselect', options: ['Medical Director', 'Department Chair', 'Committee Member', 'Quality Lead'] },
  { id: 'languages', label: 'Languages', type: 'multiselect', options: ['Spanish', 'Mandarin', 'French', 'Arabic', 'Hindi'] },
  { id: 'availability', label: 'Start Availability', type: 'date' },
  { id: 'commitment', label: 'Commitment Type', type: 'select', options: ['Full-time', 'Part-time', 'Per Diem', 'Locum Tenens'] },
  { id: 'license_states', label: 'License States', type: 'multiselect', options: ['CA', 'NY', 'TX', 'FL', 'IL', 'PA'] },
  { id: 'visa', label: 'Visa Status', type: 'select', options: ['US Citizen', 'Green Card', 'H1B', 'J1 Waiver', 'Not Authorized'] },
  { id: 'malpractice', label: 'Malpractice History', type: 'select', options: ['Clean', '1-2 Cases', '3+ Cases'] }
]

const operators = {
  select: ['equals', 'not equals', 'in', 'not in'],
  multiselect: ['contains', 'not contains', 'contains all', 'contains any'],
  range: ['equals', 'greater than', 'less than', 'between'],
  boolean: ['is', 'is not'],
  date: ['before', 'after', 'between'],
  location: ['within radius', 'outside radius', 'in state', 'in region']
}

const savedTemplates = [
  { id: '1', name: 'High-Volume ER Physicians', criteria: 12, matches: 234 },
  { id: '2', name: 'Trauma Specialists - West Coast', criteria: 8, matches: 89 },
  { id: '3', name: 'Locum Tenens Ready', criteria: 6, matches: 156 },
  { id: '4', name: 'Academic Emergency Medicine', criteria: 10, matches: 67 }
]

export function ClinicalCriteriaBuilder() {
  const [criteriaGroups, setCriteriaGroups] = useState<CriteriaGroup[]>([
    {
      id: '1',
      name: 'Primary Criteria',
      logic: 'AND',
      rules: [],
      groups: []
    }
  ])
  const [activeTab, setActiveTab] = useState('builder')
  const [searchQuery, setSearchQuery] = useState('')
  const [estimatedMatches, setEstimatedMatches] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const addRule = (groupId: string) => {
    const newRule: CriteriaRule = {
      id: Date.now().toString(),
      field: 'specialty',
      operator: 'equals',
      value: '',
      weight: 1
    }

    setCriteriaGroups(groups => 
      groups.map(group => 
        group.id === groupId 
          ? { ...group, rules: [...group.rules, newRule] }
          : group
      )
    )
  }

  const removeRule = (groupId: string, ruleId: string) => {
    setCriteriaGroups(groups =>
      groups.map(group =>
        group.id === groupId
          ? { ...group, rules: group.rules.filter(r => r.id !== ruleId) }
          : group
      )
    )
  }

  const addGroup = () => {
    const newGroup: CriteriaGroup = {
      id: Date.now().toString(),
      name: `Group ${criteriaGroups.length + 1}`,
      logic: 'AND',
      rules: [],
      groups: []
    }
    setCriteriaGroups([...criteriaGroups, newGroup])
  }

  const estimateMatches = () => {
    setIsProcessing(true)
    setTimeout(() => {
      const totalRules = criteriaGroups.reduce((acc, group) => acc + group.rules.length, 0)
      const estimate = Math.max(10, Math.floor(Math.random() * 500) - (totalRules * 20))
      setEstimatedMatches(estimate)
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <Button
            variant={activeTab === 'builder' ? 'default' : 'outline'}
            onClick={() => setActiveTab('builder')}
          >
            <Filter className="w-4 h-4 mr-2" />
            Criteria Builder
          </Button>
          <Button
            variant={activeTab === 'templates' ? 'default' : 'outline'}
            onClick={() => setActiveTab('templates')}
          >
            <Database className="w-4 h-4 mr-2" />
            Saved Templates
          </Button>
          <Button
            variant={activeTab === 'ai' ? 'default' : 'outline'}
            onClick={() => setActiveTab('ai')}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {criteriaGroups.reduce((acc, g) => acc + g.rules.length, 0)} Active Criteria
          </Badge>
          {estimatedMatches > 0 && (
            <Badge variant="default">
              ~{estimatedMatches} Matches
            </Badge>
          )}
        </div>
      </div>

      {activeTab === 'builder' && (
        <div className="space-y-4">
          {criteriaGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <select
                        className="px-3 py-1 border rounded-md text-sm"
                        value={group.logic}
                        onChange={(e) => {
                          setCriteriaGroups(groups =>
                            groups.map(g =>
                              g.id === group.id
                                ? { ...g, logic: e.target.value as 'AND' | 'OR' }
                                : g
                            )
                          )
                        }}
                      >
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                      </select>
                    </div>
                    {groupIndex > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCriteriaGroups(groups => groups.filter(g => g.id !== group.id))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AnimatePresence>
                    {group.rules.map((rule, ruleIndex) => {
                      const field = clinicalFields.find(f => f.id === rule.field)
                      return (
                        <motion.div
                          key={rule.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: ruleIndex * 0.05 }}
                          className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg"
                        >
                          <select
                            className="flex-1 px-3 py-2 border rounded-md"
                            value={rule.field}
                            onChange={(e) => {
                              setCriteriaGroups(groups =>
                                groups.map(g =>
                                  g.id === group.id
                                    ? {
                                        ...g,
                                        rules: g.rules.map(r =>
                                          r.id === rule.id
                                            ? { ...r, field: e.target.value, operator: '', value: '' }
                                            : r
                                        )
                                      }
                                    : g
                                )
                              )
                            }}
                          >
                            {clinicalFields.map(f => (
                              <option key={f.id} value={f.id}>{f.label}</option>
                            ))}
                          </select>

                          <select
                            className="w-40 px-3 py-2 border rounded-md"
                            value={rule.operator}
                            onChange={(e) => {
                              setCriteriaGroups(groups =>
                                groups.map(g =>
                                  g.id === group.id
                                    ? {
                                        ...g,
                                        rules: g.rules.map(r =>
                                          r.id === rule.id
                                            ? { ...r, operator: e.target.value }
                                            : r
                                        )
                                      }
                                    : g
                                )
                              )
                            }}
                          >
                            <option value="">Select operator</option>
                            {field && operators[field.type as keyof typeof operators]?.map(op => (
                              <option key={op} value={op}>{op}</option>
                            ))}
                          </select>

                          {field?.type === 'select' && (
                            <select
                              className="flex-1 px-3 py-2 border rounded-md"
                              value={rule.value as string}
                              onChange={(e) => {
                                setCriteriaGroups(groups =>
                                  groups.map(g =>
                                    g.id === group.id
                                      ? {
                                          ...g,
                                          rules: g.rules.map(r =>
                                            r.id === rule.id
                                              ? { ...r, value: e.target.value }
                                              : r
                                          )
                                        }
                                      : g
                                  )
                                )
                              }}
                            >
                              <option value="">Select value</option>
                              {field.options?.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          )}

                          {field?.type === 'range' && (
                            <div className="flex items-center space-x-2">
                              <Input
                                type="number"
                                placeholder={`Min ${field.min}`}
                                className="w-24"
                                onChange={(e) => {
                                  // Handle range input
                                }}
                              />
                              <span>-</span>
                              <Input
                                type="number"
                                placeholder={`Max ${field.max}`}
                                className="w-24"
                                onChange={(e) => {
                                  // Handle range input
                                }}
                              />
                            </div>
                          )}

                          {field?.type === 'boolean' && (
                            <select
                              className="flex-1 px-3 py-2 border rounded-md"
                              value={rule.value as string}
                              onChange={(e) => {
                                setCriteriaGroups(groups =>
                                  groups.map(g =>
                                    g.id === group.id
                                      ? {
                                          ...g,
                                          rules: g.rules.map(r =>
                                            r.id === rule.id
                                              ? { ...r, value: e.target.value }
                                              : r
                                          )
                                        }
                                      : g
                                  )
                                )
                              }}
                            >
                              <option value="">Select</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          )}

                          <div className="flex items-center space-x-2">
                            <Label className="text-xs">Weight:</Label>
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              value={rule.weight}
                              className="w-16"
                              onChange={(e) => {
                                setCriteriaGroups(groups =>
                                  groups.map(g =>
                                    g.id === group.id
                                      ? {
                                          ...g,
                                          rules: g.rules.map(r =>
                                            r.id === rule.id
                                              ? { ...r, weight: parseInt(e.target.value) || 1 }
                                              : r
                                          )
                                        }
                                      : g
                                  )
                                )
                              }}
                            />
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRule(group.id, rule.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addRule(group.id)}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Criteria
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <div className="flex space-x-4">
            <Button onClick={addGroup} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Group
            </Button>
            <Button onClick={estimateMatches} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Calculating...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Estimate Matches
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-2 gap-4">
          {savedTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{template.name}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{template.criteria} criteria</span>
                  <Badge variant="secondary">{template.matches} matches</Badge>
                </div>
                <Button className="w-full mt-4" variant="outline" size="sm">
                  Load Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'ai' && (
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Criteria Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Describe your ideal candidates</Label>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows={4}
                placeholder="E.g., I need experienced ER physicians in California who are comfortable with high-acuity trauma cases, have at least 5 years experience, and are available for night shifts..."
              />
            </div>
            <Button className="w-full">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Criteria with AI
            </Button>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                The AI will analyze your description and automatically create targeted criteria rules based on:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Clinical specialties and sub-specialties</li>
                <li>• Geographic preferences and constraints</li>
                <li>• Experience and skill requirements</li>
                <li>• Availability and scheduling needs</li>
                <li>• Compensation expectations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}