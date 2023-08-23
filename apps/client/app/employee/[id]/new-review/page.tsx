'use client'
import Photo from '@/components/ui/photo'
import '../../../../app/global.css'
import Metric from '@/components/ui/metric'
//to be deleted
import IndianScout from '../../../../../assets_to_test/scout-rogue.jpeg'
import { Button } from '@/components/ui/button'
import UserCard from '@/components/ui/user-card'

const firstName = 'Moto'
const lastName = 'Guy'
const metric1 = 'Cooking'
const metric2 = 'Skating'
const MOCK_DATA = [
  { id: 1, question: `How did ${firstName} do on ${metric1}?` },
  { id: 2, question: `How did ${firstName} do on ${metric2}` },
]

export default function newReview() {
  const handleClick = (n: number) => {
    console.log('number from handleclick', n)
  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event)
  }
  const handleSubmit = () => {
    console.log('handle submit button')
  }
  const handleSaveDraft = () => {
    console.log('handle save draft button')
  }

  return (
    <div className="flex  mx-auto max-w-6xl h-screen ">
      <div className="w-1/4 border-2">
        <h2 className="">Subject of review</h2>
        <UserCard
          photo={IndianScout}
          fullName={`${firstName} ${lastName}`}
          title={'Pro Rider'}
          team={'Riders'}
        />
      </div>
      <div className="w-1/2 border-2">
        {MOCK_DATA.map((datum) => (
          <Metric
            key={datum.id}
            question={datum.question}
            name="name"
            value=""
            onChange={() => handleChange}
            onClick={handleClick}
          />
        ))}
        <div className="flex justify-around">
          <Button onClick={handleSubmit} size="sm">
            Save Draft
          </Button>
          <Button onClick={handleSaveDraft} size="sm">
            Submit
          </Button>
        </div>
      </div>
      <div className="w-1/4 border-2">
        <h1>PROFILE PICTURE</h1>
        <Photo photo={IndianScout} alt="Motorcycle" />
      </div>
    </div>
  )
}
