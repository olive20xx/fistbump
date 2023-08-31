import { getCurrentCycle, getFullReport, getUserById, getUserFullName } from '@/lib/get-data-api'
import { ReviewsData, UserData } from '@/types/models'
import SubjectOfReview from './SubjectOfReview'
import Reviewers from './Reviewers'
import SummaryTableList from './SummaryTableList'

async function ReportPage({ params }) {
  const targetId = params.id

  const cycle = await getCurrentCycle()
  const cycleId = cycle._id

  const targetUser = await getUserById(targetId)
  const targetName = targetUser.fullName
  const fullReport = await getFullReport(targetId, cycleId)

  const reviewerIdsRaw = fullReport.reviews.peers.map(review => review.reviewerId)
  const reviewerIds = reviewerIdsRaw.filter((id) => id !== null)

  return (
    <div className="h-screen flex">
      <div className='flex flex-col h-full w-1/2'>
        <div className='flex'>
          <SubjectOfReview targetUser={targetUser as UserData} />
          <Reviewers reviewerIds={reviewerIds} />
        </div>
        <SummaryTableList className={'mt-8 px-4'} reviewsData={fullReport.reviews as ReviewsData} targetName={targetName} />
      </div>
      <div className='bg-blue-300 h-full w-1/2'>
        Metric List
      </div>
    </div>
  )
}

export default ReportPage