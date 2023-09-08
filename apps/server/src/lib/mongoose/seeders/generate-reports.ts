import faker from './faker'
import { modelTypes } from '../../../types/export'
import { UserDoc, ObjectId } from './types'

const NUMBER_OF_METRICS = 3

const METRICS = faker.helpers.arrayElements(
  [
    'Karate Kicks',
    'Coding',
    'Cooking',
    'Volleyball',
    'Skating',
    'Crime',
    'Being From Cuba',
    'Power',
    'Agility',
    'Endurance',
    'Charm',
    'Spellcasting',
    'Storytelling',
    'Futbol',
    'Handstands',
  ],
  NUMBER_OF_METRICS
)

function generateGrades(count: number, maxRating: number, isFilled: boolean) {
  const grades: modelTypes.GradeModel[] = []

  for (let i = 0; i < count; i++) {
    const grade: modelTypes.GradeModel = {
      metric: METRICS[i],
      rating: isFilled ? faker.number.int({ min: 1, max: maxRating }) : 0,
      maxRating: maxRating,
      comment: isFilled ? faker.lorem.lines({ min: 1, max: 3 }) : '',
    }

    grades.push(grade)
  }

  return grades
}

function generateReview(
  metricCount: number,
  maxRating: number,
  reviewerId: ObjectId | null = null,
  isGraded: boolean = false
) {
  const review: modelTypes.ReviewModel = {
    reviewerId,
    isDeclined: false,
    submitted: isGraded,
    grades: generateGrades(metricCount, maxRating, isGraded),
  }
  return review
}

export function generateEmptyReport(
  targetId: ObjectId,
  cycleId: ObjectId,
  managerId: ObjectId,
  peersPerTarget: number,
  metricCount: number,
  maxRating: number
) {
  const peers: modelTypes.ReviewModel[] = []
  for (let i = 0; i < peersPerTarget; i++) {
    const review = generateReview(metricCount, maxRating)
    peers.push(review)
  }

  const report: modelTypes.ReportModel = {
    _id: { targetId, cycleId },
    summary: '',
    status: 'Nomination',
    reviews: {
      peers,
      self: generateReview(metricCount, maxRating, targetId),
      manager: generateReview(metricCount, maxRating, managerId),
    },
  }
  report.reviews.self.reviewerId = targetId
  return report
}

export function generateRandomReport(
  targetId: ObjectId,
  cycleId: ObjectId,
  managerId: ObjectId,
  reviewers: ObjectId[],
  metricCount: number,
  maxRating: number,
  areReviewsEmpty: boolean
) {
  const peerReviews: modelTypes.ReviewModel[] = []
  for (let i = 0; i < reviewers.length; i++) {
    const reviewerId = reviewers[i]
    const review = generateReview(
      metricCount,
      maxRating,
      reviewerId,
      areReviewsEmpty
    )
    peerReviews.push(review)
  }

  const report: modelTypes.ReportModel = {
    _id: { targetId, cycleId },
    summary: faker.lorem.paragraph({ min: 2, max: 4 }),
    status: faker.helpers.objectValue(modelTypes.REPORT_STATUS),
    reviews: {
      peers: peerReviews,
      self: generateReview(metricCount, maxRating, targetId),
      manager: generateReview(metricCount, maxRating, managerId),
    },
  }

  return report
}

export function pickRandomReviewers(
  targetId: ObjectId,
  users: UserDoc[],
  reviewerCount: number
) {
  const reviewers: ObjectId[] = []

  while (reviewers.length < reviewerCount) {
    const i = getRandomInt(users.length - 1)
    const user = users[i]
    if (user._id !== targetId) reviewers.push(user._id)
  }

  return reviewers
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}
