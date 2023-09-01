import Photo from '@/components/ui/photo'
import '@/app/global.css'
//to be deleted
import UserCard from '@/components/ui/user-card'
import { Header2 } from '@/components/typography/header2'
import MetricList from '@/components/review/MetricList'
import { ReportData, ReviewData, UserData } from '@/types/models'
import { getCurrentCycle, getFullReport, getUserById } from '@/lib/get-data-api'

// regular variables
const panelPadding = 'p-4'

export default async function Review({ params }: { params: any }) {
  const targetId = params.id
  const cycle = await getCurrentCycle()
  const cycleId = cycle._id
  const user = await getUserById(targetId)
  const fullReport = await getFullReport(targetId, cycleId)
  const [firstName] = user.fullName.split(' ')


  //! Hard coded self-review until this is merged, and we can get loggedUserId from cookies
  const reviewerId = targetId // change this to getUserIdFromCookie() (pseudocode)

  const targetUser = await getUserById(targetId) as UserData
  const targetName = targetUser.fullName

  const fullReport = await getFullReport(targetId, cycleId) as ReportData


  const review = findReviewByReviewerId(fullReport, reviewerId)

  return (
    <div className="flex  mx-auto max-w-6xl h-screen ">
      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <Header2>Subject of review</Header2>
        <UserCard
          photo={targetUser.photo}
          fullName={`${targetUser.fullName}`}
          title={targetUser.title}
          team={targetUser.teamName}
        />
      </div>
      <MetricList targetId={targetId} reviewData={review} targetName={targetName} />
      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <h1>PROFILE PICTURE</h1>
        <Photo photo={targetUser.photo} alt="photo of the user" />
      </div>
    </div>
  )
}

function findReviewByReviewerId(report: ReportData, reviewerId: string): ReviewData {
  const { reviews } = report
  let review: ReviewData | undefined

  if (reviews.manager.reviewerId?.toString() === reviewerId) {
    review = reviews.manager
  } else if (reviews.self.reviewerId?.toString() === reviewerId) {
    review = reviews.self
  } else {
    review = reviews.peers.find(
      (r) => r.reviewerId?.toString() === reviewerId
    )
  }

  return review
}