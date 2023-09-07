import NominationBox from '@/app/dashboard/(user)/(nomination)/NominationBox'
import CallToAction from '../CallToAction'
import { Report, User } from '@/src/__generated__/graphql'
import UserNamePhotoCaption from '@/components/ui/UserNamePhotoCaption'

type UserNominationContentProps = {
  className?: string,
  users: User[],
  report: Report,
  loggedUserId: string,
}

function UserNominationContent({ className, users, report, loggedUserId }: UserNominationContentProps) {
  const peerReviews = report.reviews.peers
  const numberOfPeers = peerReviews.length
  const reviewerIds: string[] = peerReviews.map(review => review.reviewerId)

  return (
    <div className={`flex justify-between ${className}`}>
      <div className='flex flex-col gap-4'>
        <CallToAction action='nominate' numberOfPeers={numberOfPeers} />
        <NominationBox users={users} report={report} loggedUserId={loggedUserId} />
      </div>
      <div className='flex flex-col gap-4 w-2/5'>
        <h4 className='font-bold text-green-darker'>Your nominations</h4>
        <NomineeList ids={reviewerIds} />
      </div>
    </div>
  )
}

function NomineeList({ ids }: { ids: string[] }) {
  return (
    <div className='gap-[10px] flex-col flex'>
      {ids.map((id, i) => (
        <UserNamePhotoCaption userId={id} caption='Was nominated by you' key={i} />
      ))}
    </div>
  )
}

export default UserNominationContent