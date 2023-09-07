import NominationBox from '@/app/dashboard/(user)/(nomination)/NominationBox'
import CallToAction from '../CallToAction'
import { Report, User } from '@/src/__generated__/graphql'

type UserNominationContentProps = {
  className?: string,
  users: User[],
  report: Report,
  loggedUserId: string,
  cycleId: string,
}

function UserNominationContent({ className, users, report, loggedUserId, cycleId }: UserNominationContentProps) {

  const numberOfPeers = report.reviews.peers.length

  return (
    <div className={`flex justify-between ${className}`}>
      <div className='flex flex-col gap-4'>
        <CallToAction action='nominate' numberOfPeers={numberOfPeers} />
        <NominationBox users={users} report={report} loggedUserId={loggedUserId} cycleId={cycleId} />
      </div>
      <div className='flex flex-col gap-4'>
        <h4 className='bg-slate-100 font-bold text-green-darker'>Your nominations</h4>

      </div>
    </div>
  )
}

export default UserNominationContent