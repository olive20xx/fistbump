import axios from 'axios'
import '../../../../global.css'

async function getReport(query, variables) {
  try {
    const response = await axios.post('http://localhost:8080/graphql', {
      query,
      variables,
    })
    return response.data.data.getReport
  } catch (error) {
    console.error(error)
  }
}

async function getUser(params) {
  const query = `
  query getUser($id: String) {
    getUser(id:$id) {
      fullName
  }
}`

  const variables = { id: params.id }

  try {
    const response = await axios.post('http://localhost:8080/graphql', {
      query,
      variables,
    })
    return response.data.data.getUser.fullName
  } catch (error) {
    console.error(error)
  }
}

async function getFullReport(variables) {
  console.log('variables console', variables)

  const query = `
      query GetReport($targetId: String!, $cycleId: String!) {
        getReport(targetId: $targetId, cycleId: $cycleId) {
          _id {
            target
            cycle
          }
          remarks
          reviews{
            peer
            self
          }
        }
      }`

  try {
    const response = await axios.post('http://localhost:8080/graphql', {
      query,
      variables,
    })
    return response.data.data.getReport
  } catch (error) {
    console.error(error)
  }
}

async function Report({ params }) {
  const manager = true

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

  const user = await getUser(params)
  const report = await getReport(query, variables)
  const fullReport = await getFullReport(variables)


  console.log('full report console',fullReport)
  console.log('paramsss console ------>',params)

  return (
    <div>
      {manager ? <div>Manager</div> : <div></div>}
      {/* // (!status ?{' '} */}
      {/* <p>come back later </p> : */}
      {/* <div className="p-12">
        <h1 className="text-2xl">Your Report {user}</h1>
        <div>
          <p>Remarks:</p>
          <p>{report.remarks}</p>
        </div>
      </div> */}
      {/* // ) */}
    </div>
  )
}

export default Report
