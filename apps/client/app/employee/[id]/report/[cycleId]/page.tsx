import axios from 'axios'
import '../../../../global.css'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getReport, getUser } from '@/lib/fetch'
import { userQuery, reportQuery, getFullReportQuery } from '@/lib/queries'




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


  const user = await getUser(userQuery, params)
  const report = await getReport(reportQuery, variables)
  const fullReport = await getReport(getFullReportQuery, variables)



  return (
    <div className='p-4'>
      {manager ?
        <div>
          <h1 className='text-2xl'>Manager</h1>

          <h2>Report remarks: {fullReport.remarks}</h2>

          <Table className='pt-4' >
            <TableCaption>All the metrics and reting from reviews</TableCaption>
            <h2 className='font-bold' >Peer Reviews</h2>
            <TableBody>
              {fullReport.reviews.peer.map((peerReview, index) => (
                <div key={index}>
                  <TableRow>
                    <TableCell className="font-medium">{peerReview.reviewer}</TableCell>
                  </TableRow>
                  {peerReview.grades.map((grade, gradeIndex) => (
                    <div className='grid grid-cols-5' key={gradeIndex}>
                      <TableCell>{grade.metric}</TableCell>
                      <TableCell>{grade.rating}/{grade.maxRating}</TableCell>
                      <TableCell className='grid col-span-3' >{grade.comment}</TableCell>
                    </div>
                  ))}
                </div>
              ))}
            </TableBody>
          </Table>
          <h2 className='font-bold'>Self Review</h2>
          <Table >
            <TableCaption>All the metrics and reting from reviews</TableCaption>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{fullReport.reviews.self.reviewer}</TableCell>
              </TableRow>
              {fullReport.reviews.self.grades.map((grade, gradeIndex) => (
                <div className='grid grid-cols-5' key={gradeIndex}>
                  <TableCell>{grade.metric}</TableCell>
                  <TableCell>{grade.rating}/{grade.maxRating}</TableCell>
                  <TableCell className='grid col-span-3' >{grade.comment}</TableCell>
                </div>
              ))}
            </TableBody>
          </Table>
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
