import axios from 'axios'
import '../../../../global.css'



// interface Grade {
//   metric: string;
//   rating: number;
//   maxRating: number;
//   comment: string;
// }

// interface Review {
//   reviewer: string;
//   isDeclined: boolean | null;
//   submitted: boolean;
//   grades: Grade[];
// }

// interface ReportData {
//   data: {
//     getReport: {
//       _id: {
//         target: string;
//         cycle: string;
//       };
//       remarks: string;
//       reviews: {
//         peer: Review[];
//         self: Review;
//       };
//     };
//   };
// }












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



  return (
    <div>
      {manager ?
        <div>
          <div>Manager</div>
          <div>{fullReport.remarks}</div>



          <h2>Peer Reviews</h2>
          {fullReport.reviews.peer.map((peerReview, index) => (
            <div key={index}>
              <div>
                <strong>Reviewer:</strong> {peerReview.reviewer}
              </div>
              {peerReview.grades.map((grade, gradeIndex) => (
                <div className='grid grid-cols-2 py-4 divide-y-2' key={gradeIndex}>
                  <p>
                    <strong>{grade.metric}:</strong> {grade.rating} / {grade.maxRating}
                  </p>
                  <p>{grade.comment}</p>
                </div>
              ))}
            </div>
          ))}


          <h2>Self Review</h2>
          <div>
            <strong>Reviewer:</strong> {fullReport.reviews.self.reviewer}
          </div>
          {fullReport.reviews.self.grades.map((grade, gradeIndex) => (
            <div key={gradeIndex}>
              <p>
                <strong>{grade.metric}:</strong> {grade.rating} / {grade.maxRating}
              </p>
              <p>{grade.comment}</p>
            </div>
          ))}
        </div>

        : <div></div>
      }
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
    </div >
  )
}

export default Report
