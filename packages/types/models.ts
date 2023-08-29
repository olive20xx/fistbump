import mongoose from 'mongoose'

export type GradeModel = {
  metric: string
  rating: number
  maxRating: number
  comment: string
}

export type ReviewModel = {
  reviewerId: mongoose.Types.ObjectId
  isDeclined: boolean
  submitted: boolean
  grades: GradeModel[]
}

export type ReportModel = {
  _id: ReportId
  summary: string
  status: string
  reviews: {
    peers: ReviewModel[]
    self: ReviewModel
    manager: ReviewModel
  }
}

export type ReportId = {
  targetId: mongoose.Types.ObjectId
  cycleId: string
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
 
