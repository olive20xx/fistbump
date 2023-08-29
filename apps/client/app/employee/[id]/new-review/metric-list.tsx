'use client'

import { Button } from '@/components/ui/button'
import Metric from '@/components/ui/metric'
import { ReportData } from '@/types/models'
import { useState } from 'react'
import Link from 'next/link'
import { mutations } from '@/lib/graphql-queries'
import { useMutation } from '@apollo/client'

function SubmittedReview() {
  return (
    <div className="w-1/2 border-2 p-4">
      <div className="mt-10 flex gap-6 justify-center">
        <Button disabled className="bg-green-500 disabled:opacity-100">
          Review submitted!
        </Button>
        <Link href={'/dashboard'}>
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

export default function MetricList({
  report,
  target,
}: {
  report: ReportData
  target: string
}) {
  const [updateReport] = useMutation(mutations.UPDATE_REPORT)

  const targetId = report._id.targetId
  const cycleId = report._id.cycleId
  const review = report.reviews.self
  const { submitted, grades: gradeData, reviewerId } = review
  const [state, setState] = useState(gradeData)
  const [isSubmitted, setIsSubmitted] = useState(submitted)

  const mutationVars = {
    targetId: targetId,
    cycleId: cycleId,
    input: report,
  }

  const handleRatingClick = (n: number, name: string) => {
    const updatedState = [...state]
    const gradeIndex = updatedState.findIndex((obj) => obj.metric === name)
    const grade = updatedState[gradeIndex]
    grade.rating = n
    setState(updatedState)
  }

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedState = [...state]
    const gradeIndex = updatedState.findIndex(
      (obj) => obj.metric === event.target.name
    )
    const grade = updatedState[gradeIndex]
    grade.comment = event.target.value
    setState(updatedState)
  }

  const handleSubmit = async () => {
    for (let i = 0; i < state.length; i++) {
      const gradeData = state[i]
      if (gradeData.rating === 0 || gradeData.comment === '') return
    }
    mutationVars.input.reviews.self.grades = state
    mutationVars.input.reviews.self.submitted = true
    console.log('🩷mutationvars', mutationVars)
    await updateReport({ variables: mutationVars })
    setIsSubmitted(true)
  }

  const handleSaveDraft = async () => {
    mutationVars.input.reviews.self.grades = state
    await updateReport({ variables: mutationVars })
  }

  return isSubmitted ? (
    <SubmittedReview />
  ) : (
    <div className="w-1/2 border-2 p-4">
      {state.map((datum) => {
        return (
          <Metric
            key={datum.metric}
            question={`How did ${target} do on ${datum.metric}?`}
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
          className={`w-36 ${
            isSubmitted ? 'bg-green-500 disabled:opacity-100' : ''
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
