import NominationBox from '@/components/NominationBox'
import CallToAction from '../CallToAction'
import { Report, User } from '@/src/__generated__/graphql'

type UserNominationContentProps = {
  users: User[],
  report: Report,
  loggedUserId: string,
  cycleId: string,
}

function UserNominationContent({ users, report, loggedUserId, cycleId }: UserNominationContentProps) {

  const numberOfPeers = report.reviews.peers.length

  return (
    <div>
      <div className='flex flex-col gap-4'>
        <CallToAction action='nominate' numberOfPeers={numberOfPeers} />
        <NominationBox users={users} report={report} loggedUserId={loggedUserId} cycleId={cycleId} />
      </div>
    </div>
  )
}

export default UserNominationContent