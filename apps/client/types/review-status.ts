export const REVIEW_STATUS = {
  READY: 'ready',
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
} as const

export type ReviewStatus = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS]
