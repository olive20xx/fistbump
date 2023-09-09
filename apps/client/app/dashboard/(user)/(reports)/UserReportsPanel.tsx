import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'
import ViewReport from './ViewReport'
import { getFullReport } from '@/lib/get-data-api'

type UserReportsPanelProps = {
  loggedUserId: string
  loggedUserTeam: string
}

//TODO make this ready to work for multiple Cycles and past Reports
async function UserReportsPanel({ loggedUserId, loggedUserTeam }: UserReportsPanelProps) {
  const report = await getFullReport(loggedUserId)
  return (
    <Panel className='h-4/5' size='vertical'>
      <PanelHeader variant='highlight'>
        <PanelTitle>My Reports</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-10'>
        {report.reviews.manager.submitted ?
          <ViewReport loggedUserId={loggedUserId} loggedUserTeam={loggedUserTeam} /> :
          <></>
        }
      </PanelContent>
    </Panel>
  )
}

export default UserReportsPanel