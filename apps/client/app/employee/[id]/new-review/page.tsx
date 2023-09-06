import Photo from '@/components/ui/photo'
import '@/app/global.css'
//to be deleted
import UserCard from '@/components/ui/UserCard'
import { Header2 } from '@/components/typography/header2'
import MetricList from '@/components/review/MetricList'
import { ReportData, ReviewData, UserData } from '@/types/models'
import { getCurrentCycle, getFullReport, getUserById } from '@/lib/get-data-api'
import { cookies } from 'next/headers'

// regular variables
const panelPadding = 'p-4'

export default async function Review({ params }: { params: any }) {
  const targetId = params.id

  const cookieStore = cookies()
  const id = cookieStore.get('userId')

  const reviewerId = id.value

  const cycle = await getCurrentCycle()
  const cycleId = cycle._id

  const targetUser = (await getUserById(targetId)) as UserData
  const targetName = targetUser.fullName

   const fullReport = await getFullReport(targetId) as ReportData
 
  let review: ReviewData | undefined
  if (fullReport.reviews.self && fullReport.reviews.self.reviewerId === targetId) {
    review = fullReport.reviews.self
  }

 
  if (fullReport.reviews.peers && fullReport.reviews.peers.find((peer) => peer.reviewerId === reviewerId)) {
    review = fullReport.reviews.peers.find((peer) => peer.reviewerId === reviewerId)
  }
 
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
      <MetricList
        targetId={targetId}
        reviewData={review}
        targetName={targetName}
      />
      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <h1>PROFILE PICTURE</h1>
        <Photo photo={targetUser.photo} alt="photo of the user" />
      </div>
    </div>
  )
}
