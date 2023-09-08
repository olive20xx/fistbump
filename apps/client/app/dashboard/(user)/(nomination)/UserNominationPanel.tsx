import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'
import UserNominationContent from './UserNominationContent'
import { Report, User } from '@/src/__generated__/graphql'

type UserNominationPanelProps = {
  users: User[]
  loggedUserReport: Report
  loggedUserId: string
  className?: string
}

function UserNominationPanel({ users, loggedUserReport, loggedUserId, className }: UserNominationPanelProps) {
  return (
    <Panel size='horizontal' className={`${className}`}>
      <PanelHeader variant='highlight'>
        <PanelTitle>Nominations</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-5'>
        <UserNominationContent users={users} report={loggedUserReport} loggedUserId={loggedUserId} />
      </PanelContent>
    </Panel>
  )
}


export default UserNominationPanel