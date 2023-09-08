import { Schema, model } from 'mongoose'
import { modelTypes } from '../../../types/export'
import { ReportDoc } from '@/types/mongo-docs'

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

//TODO this should be a in ReportSchema.methods I think
//TODO fix this
// export async function updateReportStatus(report: ReportDoc) {
//   const reviews = report.reviews

//   console.log('manager.submitted ====== ', reviews.manager.submitted)
//   if (reviews.manager.submitted) report.status = 'Complete'

//   const arePeerReviewsSubmitted = reviews.peers.every(
//     (review) => review.submitted
//   )
//   const isSelfReviewSubmitted = reviews.self.submitted

//   if (
//     report.status !== 'Complete' &&
//     arePeerReviewsSubmitted &&
//     isSelfReviewSubmitted
//   )
//     report.status = 'Report'
//   else if (reviews.peers.every((review) => review.reviewerId !== null))
//     report.status = 'Review'
// }

const Report = model<modelTypes.ReportModel>('Report', ReportSchema)

export default Report
