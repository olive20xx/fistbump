import { getCurrentCycle, getFullReport, getUserById, getUserFullName } from '@/lib/get-data-api'
import { ReviewData, ReviewsData, UserData } from '@/types/models'
import SubjectOfReview from './SubjectOfReview'
import Reviewers from './Reviewers'
import SummaryTableList from './SummaryTableList'
import MetricList from '../../../../components/review/MetricList'
import { Header2 } from '@/components/typography/header2'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'

export const revalidate = 0

async function ReportPage({ params }) {
  const targetId = params.id

  const cycle = await getCurrentCycle()
  const cycleId = cycle._id

  const targetUser = await getUserById(targetId)
  const targetName = targetUser.fullName
  const fullReport = await getFullReport(targetId, cycleId)

  const managerReview = fullReport.reviews.manager as ReviewData
  const reviewsData = fullReport.reviews as ReviewsData

  const reviewerIdsRaw = fullReport.reviews.peers.map(review => review.reviewerId)
  const reviewerIds = reviewerIdsRaw.filter((id) => id !== null)

  return (
    <div className="flex h-screen">
      <div className='w-1/2 flex flex-col'>
        <div className='flex'>
          <SubjectOfReview targetUser={targetUser as UserData} />
          <Reviewers reviewerIds={reviewerIds} />
        </div>
        <SummaryTableList className={'mt-8 px-4 overflow-scroll'} reviewsData={reviewsData} targetName={targetName} />
      </div>
      <Panel size='page'>
        <PanelHeader variant='highlight'>
          <PanelTitle>Write your report</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <MetricList targetId={targetId} targetName={targetName} reviewData={managerReview} isManagerReport />
        </PanelContent>
      </Panel>
    </div>
  )
}

export default ReportPage