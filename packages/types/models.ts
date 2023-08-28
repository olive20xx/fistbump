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
    manager: ReportModel
  }
}

export type ReportId = {
  targetId: mongoose.Types.ObjectId;
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
