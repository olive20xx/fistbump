import '../../../../global.css'
import { getFullReport, getUserFullName } from '@/lib/get-data-api'

async function Report({ params }) {
  const targetId = params.id
  const cycleId = params.cycleId

  // const { data: { getUser: { fullName } } } = await apolloClient.query({ query: queries.GET_USER_FULLNAME_BY_ID, variables: { id: params.id } })
  const fullName = await getUserFullName(targetId)
  const fullReport = await getFullReport(targetId, cycleId)

  return (
    <div className='p-4'>

      <h1 className="text-2xl">Your Report {fullName}</h1>
      <div>
        <p>Remarks:</p>
        <p>{fullReport.summary}</p>
      </div>
    </div >
  )
}

export default Report
