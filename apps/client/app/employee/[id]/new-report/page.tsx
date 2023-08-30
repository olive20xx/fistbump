import { Header2 } from '@/components/typography/header2'
import Photo from '@/components/ui/photo'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UserCard from '@/components/ui/user-card'
import { apolloClient } from '@/lib/apollo-client'
import { queries } from '@/lib/graphql-queries'
import { ReviewData } from '@/types/models'

type MetricSummary = {
  metricName: string
  averageRating: number
  reviews: FormattedReview[]
}

type FormattedReview = {
  reviewerName: string
  rating: number
  comment: string
}

const MOCK_REVIEW_DATA =
  [
    {
      metricName: 'Crime',
      averageRating: 2,
      reviews: [
        {
          reviewerName: 'Olga',
          rating: 3,
          comment: "I don't like crime",
        },
        {
          reviewerName: 'Rita',
          rating: 1,
          comment: 'Olga is terrible at crime',
        },
        {
          reviewerName: 'Craig',
          rating: 2,
          comment: "It's like Olga doesn't even like crime!",
        }
      ],
    },
    {
      metricName: 'Lunch',
      averageRating: 4,
      reviews: [
        {
          reviewerName: 'Olga',
          rating: 4,
          comment: "I eat lunch most days",
        },
        {
          reviewerName: 'Rita',
          rating: 3,
          comment: 'Olga is OK at lunch',
        },
        {
          reviewerName: 'Craig',
          rating: 5,
          comment: "It's always great when Olga joins us for lunch!",
        }
      ],
    }
  ]

async function ReportPage({ params }) {
  const targetId = params.id

  const { data: { getCurrentCycle } } = await apolloClient.query({ query: queries.GET_CURRENT_CYCLE })
  const cycleId = getCurrentCycle._id

  const { data: { getUser } } = await apolloClient.query({ query: queries.GET_USER_BY_ID, variables: { id: params.id } })
  const { data: { getReport } } = await apolloClient.query({ query: queries.GET_FULL_REPORT, variables: { targetId: params.id, cycleId } })

  //TODO FIX
  const reviewers = await getReport.reviews.peers.map(async (review) => {
    if (!review.reviewerId) return
    console.log(review.reviewerId)
    const { data: { getUser } } = await apolloClient.query({ query: queries.GET_USER_BY_ID, variables: { id: review.reviewerId } })
    return { photo: getUser.photo, fullname: getUser.fullName }
  })

  return (
    <div className="h-screen flex">
      <div className='flex flex-col h-full w-1/2'>
        <div className='flex'>
          <div className={`w-[300px] p-4`}>
            <Header2>Subject of review</Header2>
            <UserCard
              photo={getUser.photo}
              fullName={`${getUser.fullName}`}
              title={getUser.title}
              team={getUser.teamName}
            />
          </div>
          <div className='p-4'>
            <Header2>Reviewers</Header2>
            {/* {reviewers.map((reviewer, i) => {
              return <Reviewer photo={reviewer.photo} fullName={reviewer.fullName} key={i} />
            })} */}
            <div>Craig</div>
            <div>Rita</div>
          </div>
        </div>
        <SummaryTables className={'mt-8 px-4'} formattedReviewData={MOCK_REVIEW_DATA} />
      </div>
      <div className='bg-blue-300 h-full w-1/2'>
        Metric List
      </div>

    </div>
  )
}

function Reviewer({ photo, fullName }) {
  return (
    <div className='flex'>
      <Photo photo={photo} alt={`Picture of ${fullName}`} />
      <div>{fullName}</div>
    </div>
  )
}

function SummaryTables({ className, formattedReviewData }) {
  return (
    <div className={className}>
      {formattedReviewData.map((metricData, i) => {
        return <MetricSummaryTable targetFirstName={'Olga'} data={metricData} key={i} />
      })}
    </div>
  )
}


function MetricSummaryTable({ targetFirstName, data }) {
  const { metricName, averageRating, reviews } = data
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
          {reviews.map((review, i) => {
            return <MetricRow reviewerName={review.reviewerName} rating={review.rating} comment={review.comment} key={i} />
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

function MetricRow({ reviewerName, rating, comment }) {
  return (
    <TableRow>
      <TableCell>{reviewerName}</TableCell>
      <TableCell className='text-center'>{rating}</TableCell>
      <TableCell>{comment}</TableCell>
    </TableRow>
  )
}

//TODO working here!!
// async function formatReviewData(reviewData: ReviewData): FormattedReview {
//   const { reviewerId } = reviewData
//   const { data: { getUser: { fullName } } } = await apolloClient.query({ query: queries.GET_USER_FULLNAME_BY_ID, variables: { id: reviewerId } })

//   const formatted: FormattedReview = {
//     reviewerName: fullName,
//     rating: reviewData.grades
//   }
// }

export default ReportPage