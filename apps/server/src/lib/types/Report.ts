export type ReportInput = {
  id: ReportId
  remarks: string
  status: string
  reviews: {
    self: Review
    peer: Review[]
  }
}

type ReportId = {
  targetId: string
  cycleId: string
}

type Review = {
  reviwer: string
  isDeclined: boolean
  submitted: boolean
  grades: Grade[]
}

type Grade = {
  metric: string
  rating: number
  maxRating: number
  comment: string
}
