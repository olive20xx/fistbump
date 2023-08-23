"use client"
import Photo from '@/components/ui/photo';
import '../../../../app/global.css'
import Metric from '@/components/ui/metric';
//to be deleted
import IndianScout from "../../../../../assets_to_test/scout-rogue.jpeg"
import { Button } from '@/components/ui/button';

const MOCK_DATA = [{ id: 1, question: "COMO te lllamas?" }, { id: 2, question: "COMO se lllama?" }]

export default function newReview() {

  const handleClick = (n: number) => {
    console.log("number from handleclick", n)
  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event)
  }
  const handleSubmit = () => {
    console.log("handle submit button")
  }
  const handleSaveDraft = () => {
    console.log("handle save draft button")
  }

  return (
    <div className="flex mx-auto justify-between max-w-6xl  h-screen bg-slate-500">
      <div className="">
        <h2 className="">Subject of review</h2>
        <div className='flex gap-2'>
          <div>
            <Photo width={80} height={90} photo={IndianScout} alt={"Motorcycle"} />
          </div>
          <div>
            <p>Name</p>
            <p>Title</p>
            <p>Team</p>
          </div>
        </div>
      </div>
      <div className="">
        {MOCK_DATA.map(datum => <Metric key={datum.id} question={datum.question} name="name" value="" onChange={() => handleChange} onClick={handleClick} />)}
        <div className='flex justify-between '>
          <Button onClick={handleSubmit} size="sm" style={{ background: "blue", color: "black" }}>Save Draft</Button>
          <Button onClick={handleSaveDraft} size="sm" style={{ background: "green", color: "black" }}>Submit</Button>
        </div>
      </div>
      <div className="">
        <h1>PROFILE PICTURE</h1>
        <Photo width={90} height={100} photo={IndianScout} alt='Motorcycle' />
      </div>
    </div>
  );
}
