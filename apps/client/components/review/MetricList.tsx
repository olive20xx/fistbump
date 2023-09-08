'use client'

import { mutations } from '@/lib/graphql-queries'
import { ReviewData } from '@/types/models'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import Submitted from './Submitted'
import Metric from '@/components/review/metric'
import { Button } from '@/components/ui/button'
import ErrorHandler from '../ErrorHandler'

export const revalidate = 0
export const fetchCache = 'force-no-cache'

type MetricListProps = {
  targetId: string
  targetName: string
  reviewData: ReviewData
  isManagerReport?: boolean
}

function MetricList({ targetId, targetName, reviewData, isManagerReport = false }: MetricListProps) {
  const [updateAssignedReview] = useMutation(mutations.UPDATE_ASSIGNED_REVIEW)
  const { submitted, grades, reviewerId } = reviewData
  const [error, setError] = useState(null)

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
      const gradeData = state[i];
      if (gradeData.rating === 0 || gradeData.comment === '') {
        setError({ message: 'Please fill out all ratings and comments.', code: 'Validation Error' })
        return
      }
    }

    try {
      variables.input.grades = state
      variables.input.submitted = true
      const result = await updateAssignedReview({ variables })
      console.log('updated report ID', result)
      setIsSubmitted(true)
    } catch (error) {
      setError({ message: 'An error occurred while submitting the review.', code: 'Submission Error' })
    }
  }

  return isSubmitted ? (
    <div className='w-full'>
      <Submitted isManagerReport={isManagerReport} />
      <div className="p-4 h-full blur-md">
        {error && <ErrorHandler error={error} onClose={() => setError(null)} />}
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
            variant='draft'
            disabled={isSubmitted}
            onClick={handleSaveDraft}
            size="submit"
          >
            Save Draft
          </Button>
          <Button
            variant='black'
            disabled={isSubmitted}
            className={`${isSubmitted ? 'bg-green-500 disabled:opacity-100' : ''
              }`}
            onClick={handleSubmit}
            size="submit"
          >
            {isSubmitted ? 'Submitted' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>

  ) : (
    <div className="p-4 h-full">
      {error && <ErrorHandler error={error} onClose={() => setError(null)} />}
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
          variant='draft'
          disabled={isSubmitted}
          onClick={handleSaveDraft}
          size="submit"
        >
          Save Draft
        </Button>
        <Button
          variant='black'
          disabled={isSubmitted}
          className={`${isSubmitted ? 'bg-green-500 disabled:opacity-100' : ''
            }`}
          onClick={handleSubmit}
          size="submit"
        >
          {isSubmitted ? 'Submitted' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}

export default MetricList