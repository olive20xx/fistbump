import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'
import { Report } from '@/src/__generated__/graphql'
import { ManagerNominationContent } from './ManagerNominationContent'
import { getUserById } from '@/lib/get-data-api'

type ManagerNominationPanelProps = {
  reports: Report[]
}

function ManagerNominationPanel({ reports }: ManagerNominationPanelProps) {
  return (
    <Panel className='h-1/5 overflow-auto mb-12' size='horizontal' >
      <PanelHeader className='text-black' >
        <PanelTitle>
          Nomination phase
        </PanelTitle>
      </PanelHeader >
      <PanelContent>
        {reports.map((report: Report) => (
          <ManagerNominationContent key={report._id.targetId} report={report} />
        ))}
      </PanelContent>
    </Panel >
  )
}


export default ManagerNominationPanel