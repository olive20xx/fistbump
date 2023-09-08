import { getFullReport, getUserFullName } from '@/lib/get-data-api'

async function ReportPage({ params }) {
  const targetId = params.id

  const fullName = await getUserFullName(targetId)
  let fullReport = await getFullReport(targetId)

  const managerName = await getUserFullName(fullReport?.reviews.manager.reviewerId)

  return (
    <div className='p-4'>
      <h1 className="text-2xl">Your Report, {fullName}</h1>
      <div>
        <p>Submitted by {managerName}</p>
        {fullReport.reviews.manager.grades?.map((grade, i) => (
          <div key={i} className='p-4'>
            <p className='font-bold'>{grade.metric}</p>
            <p>{grade.rating} out of {grade.maxRating}</p>
            <p>Comment: {grade.comment}</p>
          </div>
        ))}
      </div>
    </div >
  )
}

export default ReportPage
