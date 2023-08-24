import axios from 'axios'
import '../../../../global.css'
import { getReport, getUser } from '@/lib/fetch'
import { userQuery, reportQuery } from "../../../../../graphql/queries"




async function Report({ params }) {
  const targetId = params.id
  const cycleId = params.cycleId

  // const status = undefined
  const variables = { targetId, cycleId }

  const report = await getReport(reportQuery, variables)
  const user = await getUser(targetId, userQuery)

  return (
    // (!status ? <p>come back later </p> :
    <div className="p-12">
      <h1 className="text-2xl">Your Report {user.fullName}</h1>
      <div>
        <p>Remarks:</p>
        <p>{report.remarks}</p>
      </div>
    </div>
    // )
  )
}

export default Report
