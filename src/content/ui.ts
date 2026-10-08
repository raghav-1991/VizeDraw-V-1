// Interface microcopy that is not part of the approved content document
// (control labels, accessible names). Page copy lives in pages.ts and site.ts.

export const uiCopy = {
  pendingDialog: {
    title: 'Continue to VizeDraw',
    body: (label: string) => `“${label}” opens the VizeDraw application.`,
    unavailable: 'The application address has not been configured for this environment yet.',
    keyLabel: 'Configuration key',
    close: 'Close',
  },
  legalDialog: {
    unavailable: (label: string) => `The ${label} has not been published for this environment yet.`,
    keyLabel: 'Configuration key',
    close: 'Close',
  },
  form: {
    sending: 'Sending…',
    required: 'required',
    choose: 'Choose…',
  },
  checklist: {
    print: 'Print checklist',
    clear: 'Clear ticks',
    outcomeLegend: 'Record the readiness result',
  },
  resources: {
    searchLabel: 'Search resources',
    filterLabel: 'Filter by type',
    all: 'All',
    results: (n: number) => `${n} ${n === 1 ? 'resource' : 'resources'}`,
  },
  onThisPage: 'On this page',
  breadcrumbHome: 'Home',
  skip: 'Skip to content',
  menu: 'Menu',
  close: 'Close',
}
