import { Schema, model } from 'mongoose'
import { modelTypes } from '@fistbump/fistbump-types'

const GradeSchema = new Schema<modelTypes.GradeModel>({
  metric: String,
  // rating === 0 when not graded
  rating: Number,
  maxRating: Number,
  comment: String,
})

// In the schema, use 'Schema.Types.ObjectId' when defining a property
// but in a type declaration, use 'mongoose.Types.ObjectId'
const ReviewSchema = new Schema<modelTypes.ReviewModel>(
  {
    reviewerId: Schema.Types.ObjectId,
    submitted: Boolean,
    grades: [GradeSchema],
  },
  //* timestamps automatically creates createdAt and updatedAt properties
  { timestamps: true }
)

const ReportSchema = new Schema<modelTypes.ReportModel>(
  {
    _id: { targetId: Schema.Types.ObjectId, cycleId: Schema.Types.ObjectId },
    summary: String,
    status: String,
    reviews: {
      peers: [ReviewSchema],
      self: ReviewSchema,
      manager: ReviewSchema,
    },
  },
  //* timestamps automatically creates createdAt and updatedAt properties
  { timestamps: true }
)

const Report = model<modelTypes.ReportModel>('Report', ReportSchema)

export default Report
