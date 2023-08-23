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
import MetricList from './metric-list'
import { ReviewData } from '@/types/models'

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

export default function Review({ reviewData }: { reviewData: ReviewData }) {
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

      <MetricList reviewData={MOCK_DATA} />

      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <h1>PROFILE PICTURE</h1>
        <Photo photo={IndianScout} alt="Motorcycle" />M
      </div>
    </div>
  )
}
