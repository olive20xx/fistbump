import '../../../../global.css'
import { getFullReport, getUserFullName } from '@/lib/get-data-api'

async function Report({ params }) {
  const targetId = params.id
  const cycleId = params.cycleId

  const fullName = await getUserFullName(targetId)
  const fullReport = await getFullReport(targetId, cycleId)
  const manager = await getUserFullName(fullReport.reviews.manager.reviewerId)
  //get a manager review only FE T CH



  return (
    <div className='p-4'>
      <h1 className="text-2xl">Report For: {fullName}</h1>
      <div>
        <h2>Remarks:</h2>
        <p>STATUS: {fullReport.status}</p>
        <p>SUMMARY: {fullReport.summary}</p>
        

        <div className='border-4 m-2'>
          <h2 className="font-bold">Manager Review by:</h2>
        <h3 className="text-2xl">{manager}</h3>
          {fullReport.reviews.manager.grades.map((grade, index) => (
            <div className='flex' key={index}>
              <p className='m-2'>Metric: {grade.metric}</p>
              <p className='m-2'>Rating: {grade.rating}/{grade.maxRating}</p>
              <p className='m-2'>Comment: {grade.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Report
