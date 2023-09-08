import { Report } from '@/src/__generated__/graphql'
import '../../../../global.css'
import { getFullReport, getUserFullName } from '@/lib/get-data-api'

async function Report({ params }) {
  const targetId = params.id
  console.log(targetId)
  const fullName = await getUserFullName(targetId)
  let fullReport: Report
  if (params.cycleId) {
    fullReport = await getFullReport(targetId, params.cycleId)
  } else {
    fullReport = await getFullReport(targetId)
  }

  const managerName = await getUserFullName(fullReport?.reviews.manager.reviewerId)

  return (
    <div className='p-4'>
      <h1 className="text-2xl">Your Report {fullName}</h1>
      <div>
        <p>Submitted by {managerName}</p>
        {fullReport.reviews.manager.grades.map((grade, i) => (
          <div key={i}>
            <p>{grade.metric}</p>
            <p>{grade.rating} out of {grade.maxRating}</p>
            <p>{grade.rating} out of {grade.comment}</p>
          </div>
        ))}
      </div>
    </div >
  )
}

export default Report
