import { Schema, model, Date, ObjectId, now } from 'mongoose'
import User from './User'

type Grade = {
  metric: string
  rating: number
  maxRating: number
  comment: string
}

type Review = {
  reviewer: ObjectId
  createdAt: Date
  updatedAt: Date
  isDeclined: boolean
  submitted: boolean
  grades: Grade[]
}

type Report = {
  _id: { target: ObjectId; cycle: ObjectId }
  remarks: string
  status: string
  reviews: {
    peer: Review[]
    self: Review
  }
}

const GradeSchema = new Schema({
  metric: String,
  rating: Number,
  maxRating: Number,
  comment: String,
})

const ReviewSchema = new Schema(
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

const ReportSchema = new Schema(
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

const Report = model<Report>('Report', ReportSchema)

export default Report
