export const systemConnections = [
  {
    id: 'email',
    label: 'Email',
    category: 'Input Source',
    icon: 'Mail',
    position: 'top',
    accent: 'blue',
    flow: 'in',
  },
  {
    id: 'pdf',
    label: 'PDF Documents',
    category: 'Document Source',
    icon: 'FileText',
    position: 'top-left',
    accent: 'violet',
    flow: 'in',
  },
  {
    id: 'excel',
    label: 'Excel',
    category: 'Operational Data',
    icon: 'Table2',
    position: 'left',
    accent: 'cyan',
    flow: 'in',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    category: 'Communication',
    icon: 'MessageCircle',
    position: 'bottom-left',
    accent: 'blue',
    flow: 'in',
  },
  {
    id: 'erp',
    label: 'ERP',
    category: 'Core Business System',
    icon: 'Database',
    position: 'right',
    accent: 'emerald',
    flow: 'out',
  },
  {
    id: 'crm',
    label: 'CRM',
    category: 'Customer System',
    icon: 'Users',
    position: 'top-right',
    accent: 'indigo',
    flow: 'out',
  },
  {
    id: 'accounting',
    label: 'Accounting',
    category: 'Finance System',
    icon: 'Calculator',
    position: 'bottom-right',
    accent: 'cyan',
    flow: 'out',
  },
  {
    id: 'ecommerce',
    label: 'eCommerce',
    category: 'Sales Channel',
    icon: 'ShoppingBag',
    position: 'bottom',
    accent: 'violet',
    flow: 'out',
  },
]

export const systemPrinciples = [
  {
    id: 'keep-erp',
    title: 'Keep Your ERP',
    text: 'Your existing ERP remains at the center of your operational environment.',
    icon: 'Database',
  },
  {
    id: 'connect-work',
    title: 'Connect the Work Around It',
    text: 'Documents, communication and business information can feed into structured AI-assisted workflows.',
    icon: 'Cable',
  },
  {
    id: 'automate-selectively',
    title: 'Automate Selectively',
    text: 'Start with the repetitive processes that create the most manual work instead of replacing everything at once.',
    icon: 'ListChecks',
  },
]

/** Percent coords for desktop SVG network (viewBox 0 0 100 100)
 * Compact ring with left sources edged outward enough to clear the hub.
 */
export const systemNodeCoords = {
  top: { x: 50, y: 19.5 },
  'top-left': { x: 21.5, y: 29.5 },
  'top-right': { x: 78.5, y: 29.5 },
  left: { x: 15, y: 50 },
  right: { x: 85, y: 50 },
  'bottom-left': { x: 21.5, y: 70.5 },
  'bottom-right': { x: 78.5, y: 70.5 },
  bottom: { x: 50, y: 80.5 },
  hub: { x: 50, y: 50 },
}

/** Sequenced data-flow pairs for calm ecosystem activity */
export const systemFlowSequence = [
  { from: 'email', to: 'hub' },
  { from: 'hub', to: 'erp' },
  { from: 'excel', to: 'hub' },
  { from: 'hub', to: 'crm' },
  { from: 'pdf', to: 'hub' },
  { from: 'hub', to: 'accounting' },
  { from: 'whatsapp', to: 'hub' },
  { from: 'hub', to: 'ecommerce' },
]
