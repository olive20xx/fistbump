import axios from 'axios'
import '../../../../global.css'
import { getReport, getUser } from '@/lib/fetch'


const userQuery = `
query getUser($id: String) {
  getUser(id:$id) {
    fullName
}
}`

const reportQuery = `
query GetReport($targetId: String!, $cycleId: String!) {
  getReport(targetId: $targetId, cycleId: $cycleId) {
    _id {
      target
      cycle
    }
    remarks
  }
}`


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
