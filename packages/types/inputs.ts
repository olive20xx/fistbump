export type UserInput = {
  email: string
  fullName?: string
  hashedPw?: string
  title?: string
  isAdmin?: boolean
  photo?: string
  teamName?: string
  companyName?: string
}

export type ReportInput = {
  _id: ReportIdInput
  summary?: string
  status?: string
  reviews?: {
    self?: ReviewInput
    peers?: ReviewInput[]
    manager?: ReviewInput
  }
}

type ReportIdInput = {
  targetId: string
  cycleId: string
}

type ReviewInput = {
  reviewerId: string
  isDeclined?: boolean
  submitted?: boolean
  grades?: GradeInput[]
}

type GradeInput = {
  metric: string
  rating?: number
  maxRating?: number
  comment?: string
}
