export type ReportInput = {
  _id: ReportId
  remarks: string
  status: string
  reviews: {
    self: Review
    peer: Review[]
  }
}

type ReportId = {
  target: string
  cycle: string
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
