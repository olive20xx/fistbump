import axios from "axios"

async function getReport(getReportQuery) {
  try {
    const response = await axios.post('http://localhost:8080/graphql', {
      query: getReportQuery
    })
    console.log('response', response)
  } catch (error) {
    console.error(error)
  }
}
async function Report({ report }) {

  const targetId = "64e46166c1903f7622ec984f"
  const cycleId = "64e46166c1903f7622ec9852"

  const getReportQuery = `{
  query GetReport($targetId: String!, $cycleId: String!) {
    getReport(targetId: ${targetId}, cycleId: ${cycleId}) {
      _id {
        target
        cycle
      }
      remarks
      status  
    }
  }
}`



  await getReport(getReportQuery)


  return <div>View report</div>
}

export default Report
