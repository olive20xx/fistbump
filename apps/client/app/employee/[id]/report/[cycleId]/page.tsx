
import '@/app/global.css'
import { getReport, getUser } from '@/lib/fetch'
import { userQuery, reportQuery, getFullReportQuery } from '@/lib/queries'


async function Report({ params }) {

  const targetId = params.id
  const cycleId = params.cycleId

  // const status = undefined
  const variables = { targetId, cycleId }


  const user = await getUser(userQuery, { id: targetId })
  const report = await getReport(reportQuery, variables)


  console.log(variables)

  return (
    <div className='p-4'>

      <h1 className="text-2xl">Your Report {user.fullName}</h1>
      <div>
        <p>Remarks:</p>
        <p>{report.remarks}</p>
      </div>

    </div >

  )
}

export default Report
