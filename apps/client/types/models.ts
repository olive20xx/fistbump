type MetricData = {
  id: string
  rating: number
  comment: string
}

type GradeData = {
  metric: string
  rating: number
  maxRating: number
  comment: string
}

type ReviewData = {
  submitted: boolean
  reviewerId: string
  grades: GradeData[]
}

type ReviewsData = {
  peers: ReviewData[]
  self: ReviewData
  manager: ReviewData
}

type UserId = string

type ReportData = {
  _id: { targetId: string; cycleId: string }
  summary: string
  status: string
  reviews: ReviewsData
}

export type {
  MetricData,
  GradeData,
  ReviewData,
  ReviewsData,
  UserId,
  ReportData,
}
