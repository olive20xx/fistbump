import faker from './faker'
import {
  GradeModel,
  ReviewModel,
  ReportModel,
} from '../../../../../../packages/types/models'
 
import mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId

function generateGrades(count: number, maxRating: number, isFilled: boolean) {
  const grades: GradeModel[] = []
  const metrics = faker.helpers.arrayElements(
    [
      'Looks',
      'Coding',
      'Punctuality',
      'Cooking',
      'Volleyball',
      'Skating',
      'Crime',
      'Being From Cuba',
      'Raw Power',
      'Animal Magnetism',
    ],
    count
  )

  for (let i = 0; i < count; i++) {
    const grade: GradeModel = {
      metric: metrics[i],
      rating: isFilled ? faker.number.int({ min: 1, max: maxRating }) : 0,
      maxRating: maxRating,
      comment: isFilled ? faker.lorem.lines({ min: 1, max: 3 }) : '',
    }

    grades.push(grade)
  }

  return grades
}

function generateReview(
  reviewerId: ObjectId,
  metricCount: number,
  maxRating: number,
  isGraded: boolean = false
) {
  const review: ReviewModel = {
    reviewerId: reviewerId,
    isDeclined: false,
    submitted: isGraded,
    grades: generateGrades(metricCount, maxRating, isGraded),
  }
  return review
}

function generateReport(
  targetId: ObjectId,
  cycleId: string,
  managerId: ObjectId,
  reviewers: ObjectId[],
  metricCount: number,
  maxRating: number,
  areReviewsEmpty: boolean
) {
  const peerReviews: ReviewModel[] = []
  for (let i = 0; i < reviewers.length; i++) {
    const reviewerId = reviewers[i]
    const review = generateReview(
      reviewerId,
      metricCount,
      maxRating,
      areReviewsEmpty
    )
    peerReviews.push(review)
  }

  const report: ReportModel = {
    _id: { targetId, cycleId },
    summary: faker.lorem.paragraph({ min: 2, max: 4 }),
    status: faker.helpers.arrayElement([
      'Nomination',
      'Review',
      'Report',
      'Completed',
    ]),
    reviews: {
      peers: peerReviews,
      self: generateReview(targetId, metricCount, maxRating),
      manager: generateReview(managerId, metricCount, maxRating),
 
    },
  }

  return report
}

export default generateReport
