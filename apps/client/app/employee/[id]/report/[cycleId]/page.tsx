import '../../../../global.css'
import { getFullReport, getUserFullName } from '@/lib/get-data-api'

async function Report({ params }) {
  const targetId = params.id
  const cycleId = params.cycleId

  const fullName = await getUserFullName(targetId)
  const fullReport = await getFullReport(targetId, cycleId)
//get a manager review only FE T CH

  async function getReviewer(id) {
    const fullName = await getUserFullName(id)
    return fullName
  }

  return (
    <div className='p-4'>
      <h1 className="text-2xl">Your Report {fullName}</h1>
      <div>
        <h2>Remarks:</h2>
        <p>{fullReport.status}</p>
        <p>{fullReport.summary}</p>

        <div className='border-4 m-2'>
          <h2 className="font-bold">Manager Review</h2>
          {fullReport.reviews.manager.grades.map((grade, index) => (
            <div key={index}>
              <h2>{getReviewer(fullReport.reviews.manager.reviewerId)}</h2>
              <p>Metric: {grade.metric}</p>
              <p>Rating: {grade.rating}/{grade.maxRating}</p>
              <p>Comment: {grade.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Report
