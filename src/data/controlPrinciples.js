export const controlPrinciples = [
  {
    id: 'human-review',
    number: '01',
    title: 'Human Review Where Needed',
    description:
      'Keep approvals, exceptions and important operational decisions with the people responsible for the process.',
    icon: 'UserCheck',
    accent: 'cyan',
  },
  {
    id: 'validation',
    number: '02',
    title: 'Validation Before Action',
    description:
      'Check required information and workflow conditions before data moves further into the operational process.',
    icon: 'ListChecks',
    accent: 'blue',
  },
  {
    id: 'exceptions',
    number: '03',
    title: 'Exception Handling',
    description:
      'Surface incomplete, unusual or uncertain information for review instead of automatically pushing every case forward.',
    icon: 'AlertTriangle',
    accent: 'amber',
  },
  {
    id: 'business-rules',
    number: '04',
    title: 'Defined Business Rules',
    description:
      'Configure workflows around the rules, approvals and process logic your business already follows.',
    icon: 'SlidersHorizontal',
    accent: 'violet',
  },
]

export const aiProcessingSteps = [
  {
    id: 'read',
    label: 'Read Document',
    accent: 'blue',
  },
  {
    id: 'extract',
    label: 'Extract Data',
    accent: 'violet',
  },
  {
    id: 'structure',
    label: 'Structure Information',
    accent: 'blue',
  },
  {
    id: 'prepare',
    label: 'Prepare Next Action',
    accent: 'violet',
  },
]

export const controlGateItems = [
  {
    id: 'validate',
    label: 'Validate',
    icon: 'ShieldCheck',
  },
  {
    id: 'rules',
    label: 'Rules',
    icon: 'SlidersHorizontal',
  },
  {
    id: 'exceptions',
    label: 'Exceptions',
    icon: 'ListChecks',
  },
  {
    id: 'approvals',
    label: 'Approvals',
    icon: 'ClipboardCheck',
  },
]

export const readyPath = {
  id: 'ready',
  title: 'Ready to Continue',
  labels: ['Validated', 'Workflow Ready', 'Continue'],
  outcome: {
    title: 'ERP / Operational Workflow',
    labels: ['Structured Data', 'Approved Action', 'Next Process'],
    icon: 'Database',
  },
}

export const reviewPath = {
  id: 'review',
  title: 'Needs Review',
  labels: ['Missing Information', 'Exception', 'Approval Required'],
  outcome: {
    title: 'Team Review',
    labels: ['Review Exception', 'Approve', 'Correct', 'Continue'],
    icon: 'UserCheck',
  },
}
