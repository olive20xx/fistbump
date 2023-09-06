import { useState, useEffect } from 'react'
import { ReviewData, UserId } from '@/types/models'


function usePeerReviews(peerReviews: Partial<ReviewData>[]) {


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
    setPeerReviews(peerReviews)
  }, [peerReviews])

  return [toNominate, nominatedIds, setPeerReviews]
}

export default usePeerReviews