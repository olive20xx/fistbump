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
  reviewer: string
  grades: GradeData[]
}

type UserId = string

type ReportData = {
  _id: { targetId: string; cycleId: string }
  summary: string
  status: string
  reviews: {
    peers: ReviewData[]
    self: ReviewData
    manager: ReviewData
  }
}

export type { MetricData, GradeData, ReviewData, UserId, ReportData }
