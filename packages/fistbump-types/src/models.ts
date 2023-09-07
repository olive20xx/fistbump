import mongoose from 'mongoose'

export const REPORT_STATUS = {
  NOMINATION: 'Nomination',
  REVIEW: 'Review',
  REPORT: 'Report',
  COMPLETE: 'Complete',
} as const

export type ReportStatus = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS]

export type GradeModel = {
  metric: string
  rating: number
  maxRating: number
  comment: string
}

export type ReviewModel = {
  reviewerId: mongoose.Types.ObjectId | null
  isDeclined: boolean
  submitted: boolean
  grades: GradeModel[]
}

export type ReviewsModel = {
  peers: ReviewModel[]
  self: ReviewModel
  manager: ReviewModel
}

export type ReportModel = {
  _id: ReportId
  summary: string
  status: ReportStatus
  reviews: ReviewsModel
}

export type ReportId = {
  targetId: mongoose.Types.ObjectId
  cycleId: mongoose.Types.ObjectId
}

export type UserModel = {
  email: string
  fullName: string
  hashedPw: string
  title: string
  isAdmin: boolean
  photo: string
  teamName: string
  companyName: string
}

export type TeamModel = {
  name: string
  managerId: mongoose.Types.ObjectId
}

export type CycleModel = {
  title: string
  startDate: Date
  endDate: Date
  peersPerTarget: number
  nominationDeadline: Date
  reviewDeadline: Date
  reportDeadline: Date
}

export const ObjectId = mongoose.Types.ObjectId
