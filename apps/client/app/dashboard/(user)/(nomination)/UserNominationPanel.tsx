import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'
import UserNominationContent from './UserNominationContent'
import { Report, User } from '@/src/__generated__/graphql'

type UserNominationPanelProps = {
  users: User[],
  loggedUserReport: Report,
  loggedUserId: string,
}

function UserNominationPanel({ users: users, loggedUserReport, loggedUserId }: UserNominationPanelProps) {
  return (
    <Panel size='horizontal'>
      <PanelHeader>
        <PanelTitle>Nominations</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-5'>
        <UserNominationContent users={users} report={loggedUserReport} loggedUserId={loggedUserId} />
      </PanelContent>
    </Panel>
  )
}


export default UserNominationPanel