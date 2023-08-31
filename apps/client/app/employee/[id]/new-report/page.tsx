import { Header2 } from '@/components/typography/header2'
import Photo from '@/components/ui/photo'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserCard from '@/components/ui/user-card'
import { apolloClient } from '@/lib/apollo-client'
import { getCurrentCycle, getFullReport, getUserById, getUserFullName } from '@/lib/get-data-api'
import { queries } from '@/lib/graphql-queries'
import { ReviewsData } from '@/types/models'

type TableData = {
  metricName: string
  rows: RowData[]
}

type RowData = {
  reviewerName: string
  rating: number
  comment: string
}

async function ReportPage({ params }) {
  const targetId = params.id

  const cycle = await getCurrentCycle()
  const cycleId = cycle._id

  const targetUser = await getUserById(targetId)
  const targetName = targetUser.fullName
  const fullReport = await getFullReport(targetId, cycleId)

  const tableData = await formatTableDataArray(fullReport.reviews as ReviewsData, targetUser.fullName)

  const reviewerIdsRaw = fullReport.reviews.peers.map(review => review.reviewerId)
  const reviewerIds = reviewerIdsRaw.filter((id) => id !== null)

  return (
    <div className="h-screen flex">
      <div className='flex flex-col h-full w-1/2'>
        <div className='flex'>
          <div className={`w-[300px] p-4`}>
            <Header2>Subject of review</Header2>
            <UserCard
              photo={targetUser.photo}
              fullName={`${targetUser.fullName}`}
              title={targetUser.title}
              team={targetUser.teamName}
            />
          </div>
          <div className='p-4'>
            <Header2>Reviewers</Header2>
            {reviewerIds.map(async (id, i) => <Reviewer id={id} key={i} />)}
          </div>
        </div>
        <SummaryTables className={'mt-8 px-4'} metricSummaries={tableData} targetName={targetName} />
      </div>
      <div className='bg-blue-300 h-full w-1/2'>
        Metric List
      </div>

    </div>
  )
}

async function Reviewer({ id }) {
  const { fullName, photo } = await getUserById(id)

  return (
    <div className='flex'>
      <Photo photo={photo} alt={`Picture of ${fullName}`} />
      <div>{fullName}</div>
    </div>
  )
}

type SummaryTablesProps = {
  className: string
  metricSummaries: TableData[]
  targetName: string
}

function SummaryTables({ className, metricSummaries, targetName }: SummaryTablesProps) {
  return (
    <div className={className}>
      {metricSummaries.map((metricSummary, i) => {
        return <MetricSummaryTable targetName={targetName} data={metricSummary} key={i} />
      })}
    </div>
  )
}

type SummaryTableProps = {
  targetName: string
  data: TableData
}
function MetricSummaryTable({ targetName, data }: SummaryTableProps) {
  const { metricName, rows } = data
  const [targetFirstName] = targetName.split(' ')

  const averageRating = rows.reduce((ac, row) => {
    return ac + row.rating
  }, 0) / rows.length

  return (
    <div className='mb-8'>
      <div className='pl-4 font-bold'>How did {targetFirstName} do on <span className='text-pink-400'>{metricName}</span> ?</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[120px]'>Reviewer</TableHead>
            <TableHead className='text-center'>Rating</TableHead>
            <TableHead>Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => {
            return <MetricRow targetName={targetName} reviewerName={row.reviewerName} rating={row.rating} comment={row.comment} key={i} />
          })}
        </TableBody>
        <TableFooter className='bg-pink-200 text-black'>
          <TableRow>
            <TableCell>Average</TableCell>
            <TableCell className='text-center'>{averageRating.toFixed(1)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

function MetricRow({ targetName, reviewerName, rating, comment }) {
  return (
    <TableRow className={targetName === reviewerName ? 'bg-pink-50' : ''}>
      <TableCell>{reviewerName}</TableCell>
      <TableCell className='text-center'>{rating}</TableCell>
      <TableCell>{comment}</TableCell>
    </TableRow>
  )
}

//TODO working here!!
async function formatTableDataArray(reviews: ReviewsData, targetName: string): Promise<TableData[]> {
  const formatted: TableData[] = []

  const selfGrades = reviews.self.grades

  selfGrades.forEach(grade => {
    const rowData: RowData = {
      reviewerName: targetName,
      rating: grade.rating,
      comment: grade.comment,
    }

    const tableData: TableData = {
      metricName: grade.metric,
      rows: [rowData],
    }

    formatted.push(tableData)
  })

  const peerReviews = reviews.peers
  peerReviews.forEach(async (review) => {
    const { reviewerId, grades } = review
    const reviewerName = await getUserFullName(reviewerId)
    grades.forEach((grade) => {
      const { rating, comment } = grade
      const table = formatted.find((t) => t.metricName === grade.metric)
      const row: RowData = {
        reviewerName,
        rating,
        comment,
      }
      table.rows.push(row)
    })
  })

  return formatted
}



// function addFormattedReviews(metricName: string, summaries: TableData[], reviews: ReviewsModel) {

// }


// export type ReviewModel = {
//   reviewerId: string
//   isDeclined: boolean
//   submitted: boolean
//   grades: array of {
//     metric
//     rating
//     maxRating
//     comment
//   }
// }

// TABLE
// type TableData = {
//   metricName
//   averageRating
//   rows: array of {
//     reviewerName
//     rating
//     comment
//   }
// }

// ROW
// type RowData = {
//   reviewerName
//   rating
//   comment
// }

export default ReportPage