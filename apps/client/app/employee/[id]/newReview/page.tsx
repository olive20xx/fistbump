"use client"
import '../../../../app/global.css'
import Metric from '@/components/ui/metric';

const MOCK_DATA = [{ id: 1, question: "COMO te lllamas?" }, { id: 2, question: "COMO se lllama?" }]

export default function newReview() {
  const handleClick = (n: number) => {
    console.log("number from handleclick", n)

  }
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event)
  }

  return (
    <div className=" flex mx-auto justify-between max-w-6xl  h-screen bg-slate-500">
      <div className="bg-gray-500">
          <h2 className="">Subject of review</h2>
          <img src="" alt="" />
          <p>Name</p>
          <p>Title</p>
          <p>Team</p>
      </div>
      
      <div className="bg-gray-700">
        {MOCK_DATA.map(datum => <Metric key={datum.id} question={datum.question} name="name" value="" onChange={handleChange} onClick={handleClick} />)}
      </div>

      <div className="bg-slate-100">
        <h1>PROFILE PICTURE</h1>
        <img src="" alt="" />
      </div>
    </div>
  );
}
