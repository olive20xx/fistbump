import axios from 'axios'
import '../../../../global.css'

async function getReport(variables) {
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
  const query = `
      query GetReport($targetId: String!, $cycleId: String!) {
        getReport(targetId: $targetId, cycleId: $cycleId) {
          _id{ 
            target
            cycle
          }
          remarks
          status
          reviews {
            peer {
              reviewer
              isDeclined
              submitted
              grades {
                metric
                rating
                maxRating
                comment
              }
            }
            self {
              reviewer
              isDeclined
              submitted
              grades {
                metric
                rating
                maxRating
                comment
              }
            }         
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

  // const status = undefined
  const variables = { targetId, cycleId }

  const user = await getUser(params)
  const report = await getReport(variables)
  const fullReport = await getFullReport(variables)



  const peerGrades = fullReport.reviews.peer.map(peerItem => {

    const grades = peerItem.grades.map(metric => {
      return metric.metric + ' : ' + metric.rating + ' / ' + metric.comment
    });

    return {
      reviewer: peerItem.reviewer,
      submitted: peerItem.submitted,
      grades: grades

    };
  });






  return (
    <div>
      {manager ?
        <div>
          <div>Manager</div>
          <div>{fullReport.remarks}</div>
          <h2>SELF REVIEW</h2>
          <p>
            {fullReport.reviews.self.grades[0].metric} :   {fullReport.reviews.self.grades[0].rating}
          </p>
          <p>
            {fullReport.reviews.self.grades[1].metric} :   {fullReport.reviews.self.grades[1].rating}
          </p>
          <p>
            {fullReport.reviews.self.grades[2].metric} :   {fullReport.reviews.self.grades[2].rating}
          </p>

          <h2>PEER REVIEW 1</h2>

          {peerGrades.map((item, index) => (

            <div className='grid grid-cols-2' key={index}>
              <p>
                {item.reviewer} : {item.grades[0]}
              </p>
              <p>
                {item.reviewer} : {item.grades[1]}
              </p>
              <p>
                {item.reviewer} : {item.grades[2]}
              </p>
            </div>
          )
          )}

        </div>


        : <div></div>}
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
