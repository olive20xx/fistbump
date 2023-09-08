import SelfReview from '@/components/review/Self'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'
import { User } from '@/src/__generated__/graphql'
import CallToAction from '../CallToAction'
import ReviewTarget from './ReviewTarget'

type UserReviewPanelProps = {
  loggedUser: User
  peersToReviewCount: number
  assignedUsers: User[]
  className?: string
}

function UserReviewPanel({ loggedUser, peersToReviewCount, assignedUsers, className }: UserReviewPanelProps) {
  return (
    <Panel size='horizontal' className={className}>
      <PanelHeader variant='highlight'>
        <PanelTitle>Reviews</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-4'>
        <SelfReview user={loggedUser} className='w-1/2' />
        <div className='w-1/2 mt-6 gap-4 flex-col flex'>
          <CallToAction action='review' numberOfPeers={peersToReviewCount} />
          {assignedUsers?.map((user: User, i) => (
            <ReviewTarget
              key={i}
              user={user}
            />
          ))}
        </div>
      </PanelContent>
    </Panel >
  )
}

export default UserReviewPanel