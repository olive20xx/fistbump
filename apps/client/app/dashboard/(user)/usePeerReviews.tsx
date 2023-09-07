import { useState, useEffect } from 'react'
import { UserId } from '@/types/models'
import { Review } from '@/src/__generated__/graphql'


type ReturnValues = [
  toNominate: number,
  nominatedIds: string[],
  setPeerReview: (peerReviews: Partial<Review>[]) => void
]

function usePeerReviews(initialValue: Partial<Review>[]): ReturnValues {
  const [toNominate, setToNominate] = useState<number>()
  const [nominatedIds, setNominatedIds] = useState<UserId[]>()

  const setPeerReviews = (peerReviews: Partial<Review>[]) => {
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