import { ReviewData } from '../apps/client/types/models'
import { ReviewModel } from './types/models'

type ReviewType = ReviewData | ReviewModel

export function findReviewByReviewerId<ReviewType>(review: ReviewType) {}
