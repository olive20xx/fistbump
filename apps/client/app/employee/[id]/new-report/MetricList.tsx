'use client'

import { mutations } from '@/lib/graphql-queries'
import { ReviewData } from '@/types/models'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import SubmittedReport from './SubmittedReport'
import Metric from '@/components/ui/metric'
import { Button } from '@/components/ui/button'

type MetricListProps = {
  targetId: string
  targetName: string
  reviewData: ReviewData
}

function MetricList({ targetId, targetName, reviewData }: MetricListProps) {
  const [updateAssignedReview] = useMutation(mutations.UPDATE_ASSIGNED_REVIEW)
  const { submitted, grades, reviewerId } = reviewData
  console.log('submitted', submitted)
  const [state, setState] = useState(grades)
  const [isSubmitted, setIsSubmitted] = useState(submitted)

  const variables = {
    targetId,
    input: reviewData,
  }

  const [targetFirstName] = targetName.split(' ')
  const isSelfReview = targetId === reviewerId

  function handleRatingClick(rating: number, metricName: string) {
    const updatedState = [...state]
    const grade = updatedState.find((gradeData) => gradeData.metric === metricName)

    grade.rating = rating
    setState(updatedState)
  }

  function handleCommentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const metricName = event.target.name
    const comment = event.target.value

    const updatedState = [...state]
    const grade = updatedState.find((gradeData) => gradeData.metric === metricName)

    grade.comment = comment
    setState(updatedState)
  }

  const handleSaveDraft = async () => {
    variables.input.grades = state
    console.log(variables)
    const result = await updateAssignedReview({ variables })
    console.log('updated report ID', result)
  }

  async function handleSubmit() {
    for (let i = 0; i < state.length; i++) {
      const gradeData = state[i]
      if (gradeData.rating === 0 || gradeData.comment === '') return
    }
    variables.input.grades = state
    variables.input.submitted = true
    const result = await updateAssignedReview({ variables })
    console.log('updated report ID', result)
    setIsSubmitted(true)
  }

  return isSubmitted ? (
    <SubmittedReport />
  ) : (
    <div className="p-4">
      {state.map((datum) => {
        return (
          <Metric
            key={datum.metric}
            question={`How did ${isSelfReview ? 'you' : targetFirstName} do on ${datum.metric}?`}
            name={datum.metric}
            value={datum.comment}
            rating={datum.rating}
            maxRating={datum.maxRating}
            onChange={handleCommentChange}
            onClick={handleRatingClick}
          />
        )
      })}
      <div className="gap-6 flex justify-center">
        <Button
          disabled={isSubmitted}
          className="w-36"
          onClick={handleSaveDraft}
          size="lg"
        >
          Save Draft
        </Button>
        <Button
          disabled={isSubmitted}
          className={`w-36 ${isSubmitted ? 'bg-green-500 disabled:opacity-100' : ''
            }`}
          onClick={handleSubmit}
          size="lg"
        >
          {isSubmitted ? 'Submitted' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}

export default MetricList