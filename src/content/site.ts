// Shared website content from the "Final Website Architecture" and
// "Shared Website Content" parts of the approved document. Visible strings are
// verbatim; routes and keys are implementation data.

export interface NavLinkItem {
  label: string
  to: string
  /** One-line description shown in the desktop dropdown. */
  note?: string
}

export interface NavGroup {
  /** Optional sub-heading inside a dropdown panel. */
  heading?: string
  links: NavLinkItem[]
}

export interface NavItem {
  label: string
  to: string
  groups?: NavGroup[]
}

/**
 * Primary navigation — source: docx "Primary navigation" table (labels,
 * destinations and dropdown content). Dropdown notes are each page's
 * "Primary role" from the "Final Website Architecture" table.
 */
export const primaryNav: NavItem[] = [
  {
    label: 'Product',
    to: '/product',
    groups: [{
      links: [
        { label: 'Product overview', to: '/product', note: 'Product workflow and boundaries' },
        { label: 'Features', to: '/features', note: 'Complete capability overview' },
        { label: 'Enterprise', to: '/enterprise', note: 'Enterprise evaluation and controls' },
      ],
    }],
  },
  {
    label: 'Manufacturing',
    to: '/manufacturing',
    groups: [
      {
        links: [{ label: 'Manufacturing overview', to: '/manufacturing', note: 'Manufacturing sectors and handoffs' }],
      },
      {
        heading: 'Sectors',
        links: [
          { label: 'Custom machinery and equipment', to: '/manufacturing#custom-machinery-and-equipment' },
          { label: 'Precision machining and contract manufacturing', to: '/manufacturing#precision-machining-and-contract-manufacturing' },
          { label: 'Fabrication and tooling', to: '/manufacturing#fabrication-and-tooling' },
          { label: 'Automotive and aerospace suppliers', to: '/manufacturing#automotive-and-aerospace-suppliers' },
        ],
      },
    ],
  },
  {
    label: 'Use Cases',
    to: '/use-cases',
    groups: [{
      links: [
        { label: 'Engineering review', to: '/use-cases/engineering-drawing-review', note: 'Design and engineering review' },
        { label: 'Revision review', to: '/use-cases/drawing-revision-review', note: 'Revision comparison and change context' },
        { label: 'External review', to: '/use-cases/external-drawing-review', note: 'External drawing collaboration' },
        { label: 'Production and quality handoff', to: '/use-cases/production-quality-handoff', note: 'Downstream handoff and review' },
      ],
    }],
  },
  {
    label: 'Resources',
    to: '/resources',
    groups: [
      {
        heading: 'Guides',
        links: [
          { label: 'Revision Control Guide', to: '/resources/engineering-drawing-revision-control', note: 'Educational search page' },
          { label: 'Supplier Review Guide', to: '/resources/supplier-drawing-review-guide', note: 'External review guidance' },
          { label: 'AI in Drawing Review', to: '/resources/ai-engineering-drawing-review', note: 'AI education and boundaries' },
        ],
      },
      {
        links: [
          { label: 'Checklist', to: '/resources/drawing-readiness-checklist', note: 'Practical checklist' },
          { label: 'Comparison', to: '/compare/pdm-vs-drawing-collaboration', note: 'Commercial comparison' },
          { label: 'Worked example', to: '/resources/drawing-review-example', note: 'Product education and proof' },
        ],
      },
    ],
  },
  { label: 'Pricing', to: '/pricing' },
  {
    label: 'Company',
    to: '/company',
    groups: [{
      links: [
        { label: 'Company', to: '/company', note: 'Company and product principles' },
        { label: 'Contact', to: '/contact', note: 'Enquiry and demo conversion' },
      ],
    }],
  },
]

export const headerActions = {
  signIn: { label: 'Sign in', to: '{{app.signin_url}}' },
  startFree: { label: 'Start free', to: '{{app.signup_url}}' },
}

/** Footer — source: docx "Footer". */
export const footer = {
  brand: 'VizeDraw',
  tagline: 'Keep the knowledge behind every drawing connected from design to execution.',
  columns: [
    {
      heading: 'Product',
      links: [
        { label: 'Product', to: '/product' },
        { label: 'Features', to: '/features' },
        { label: 'Manufacturing', to: '/manufacturing' },
        { label: 'Use Cases', to: '/use-cases' },
        { label: 'Pricing', to: '/pricing' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Resources', to: '/resources' },
        { label: 'Drawing Knowledge', to: '/drawing-knowledge' },
        { label: 'Revision Control Guide', to: '/resources/engineering-drawing-revision-control' },
        { label: 'Worked Review Example', to: '/resources/drawing-review-example' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'Company', to: '/company' },
        { label: 'Contact', to: '/contact' },
        { label: 'Enterprise', to: '/enterprise' },
      ],
    },
  ],
  legal: [
    { label: 'Privacy Notice', key: 'privacy' },
    { label: 'Terms of Use', key: 'terms' },
    { label: 'Cookie Preferences', key: 'cookies' },
  ] as const,
  copyright: 'Copyright {{current_year}} Zenitude. All rights reserved.',
}

/** Contact email addresses shown on the Contact page. */
export const contactEmails = [
  { label: 'Sales', email: 'sales@vizedraw.com' },
  { label: 'Support', email: 'support@vizedraw.com' },
  { label: 'Company', email: 'hello@zenitude.com' },
]

/** Utility states — source: docx "Utility states" table. */
export const utility = {
  thankYou: {
    copy: 'Request received. Thank you for describing your drawing workflow. The VizeDraw team will contact you to confirm the discussion.',
    action: { label: 'Explore the worked example', to: '/resources/drawing-review-example' },
  },
  notFound: {
    copy: 'This page is not available. The link may have changed. Return to the product overview or explore the manufacturing drawing workflows.',
    action: { label: 'Product overview', to: '/product' },
  },
  requiredField: 'Please complete this field.',
  invalidEmail: 'Enter a valid email address so we can respond.',
  submissionError: 'Your request could not be sent. Please try again.',
  noResults: {
    copy: 'No resources match your search. Try a topic such as revisions, supplier review or handoff.',
    action: { label: 'Return to all resources', to: '/resources' },
  },
}

/** Page names and routes — source: docx "Final Website Architecture" table. */
export const architecture: { id: string; name: string; route: string; role: string }[] = [
  { id: '01', name: 'Homepage', route: '/', role: 'Positioning and primary conversion' },
  { id: '02', name: 'Product', route: '/product', role: 'Product workflow and boundaries' },
  { id: '03', name: 'Manufacturing', route: '/manufacturing', role: 'Manufacturing sectors and handoffs' },
  { id: '04', name: 'Use Cases', route: '/use-cases', role: 'Use-case selection hub' },
  { id: '05', name: 'Engineering Drawing Review', route: '/use-cases/engineering-drawing-review', role: 'Design and engineering review' },
  { id: '06', name: 'Drawing Revision Review', route: '/use-cases/drawing-revision-review', role: 'Revision comparison and change context' },
  { id: '07', name: 'Supplier and Customer Review', route: '/use-cases/external-drawing-review', role: 'External drawing collaboration' },
  { id: '08', name: 'Production and Quality Handoff', route: '/use-cases/production-quality-handoff', role: 'Downstream handoff and review' },
  { id: '09', name: 'Features', route: '/features', role: 'Complete capability overview' },
  { id: '10', name: 'Enterprise and Security', route: '/enterprise', role: 'Enterprise evaluation and controls' },
  { id: '11', name: 'Drawing Knowledge', route: '/drawing-knowledge', role: 'Category education and differentiation' },
  { id: '12', name: 'Resources', route: '/resources', role: 'Resource discovery hub' },
  { id: '13', name: 'Drawing Readiness Checklist', route: '/resources/drawing-readiness-checklist', role: 'Practical checklist' },
  { id: '14', name: 'Revision Control Guide', route: '/resources/engineering-drawing-revision-control', role: 'Educational search page' },
  { id: '15', name: 'Supplier Review Guide', route: '/resources/supplier-drawing-review-guide', role: 'External review guidance' },
  { id: '16', name: 'AI in Drawing Review', route: '/resources/ai-engineering-drawing-review', role: 'AI education and boundaries' },
  { id: '17', name: 'PDM Versus Drawing Collaboration', route: '/compare/pdm-vs-drawing-collaboration', role: 'Commercial comparison' },
  { id: '18', name: 'Worked Review Example', route: '/resources/drawing-review-example', role: 'Product education and proof' },
  { id: '19', name: 'Pricing', route: '/pricing', role: 'Plan selection' },
  { id: '20', name: 'Company', route: '/company', role: 'Company and product principles' },
  { id: '21', name: 'Contact and Demo', route: '/contact', role: 'Enquiry and demo conversion' },
]
