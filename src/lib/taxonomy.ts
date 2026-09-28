/**
 * Fixed vocabularies shared by the content schemas and the UI.
 * Adding a value here makes it valid in content files and gives it a label.
 */
export const PERSON_ROLES = ['pi', 'postdoc', 'phd', 'ms', 'bs', 'alumni'] as const;
export type PersonRole = (typeof PERSON_ROLES)[number];

/** Team page section order, headings and default status line per role. */
export const ROLE_INFO: Record<PersonRole, { heading: string; status: string }> = {
  pi: { heading: 'Principal Investigator', status: 'Principal Investigator' },
  postdoc: { heading: 'Postdoctoral Researchers', status: 'Postdoctoral Researcher' },
  phd: { heading: 'PhD Researchers', status: 'PhD Student' },
  ms: { heading: 'MS Researchers', status: 'MS Student' },
  bs: { heading: 'Undergraduate Researchers', status: 'Undergraduate Researcher' },
  alumni: { heading: 'Alumni', status: 'Alumni' },
};

export const PROJECT_STATUSES = ['current', 'completed'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export const STATUS_LABELS: Record<ProjectStatus, string> = {
  current: 'Current',
  completed: 'Completed',
};

export const NEWS_CATEGORIES = [
  'Publications',
  'Awards',
  'Conferences',
  'Student News',
  'Research',
  'Lab Updates',
] as const;

export const PUBLICATION_TYPES = [
  'journal',
  'conference',
  'thesis',
  'report',
  'book',
  'preprint',
  'other',
] as const;
export const PUBLICATION_TYPE_LABELS: Record<(typeof PUBLICATION_TYPES)[number], string> = {
  journal: 'Journal article',
  conference: 'Conference paper',
  thesis: 'Thesis',
  report: 'Technical report',
  book: 'Book / chapter',
  preprint: 'Preprint',
  other: 'Publication',
};

/** Filter/grouping bucket for projects without a research area. */
export const OTHER_AREA = { id: 'other', title: 'Other' } as const;
