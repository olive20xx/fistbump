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
  _id: { target: string, cycle: string }
  remarks: string
  status: string
  reviews: {
    peer: ReviewData[]
    self: ReviewData
  }
}

export type { MetricData, GradeData, ReviewData, UserId, ReportData }
