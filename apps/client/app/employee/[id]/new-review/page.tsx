'use client'
import { useParams } from 'next/navigation'
import Photo from '@/components/ui/photo'
import '../../../../app/global.css'
import Metric from '@/components/ui/metric'
//to be deleted
import IndianScout from '../../../../../assets_to_test/scout-rogue.jpeg'
import { Button } from '@/components/ui/button'
import UserCard from '@/components/ui/user-card'
import { Header2 } from '@/components/typography/header2'
import { FunctionComponent, useEffect, useState } from 'react'

// PLACEHOLDERS
const firstName = 'Moto'
const lastName = 'Guy'
const metric1 = 'Cooking'
const metric2 = 'Skating'
const MOCK_DATA = [
  {
    id: metric1,
    question: `How did ${firstName} do on ${metric1}?`,
    maxrating: 5,
  },
  {
    id: metric2,
    question: `How did ${firstName} do on ${metric2}`,
    maxrating: 5,
  },
]

// regular variables
const panelPadding = 'p-4'
type MetricData = {
  id: string
  rating: number
  comment: string
}

type GradeData = {
  metric: string
  rating: number
  maxRating: number
  comment: string
}

type ReviewData = {
  submitted: boolean
  reviewer: string
  grades: GradeData[]
}

type UserId = string

export default function Review({ reviewData }: { reviewData: ReviewData }) {
  const params = useParams()
  // const [state, setState] = useState<MetricData[]>()

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
    <div className="flex  mx-auto max-w-6xl h-screen ">
      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <Header2>Subject of review</Header2>
        <UserCard
          photo={IndianScout}
          fullName={`${firstName} ${lastName}`}
          title={'Pro Rider'}
          team={'Riders'}
        />
      </div>
      <div className={`w-1/2 border-2 ${panelPadding}`}>
        {MOCK_DATA.map((datum) => {
          return (
            <Metric
              key={datum.id}
              question={datum.question}
              name={datum.id}
              value={''}
              maxRating={datum.maxrating}
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
      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <h1>PROFILE PICTURE</h1>
        <Photo photo={IndianScout} alt="Motorcycle" />
      </div>
    </div>
  )
}
