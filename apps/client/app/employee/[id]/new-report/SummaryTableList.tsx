import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getUserFullName } from '@/lib/get-data-api'
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

type SummaryTableListProps = {
  className: string
  reviewsData: ReviewsData
  targetName: string
}

async function SummaryTableList({ className, reviewsData, targetName }: SummaryTableListProps) {
  const allTableData = await formatTableDataArray(reviewsData, targetName)
  return (
    <div className={className}>
      {allTableData.map((tableData, i) => {
        return <SummaryTable targetName={targetName} data={tableData} key={i} />
      })}
    </div>
  )
}

type SummaryTableProps = {
  targetName: string
  data: TableData
}
function SummaryTable({ targetName, data }: SummaryTableProps) {
  const { metricName, rows } = data
  const [targetFirstName] = targetName.split(' ')

  const averageRating = rows.reduce((ac, row) => {
    return ac + row.rating
  }, 0) / rows.length

  return (
    <div className='mb-4 bg-white p-4 border-2 border-gray-200 rounded-md shadow-md'>
      <div className='pl-4 font-bold'>How did {targetFirstName} do on <span className='text-turquoise'>{metricName}</span> ?</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[120px]'>Reviewer</TableHead>
            <TableHead className='text-center'>Rating</TableHead>
            <TableHead>Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows?.map((row, i) => {
            return <MetricRow targetName={targetName} reviewerName={row.reviewerName} rating={row.rating} comment={row.comment} key={i} />
          })}
        </TableBody>
        <TableFooter className='bg-green-light text-black'>
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
    <TableRow className={targetName === reviewerName ? 'bg-turquoise-light' : ''}>
      <TableCell>{reviewerName}</TableCell>
      <TableCell className='text-center'>{rating}</TableCell>
      <TableCell>{comment}</TableCell>
    </TableRow>
  )
}

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
  const peerReviewerNames = await Promise.all(
    peerReviews.map(
      async (review) => await getUserFullName(review.reviewerId)
    )
  )

  peerReviews.forEach((review, i) => {
    const { reviewerId, grades } = review
    if (!reviewerId) return
    const reviewerName = peerReviewerNames[i]
    grades.forEach((grade) => {
      const { rating, comment } = grade
      const tableIndex = formatted.findIndex((t) => t.metricName === grade.metric)
      const row: RowData = {
        reviewerName,
        rating,
        comment,
      }
      formatted[tableIndex].rows.push(row)
      formatted[tableIndex].rows
    })
  })

  return formatted
}

export default SummaryTableList