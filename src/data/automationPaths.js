export const automationPaths = [
  {
    id: 'order-data',
    number: '01',
    title: 'Order & Data Automation',
    shortLabel: 'Order & Data',
    description:
      'Automate incoming orders, invoices and repetitive operational data entry.',
    examples: [
      'Order Processing',
      'Invoice / Data Entry',
      'Customer Follow-up',
    ],
    icon: 'FileInput',
    accent: 'blue',
    visualType: 'order-data',
    visual: {
      incoming: {
        label: 'Incoming',
        file: 'Customer_PO_10482.pdf',
        source: 'Email',
      },
      aiLabel: 'AI Processing',
      stages: ['Read Document'],
      fields: ['Customer', 'SKU', 'Quantity', 'Delivery Date'],
      validateLabel: 'Validate',
      output: {
        label: 'ERP Order Ready',
        order: 'SO-10482',
        status: 'Ready for Review',
      },
    },
  },
  {
    id: 'rfq-procurement',
    number: '02',
    title: 'RFQ & Procurement Automation',
    shortLabel: 'RFQ & Procurement',
    description:
      'Speed up quotations, supplier comparison, purchasing and tender-related workflows.',
    examples: [
      'Quotation / RFQ',
      'Purchase / Procurement',
      'Tender Management',
    ],
    icon: 'FileSearch',
    accent: 'violet',
    visualType: 'rfq-procurement',
    visual: {
      incoming: {
        label: 'Incoming',
        file: 'RFQ_September.pdf',
        source: 'Document',
      },
      aiLabel: 'AI Interprets Requirements',
      fields: ['Products', 'Quantity', 'Pricing', 'Delivery', 'Terms'],
      comparisonLabel: 'Supplier Comparison',
      suppliers: ['Supplier A', 'Supplier B', 'Supplier C'],
      output: {
        label: 'Quotation / Purchase Workflow Ready',
      },
    },
  },
  {
    id: 'operations-intelligence',
    number: '03',
    title: 'Operations Intelligence',
    shortLabel: 'Operations',
    description:
      'Turn operational information into faster reporting, inventory visibility and workflow responses.',
    examples: [
      'Production Reporting',
      'Inventory / Reordering',
      'Operational Queries',
    ],
    icon: 'ChartNoAxesCombined',
    accent: 'cyan',
    visualType: 'operations-intelligence',
    visual: {
      sources: ['ERP', 'Excel', 'Operational Data'],
      hubLabel: 'AI Operations',
      outputs: [
        { id: 'production', label: 'Production Report' },
        { id: 'status', label: 'Order Status' },
        { id: 'inventory', label: 'Inventory / Reorder' },
      ],
    },
  },
]
