import { faker } from '@faker-js/faker'
import type { HealthcareProfessional, Credential, JobOpportunity, Facility, EmailPresentation, ClientResponse, DashboardMetrics } from '@/lib/types'

const specialties = [
  'Emergency Medicine',
  'Cardiology', 
  'Orthopedics',
  'Anesthesiology',
  'Radiology',
  'Pediatrics',
  'Internal Medicine',
  'Surgery',
  'Psychiatry',
  'Obstetrics & Gynecology',
  'Neurology',
  'Oncology'
]

const skills = [
  'ACLS Certified',
  'BLS Certified',
  'PALS Certified',
  'Trauma Care',
  'Critical Care',
  'Electronic Health Records',
  'Patient Assessment',
  'Medication Administration',
  'Surgical Assistance',
  'Emergency Response',
  'Pain Management',
  'Wound Care'
]

const facilityNames = [
  'St. Mary\'s Medical Center',
  'Cedar Ridge Hospital',
  'Mountain View Clinic',
  'Riverside Health System',
  'Northern Light Medical',
  'Sunset Community Hospital',
  'Valley Medical Center',
  'Eastside Urgent Care',
  'West Coast Medical Group',
  'Central City Hospital'
]

export function generateCredential(professionalId: string): Credential {
  const types: Credential['type'][] = ['license', 'certification', 'dea', 'background_check']
  const type = faker.helpers.arrayElement(types)
  
  const credentialNames: Record<Credential['type'], string[]> = {
    license: ['State Medical License', 'Nursing License', 'Physician License'],
    certification: ['Board Certification', 'Specialty Certification', 'Advanced Practice Certification'],
    dea: ['DEA Registration'],
    background_check: ['Criminal Background Check', 'Professional Background Verification']
  }

  return {
    id: faker.string.uuid(),
    type,
    name: faker.helpers.arrayElement(credentialNames[type]),
    issuingBody: type === 'dea' ? 'Drug Enforcement Administration' : 
                 type === 'background_check' ? 'National Background Check Services' :
                 faker.helpers.arrayElement(['State Medical Board', 'American Board of Medical Specialties', 'National Certification Corporation']),
    issueDate: faker.date.past({ years: 5 }).toISOString(),
    expiryDate: type !== 'background_check' ? faker.date.future({ years: 3 }).toISOString() : undefined,
    state: type === 'license' ? faker.location.state({ abbreviated: true }) : undefined,
    number: faker.string.alphanumeric({ length: 10, casing: 'upper' }),
    status: faker.helpers.weightedArrayElement([
      { value: 'valid', weight: 8 },
      { value: 'pending_verification', weight: 2 }
    ]) as 'valid' | 'pending_verification'
  }
}

export function generateHealthcareProfessional(): HealthcareProfessional {
  const id = faker.string.uuid()
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const specialty = faker.helpers.arrayElement(specialties)
  const yearsExperience = faker.number.int({ min: 2, max: 25 })
  
  return {
    id,
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phone: faker.phone.number('###-###-####'),
    specialty,
    yearsExperience,
    location: {
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode()
    },
    credentials: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () => generateCredential(id)),
    skills: faker.helpers.arrayElements(skills, { min: 4, max: 8 }),
    availability: faker.helpers.arrayElement(['immediate', 'two_weeks', 'one_month', 'flexible']),
    salaryExpectation: {
      min: 150000 + (yearsExperience * 5000),
      max: 200000 + (yearsExperience * 10000)
    },
    resume: faker.datatype.boolean({ probability: 0.8 }) ? {
      uploadDate: faker.date.recent({ days: 30 }).toISOString(),
      fileName: `${firstName}_${lastName}_Resume.pdf`,
      analyzed: true,
      extractedData: {
        education: [`MD from ${faker.company.name()} Medical School`],
        experience: Array.from({ length: 3 }, () => ({
          title: `${specialty} Physician`,
          facility: faker.company.name() + ' Hospital',
          duration: `${faker.number.int({ min: 1, max: 5 })} years`
        }))
      }
    } : undefined,
    profileCompleteness: faker.number.int({ min: 60, max: 100 }),
    status: faker.helpers.weightedArrayElement([
      { value: 'active', weight: 7 },
      { value: 'pending', weight: 2 },
      { value: 'inactive', weight: 1 }
    ]) as 'active' | 'pending' | 'inactive',
    createdAt: faker.date.past({ years: 1 }).toISOString(),
    updatedAt: faker.date.recent({ days: 7 }).toISOString()
  }
}

export function generateFacility(): Facility {
  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement(facilityNames) + ' ' + faker.helpers.arrayElement(['', 'Campus', 'Network']),
    type: faker.helpers.arrayElement(['hospital', 'clinic', 'urgent_care', 'private_practice']),
    size: faker.helpers.arrayElement(['large', 'medium', 'small']),
    description: faker.lorem.sentences(2),
    location: {
      city: faker.location.city(),
      state: faker.location.state(),
      address: faker.location.streetAddress()
    },
    contactPerson: {
      name: faker.person.fullName(),
      title: faker.helpers.arrayElement(['HR Director', 'Recruitment Manager', 'Chief Medical Officer', 'Department Head']),
      email: faker.internet.email(),
      phone: faker.phone.number('###-###-####')
    }
  }
}

export function generateJobOpportunity(facilities: Facility[]): JobOpportunity {
  const specialty = faker.helpers.arrayElement(specialties)
  const type = faker.helpers.arrayElement(['permanent', 'locum', 'part_time', 'contract'])
  
  return {
    id: faker.string.uuid(),
    title: `${specialty} Physician - ${type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
    facility: faker.helpers.arrayElement(facilities),
    specialty,
    type,
    description: faker.lorem.paragraphs(2),
    requirements: faker.helpers.arrayElements([
      'Active state medical license',
      'Board certification in specialty',
      'DEA registration',
      'Minimum 2 years experience',
      'ACLS certification',
      'Electronic health records proficiency',
      'Excellent communication skills',
      'Team collaboration experience'
    ], { min: 4, max: 6 }),
    qualifications: faker.helpers.arrayElements([
      `MD or DO degree`,
      `Residency in ${specialty}`,
      'Fellowship preferred',
      'Research experience',
      'Teaching experience',
      'Leadership skills'
    ], { min: 3, max: 5 }),
    salaryRange: {
      min: 200000 + faker.number.int({ min: 0, max: 100000 }),
      max: 350000 + faker.number.int({ min: 0, max: 150000 })
    },
    benefits: faker.helpers.arrayElements([
      'Medical insurance',
      'Dental insurance',
      'Vision insurance',
      '401(k) with matching',
      'CME allowance',
      'Malpractice insurance',
      'Sign-on bonus',
      'Relocation assistance',
      'Paid time off'
    ], { min: 5, max: 8 }),
    schedule: faker.helpers.arrayElement([
      '7 on / 7 off',
      'Monday-Friday, 8-5',
      '3 12-hour shifts per week',
      'Flexible scheduling',
      'Full-time with call'
    ]),
    startDate: faker.date.future({ years: 0.5 }).toISOString(),
    urgency: faker.helpers.arrayElement(['high', 'medium', 'low']),
    location: {
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode()
    },
    status: faker.helpers.weightedArrayElement([
      { value: 'open', weight: 6 },
      { value: 'pending', weight: 2 },
      { value: 'filled', weight: 1 },
      { value: 'closed', weight: 1 }
    ]) as 'open' | 'pending' | 'filled' | 'closed',
    postedDate: faker.date.recent({ days: 30 }).toISOString(),
    applications: []
  }
}

export function generateEmailPresentation(candidateId: string, jobId: string, clientId: string): EmailPresentation {
  const sentDate = faker.date.recent({ days: 7 })
  const hasOpened = faker.datatype.boolean({ probability: 0.7 })
  const hasResponded = hasOpened && faker.datatype.boolean({ probability: 0.6 })
  
  return {
    id: faker.string.uuid(),
    candidateId,
    jobId,
    clientId,
    subject: `Excellent ${faker.helpers.arrayElement(specialties)} Candidate for Your Open Position`,
    content: faker.lorem.paragraphs(3),
    sentDate: sentDate.toISOString(),
    openedDate: hasOpened ? faker.date.between({ from: sentDate, to: new Date() }).toISOString() : undefined,
    responseDate: hasResponded ? faker.date.between({ from: sentDate, to: new Date() }).toISOString() : undefined,
    response: hasResponded ? generateClientResponse() : undefined,
    status: hasResponded ? 'responded' : hasOpened ? 'opened' : 'sent',
    trackingId: faker.string.alphanumeric({ length: 12, casing: 'upper' })
  }
}

export function generateClientResponse(): ClientResponse {
  const decision = faker.helpers.arrayElement(['accept', 'reject', 'negotiate'])
  
  return {
    id: faker.string.uuid(),
    presentationId: faker.string.uuid(),
    decision,
    feedback: decision === 'reject' ? faker.helpers.arrayElement([
      'Not enough experience',
      'Salary expectations too high',
      'Not available soon enough',
      'Found another candidate'
    ]) : decision === 'negotiate' ? 'Interested but would like to discuss terms' : 'Excellent candidate, please proceed',
    negotiationTerms: decision === 'negotiate' ? {
      salary: faker.number.int({ min: 180000, max: 280000 }),
      startDate: faker.date.future({ years: 0.25 }).toISOString(),
      schedule: faker.helpers.arrayElement(['Full-time preferred', 'Part-time acceptable', 'Flexible']),
      other: faker.lorem.sentence()
    } : undefined,
    respondedBy: faker.person.fullName(),
    respondedAt: faker.date.recent({ days: 3 }).toISOString()
  }
}

export function generateDashboardMetrics(): DashboardMetrics {
  return {
    totalCandidates: faker.number.int({ min: 150, max: 500 }),
    activePlacements: faker.number.int({ min: 10, max: 50 }),
    openPositions: faker.number.int({ min: 20, max: 80 }),
    averageMatchScore: faker.number.int({ min: 70, max: 95 }),
    placementRate: faker.number.float({ min: 0.65, max: 0.92, fractionDigits: 2 }),
    averageTimeToFill: faker.number.int({ min: 15, max: 45 }),
    revenueThisMonth: faker.number.int({ min: 50000, max: 250000 }),
    revenueGrowth: faker.number.float({ min: -0.1, max: 0.3, fractionDigits: 2 })
  }
}

// Generate complete datasets
export const professionals = Array.from({ length: 15 }, generateHealthcareProfessional)
export const facilities = Array.from({ length: 8 }, generateFacility)
export const jobOpportunities = Array.from({ length: 25 }, () => generateJobOpportunity(facilities))
export const emailPresentations = Array.from({ length: 20 }, () => 
  generateEmailPresentation(
    faker.helpers.arrayElement(professionals).id,
    faker.helpers.arrayElement(jobOpportunities).id,
    faker.helpers.arrayElement(facilities).id
  )
)
export const dashboardMetrics = generateDashboardMetrics()