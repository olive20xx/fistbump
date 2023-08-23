import axios from 'axios'
import '../../../../global.css'
import { getReport, getUser } from '@/lib/fetch'

async function Report({ params }) {
  const targetId = params.id
  const cycleId = params.cycleId
  const query = `
      query GetReport($targetId: String!, $cycleId: String!) {
        getReport(targetId: $targetId, cycleId: $cycleId) {
          _id {
            target
            cycle
          }
          remarks
        }
      }`

  // const status = undefined
  const variables = { targetId, cycleId }

  const report = await getReport(query, variables)
  const user = await getUser(targetId)

  return (
    // (!status ? <p>come back later </p> :
    <div className="p-12">
      <h1 className="text-2xl">Your Report {user}</h1>
      <div>
        <p>Remarks:</p>
        <p>{report.remarks}</p>
      </div>
    </div>
    // )
  )
}

export default Report
