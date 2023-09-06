import { useState, useEffect } from 'react'
import { ReviewData, UserId } from '@/types/models'


type ReturnValues = [
  toNominate: number,
  nominatedIds: string[],
  setPeerReview: (peerReviews: Partial<ReviewData>[]) => void
]

function usePeerReviews(initialValue: Partial<ReviewData>[]): ReturnValues {
  const [toNominate, setToNominate] = useState<number>()
  const [nominatedIds, setNominatedIds] = useState<UserId[]>()

  const setPeerReviews = (peerReviews: Partial<ReviewData>[]) => {
    let toNominateCount = 0
    const assignedIds = []
    peerReviews.forEach((review) => {
      if (review.reviewerId === null) toNominateCount++
      else assignedIds.push(review.reviewerId)
    })

    setToNominate(toNominateCount)
    setNominatedIds(assignedIds)
  }

  useEffect(() => {
    setPeerReviews(initialValue)
  }, [initialValue])

  return [toNominate, nominatedIds, setPeerReviews]
}

export default usePeerReviews