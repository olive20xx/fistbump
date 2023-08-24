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

export type { MetricData, GradeData, ReviewData, UserId }
