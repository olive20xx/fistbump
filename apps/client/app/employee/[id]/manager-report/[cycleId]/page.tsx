import '@/app/global.css'

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
import { userQuery, getFullReportQuery } from '@/lib/queries'


async function Report({ params }) {

  const targetId = params.id
  const cycleId = params.cycleId

  // const status = undefined
  const variables = { targetId, cycleId }



  const target = await getUser(userQuery, { id: targetId })
  const fullReport = await getReport(getFullReportQuery, variables)

  async function getReviewer(id) {
    const reviewerName = await getUser(userQuery, { id: id })
    return reviewerName.fullName
  }



  return (
    <div className='p-4'>
      <div>
        <h1 className='text-2xl'>Manager</h1>
        <h2>Report remarks: {fullReport.remarks}</h2>
        <Table className='pt-4' >
          <TableCaption>All the metrics and ratings from reviews</TableCaption>
          <h2 className='font-bold' >Peer Reviews</h2>
          <TableBody>
            {fullReport.reviews.peer.map((peerReview, index) => (
              <div key={index}>
                <TableRow>
                  <TableCell className="font-medium">{getReviewer(peerReview.reviewer)}</TableCell>
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
          <TableCaption>All the metrics and ratings from reviews</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{target.fullName}</TableCell>
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
    </div >

  )
}

export default Report
