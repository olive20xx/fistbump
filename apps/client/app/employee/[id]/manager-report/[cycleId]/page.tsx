import '@/app/global.css'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { apolloClient } from '@/lib/apollo-client'
import { queries } from '@/lib/graphql-queries'

async function Report({ params }) {
  const variables = { targetId: params.id, cycleId: params.cycleId }

  const { data: { getUser: { fullName } } } = await apolloClient.query({ query: queries.GET_USER_FULLNAME_BY_ID, variables: { id: variables.targetId } })
  const { data: { getReport } } = await apolloClient.query({ query: queries.GET_FULL_REPORT, variables })

  async function getReviewer(id) {
    const {
      data: {
        getUser: { fullName },
      },
    } = await apolloClient.query({
      query: queries.GET_USER_FULLNAME_BY_ID,
      variables: { id: id },
    })
    return fullName
  }

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl">Manager</h1>
        <h2>Report remarks: {getReport.summary}</h2>
        <Table className="pt-4">
          <TableCaption>All the metrics and ratings from reviews</TableCaption>
          <h2 className="font-bold">Peer Reviews</h2>
          <TableBody>
            {getReport.reviews.peers.map((peerReview, index) => {
              return !peerReview.reviewerId ? <></> :
                <div key={index}>
                  <TableRow>
                    <TableCell className="font-medium">
                      {getReviewer(peerReview.reviewerId)}
                    </TableCell>
                  </TableRow>
                  {peerReview.grades.map((grade, gradeIndex) => (
                    <div className="grid grid-cols-5" key={gradeIndex}>
                      <TableCell>{grade.metric}</TableCell>
                      <TableCell>
                        {grade.rating}/{grade.maxRating}
                      </TableCell>
                      <TableCell className="grid col-span-3">
                        {grade.comment}
                      </TableCell>
                    </div>
                  ))}
                </div>
            })}
          </TableBody>
        </Table>
        <h2 className="font-bold">Self Review</h2>
        <Table>
          <TableCaption>All the metrics and ratings from reviews</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{fullName}</TableCell>
            </TableRow>
            {getReport.reviews.self.grades.map((grade, gradeIndex) => (
              <div className="grid grid-cols-5" key={gradeIndex}>
                <TableCell>{grade.metric}</TableCell>
                <TableCell>
                  {grade.rating}/{grade.maxRating}
                </TableCell>
                <TableCell className="grid col-span-3">
                  {grade.comment}
                </TableCell>
              </div>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Report
