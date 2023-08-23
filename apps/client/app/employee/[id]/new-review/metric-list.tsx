'use client'

import { Button } from '@/components/ui/button'
import Metric from '@/components/ui/metric'
import { GradeData } from '@/types/models'

export default function MetricList({
  submitted,
  gradeData,
  target,
}: {
  submitted: boolean
  gradeData: GradeData[]
  target: string
}) {
  const handleClick = (n: number) => {
    console.log('number from handleclick', n)
  }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value)
    console.log(event.target.name)
    // const updatedState = { ...state }
    // updatedState
  }
  const handleSubmit = () => {
    console.log('handle submit button')
  }
  const handleSaveDraft = () => {
    console.log('handle save draft button')
  }

  return (
    <div className={`w-1/2 border-2 p-4`}>
      {gradeData.map((datum) => {
        return (
          <Metric
            key={datum.metric}
            question={`How did ${target} do on ${datum.metric}?`}
            name={datum.metric}
            value={datum.comment}
            maxRating={datum.maxRating}
            onChange={handleChange}
            onClick={handleClick}
          />
        )
      })}
      <div className="gap-6 flex justify-center">
        <Button className="w-36" onClick={handleSubmit} size="lg">
          Save Draft
        </Button>
        <Button className="w-36" onClick={handleSaveDraft} size="lg">
          Submit
        </Button>
      </div>
    </div>
  )
}
