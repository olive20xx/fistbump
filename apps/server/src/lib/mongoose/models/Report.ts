import { Schema, model } from 'mongoose'
import {
  GradeModel,
  ReviewModel,
  ReportModel,
} from '../../../../../../packages/types/models'

const GradeSchema = new Schema<GradeModel>({
  metric: String,
  // rating === 0 when not graded
  rating: Number,
  maxRating: Number,
  comment: String,
})

// In the schema, use 'Schema.Types.ObjectId' when defining a property
// but in a type declaration, use 'mongoose.Types.ObjectId'
const ReviewSchema = new Schema<ReviewModel>(
  {
    reviewerId: Schema.Types.ObjectId,
    submitted: Boolean,
    grades: [GradeSchema],
  },
  //* timestamps automatically creates createdAt and updatedAt properties
  { timestamps: true }
)

const ReportSchema = new Schema<ReportModel>(
  {
    _id: { targetId: Schema.Types.ObjectId, cycleId: String },
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

const Report = model<ReportModel>('Report', ReportSchema)

export default Report
