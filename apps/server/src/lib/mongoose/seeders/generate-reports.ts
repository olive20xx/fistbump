import faker from './faker'
import { IGrade, IReport, IReview } from '../models/Report'
import mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId

function generateGrades(count: number, maxRating: number) {
  const grades: IGrade[] = []
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
    const grade: IGrade = {
      metric: metrics[i],
      rating: faker.number.int({ min: 1, max: maxRating }),
      maxRating: maxRating,
      comment: faker.lorem.lines({ min: 1, max: 3 }),
    }

    grades.push(grade)
  }

  return grades
}

function generateReview(
  reviewer: ObjectId,
  metricCount: number,
  maxRating: number
) {
  const review: IReview = {
    reviewer: reviewer,
    isDeclined: false,
    submitted: faker.datatype.boolean(),
    grades: generateGrades(metricCount, maxRating),
  }
  return review
}

function generateReport(
  target: ObjectId,
  cycle: ObjectId,
  reviewers: ObjectId[],
  metricCount: number,
  maxRating: number
) {
  const peerReviews: IReview[] = []
  for (let i = 0; i < reviewers.length; i++) {
    const reviewerId = reviewers[i]
    const review = generateReview(reviewerId, metricCount, maxRating)
    peerReviews.push(review)
  }

  const report: IReport = {
    _id: { target, cycle },
    remarks: faker.lorem.paragraph({ min: 2, max: 4 }),
    status: faker.helpers.arrayElement([
      'Nomination',
      'Review',
      'Report',
      'Completed',
    ]),
    reviews: {
      peer: peerReviews,
      self: generateReview(target, metricCount, maxRating),
    },
  }

  return report
}

export default generateReport
