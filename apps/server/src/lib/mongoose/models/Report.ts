import mongoose, { Schema, model } from 'mongoose'

export type IGrade = {
  metric: string
  rating: number
  maxRating: number
  comment: string
}

export type IReview = {
  reviewer: mongoose.Types.ObjectId
  isDeclined: boolean
  submitted: boolean
  grades: IGrade[]
}

export type IReport = {
  _id: { target: mongoose.Types.ObjectId; cycle: mongoose.Types.ObjectId }
  remarks: string
  status: string
  reviews: {
    peer: IReview[]
    self: IReview
  }
}

const GradeSchema = new Schema<IGrade>({
  metric: String,
  rating: Number,
  maxRating: Number,
  comment: String,
})

const ReviewSchema = new Schema<IReview>(
  {
    // I have no idea why this has to spell out 'Schema.Types.ObjectId'
    // but in a type declaration, I can just use 'ObjectId'
    reviewer: Schema.Types.ObjectId,
    submitted: Boolean,
    grades: [GradeSchema],
  },
  //* Set createdAt and updatedAt
  { timestamps: true }
)

const ReportSchema = new Schema<IReport>(
  {
    _id: { target: Schema.Types.ObjectId, cycle: Schema.Types.ObjectId },
    remarks: String,
    status: String,
    reviews: {
      peer: [ReviewSchema],
      self: ReviewSchema,
    },
  },
  // Set createdAt and updatedAt
  { timestamps: true }
)

const Report = model<IReport>('Report', ReportSchema)

export default Report
