export const workflowComparisons = [
  {
    id: 'order-processing',
    title: 'Order Processing',
    icon: 'ClipboardList',
    manualSummary:
      'Multiple manual touchpoints before the order reaches the ERP.',
    automatedSummary:
      'AI handles repetitive document work while people focus on exceptions and decisions.',
    manualSteps: [
      {
        id: 'm1',
        text: 'Customer PO arrives by email, PDF or WhatsApp',
        icon: 'Mail',
      },
      {
        id: 'm2',
        text: 'Employee opens and reads the document',
        icon: 'FileText',
      },
      {
        id: 'm3',
        text: 'Order details are copied manually',
        icon: 'Keyboard',
      },
      {
        id: 'm4',
        text: 'Information is checked against ERP data',
        icon: 'Search',
      },
      {
        id: 'm5',
        text: 'Order information is entered into the ERP',
        icon: 'Database',
      },
      {
        id: 'm6',
        text: 'Team confirms the order or resolves missing details',
        icon: 'CheckCircle',
      },
    ],
    automatedSteps: [
      {
        id: 'a1',
        text: 'Customer PO enters the workflow',
        icon: 'Workflow',
      },
      {
        id: 'a2',
        text: 'AI reads and identifies order information',
        icon: 'Bot',
      },
      {
        id: 'a3',
        text: 'Required fields are extracted and structured',
        icon: 'Sparkles',
      },
      {
        id: 'a4',
        text: 'Information is validated against workflow rules',
        icon: 'ShieldCheck',
      },
      {
        id: 'a5',
        text: 'ERP-ready data is prepared',
        icon: 'Database',
      },
      {
        id: 'a6',
        text: 'Team reviews exceptions or approvals when required',
        icon: 'FileCheck',
      },
    ],
  },
  {
    id: 'quotation-rfq',
    title: 'Quotation / RFQ',
    icon: 'FileText',
    manualSummary:
      'Teams repeatedly read, search and assemble quotation information.',
    automatedSummary:
      'AI prepares the information so the sales team can focus on pricing and approval.',
    manualSteps: [
      {
        id: 'm1',
        text: 'RFQ arrives by email or document',
        icon: 'Mail',
      },
      {
        id: 'm2',
        text: 'Team reads line items and requirements',
        icon: 'FileText',
      },
      {
        id: 'm3',
        text: 'Product and pricing information is checked',
        icon: 'Search',
      },
      {
        id: 'm4',
        text: 'Availability and commercial details are reviewed',
        icon: 'Clipboard',
      },
      {
        id: 'm5',
        text: 'Quote is prepared manually',
        icon: 'Keyboard',
      },
      {
        id: 'm6',
        text: 'Team performs a final review',
        icon: 'CheckCircle',
      },
    ],
    automatedSteps: [
      {
        id: 'a1',
        text: 'AI reads the RFQ',
        icon: 'Bot',
      },
      {
        id: 'a2',
        text: 'Required products and quantities are identified',
        icon: 'Sparkles',
      },
      {
        id: 'a3',
        text: 'Information is structured for review',
        icon: 'TableProperties',
      },
      {
        id: 'a4',
        text: 'Relevant pricing and product inputs are surfaced',
        icon: 'Search',
      },
      {
        id: 'a5',
        text: 'Draft quotation information is prepared',
        icon: 'FileText',
      },
      {
        id: 'a6',
        text: 'Sales team reviews and finalizes the quotation',
        icon: 'FileCheck',
      },
    ],
  },
  {
    id: 'procurement',
    title: 'Procurement',
    icon: 'ShoppingCart',
    manualSummary:
      'Vendor comparison depends heavily on spreadsheets and repetitive checking.',
    automatedSummary:
      'AI organizes supplier information so purchasing teams can compare and decide faster.',
    manualSteps: [
      {
        id: 'm1',
        text: 'Vendor quotations arrive from multiple suppliers',
        icon: 'Mail',
      },
      {
        id: 'm2',
        text: 'Staff open and organize each quote',
        icon: 'FileText',
      },
      {
        id: 'm3',
        text: 'Pricing is copied into spreadsheets',
        icon: 'TableProperties',
      },
      {
        id: 'm4',
        text: 'Terms and quantities are compared manually',
        icon: 'Search',
      },
      {
        id: 'm5',
        text: 'Differences are checked',
        icon: 'Clipboard',
      },
      {
        id: 'm6',
        text: 'Purchasing team decides the next action',
        icon: 'CheckCircle',
      },
    ],
    automatedSteps: [
      {
        id: 'a1',
        text: 'AI reads incoming vendor quotations',
        icon: 'Bot',
      },
      {
        id: 'a2',
        text: 'Supplier information is structured consistently',
        icon: 'Sparkles',
      },
      {
        id: 'a3',
        text: 'Pricing, terms and quantities are organized',
        icon: 'TableProperties',
      },
      {
        id: 'a4',
        text: 'Important differences are highlighted',
        icon: 'Search',
      },
      {
        id: 'a5',
        text: 'Comparison information is prepared',
        icon: 'Workflow',
      },
      {
        id: 'a6',
        text: 'Purchasing team reviews and makes the decision',
        icon: 'FileCheck',
      },
    ],
  },
  {
    id: 'invoice-data-entry',
    title: 'Invoice / Data Entry',
    icon: 'ReceiptText',
    manualSummary:
      'Staff repeatedly re-enters information that already exists in business documents.',
    automatedSummary:
      'AI turns incoming documents into structured data ready for downstream systems and review.',
    manualSteps: [
      {
        id: 'm1',
        text: 'Invoice or business document arrives',
        icon: 'Mail',
      },
      {
        id: 'm2',
        text: 'Staff opens PDF, Excel or email',
        icon: 'FileText',
      },
      {
        id: 'm3',
        text: 'Required values are identified manually',
        icon: 'Search',
      },
      {
        id: 'm4',
        text: 'Information is copied into ERP or Tally',
        icon: 'Keyboard',
      },
      {
        id: 'm5',
        text: 'Entries are checked for errors',
        icon: 'Clipboard',
      },
      {
        id: 'm6',
        text: 'Missing or incorrect fields are corrected',
        icon: 'CheckCircle',
      },
    ],
    automatedSteps: [
      {
        id: 'a1',
        text: 'AI reads the incoming document',
        icon: 'Bot',
      },
      {
        id: 'a2',
        text: 'Relevant values are extracted',
        icon: 'Sparkles',
      },
      {
        id: 'a3',
        text: 'Information is converted into structured data',
        icon: 'TableProperties',
      },
      {
        id: 'a4',
        text: 'Required fields are validated',
        icon: 'ShieldCheck',
      },
      {
        id: 'a5',
        text: 'ERP/Tally-ready information is prepared',
        icon: 'Database',
      },
      {
        id: 'a6',
        text: 'Team reviews exceptions when necessary',
        icon: 'FileCheck',
      },
    ],
  },
]
