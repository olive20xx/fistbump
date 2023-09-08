import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'
import ViewReport from './ViewReport'

type UserReportsPanelProps = {
  loggedUserId: string
  loggedUserTeam: string
}

function UserReportsPanel({ loggedUserId, loggedUserTeam }: UserReportsPanelProps) {
  return (
    <Panel size='vertical'>
      <PanelHeader variant='highlight'>
        <PanelTitle>My Reports</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-10'>
        <ViewReport loggedUserId={loggedUserId} loggedUserTeam={loggedUserTeam} />
      </PanelContent>
    </Panel>
  )
}

export default UserReportsPanel