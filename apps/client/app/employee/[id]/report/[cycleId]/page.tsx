import axios from 'axios'

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
          status  
        }
      }`

  const variables = { targetId, cycleId }

  const report = await getReport(query, variables)
  const user = await getUser(params)

  console.log('our USER', user)
  return <div>
    <h2>Your Report {user}</h2>
    <div>

      <p>Remarks:</p>
      <p>
        {report.remarks}
      </p>
      <p>Status:</p>
      <p>{report.status}</p>
    </div>
  </div>
}

export default Report
