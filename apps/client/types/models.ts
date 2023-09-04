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
  isDeclined: boolean
}

type ReviewsData = {
  peers: ReviewData[]
  self: ReviewData
  manager: ReviewData
}

type ReportData = {
  _id: { targetId: string; cycleId: string }
  summary: string
  status: string
  reviews: ReviewsData
}

type UserId = string

type UserData = {
  _id: UserId
  email: string
  fullName: string
  hashedPw: string
  title: string
  isAdmin: boolean
  photo: string
  teamName: string
  companyName: string
}

type CycleData = {
  _id: string
  title: string
  startDate: string
  endDate: string
  peersPerTarget: number
  nominationDeadline: string
  reviewDeadline: string
  reportDeadline: string
}

export type {
  GradeData,
  ReviewData,
  ReviewsData,
  ReportData,
  UserId,
  UserData,
  CycleData,
}
