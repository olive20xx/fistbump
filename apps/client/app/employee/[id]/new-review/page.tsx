import '@/app/global.css'
//to be deleted
import UserCard from '@/components/ui/UserCard'
import MetricList from '@/components/review/MetricList'
import { ReportData, ReviewData, UserData } from '@/types/models'
import { getCurrentCycle, getFullReport, getUserById } from '@/lib/get-data-api'
import { cookies } from 'next/headers'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'
import { Button } from '@/components/ui/button'
import { ArrowLeftSquareIcon } from 'lucide-react'

// regular variables
const panelPadding = 'p-4'

export default async function Review({ params }: { params: any }) {
  const targetId = params.id

  const cookieStore = cookies()
  const id = cookieStore.get('userId')

  const reviewerId = id.value

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
    <div className='bg-turquoise-dark flex min-h-screen h-full py-10 flex-grow overflow-auto'>
      <div className='w-[240px] px-5 flex justify-center'>
        <Button href='/dashboard' variant='black' size='lg'>← Back</Button>
      </div>
      <Panel className='w-5/6 z-10 overflow-auto'>
        <PanelHeader variant='darkgray' className='items-end flex gap-4'>
          <PanelTitle className='text-2xl'>Write your review</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <div className="h-full">
            <MetricList
              targetId={targetId}
              reviewData={review}
              targetName={targetName}
            />
          </div>
        </PanelContent>
      </Panel>
      <div className='w-[240px] mx-5 flex-col justify-between'>
        <div>
          <UserCard
            photo={targetUser.photo}
            fullName={`${targetUser.fullName}`}
            title={targetUser.title}
            team={targetUser.teamName}
          />
        </div>
        {/* <div className='flex-col'>
          <Button className='bg-black rounded-sm w-32'>Save draft</Button>
          <Button className='bg-black rounded-sm w-32'>Submit</Button>
        </div> */}

      </div>
    </div>
  )
}
