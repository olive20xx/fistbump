import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'
import { Report } from '@/src/__generated__/graphql'
import { ManagerReviewContent } from './ManagerReivewContent'

type ManagerReviewPanelProps = {
  reports: Report[]
}

function ManagerReviewPanel({ reports }: ManagerReviewPanelProps) {
  return (

    <Panel className='h-1/5 overflow-auto' size='horizontal' >
      <PanelHeader className='text-black'>
        <PanelTitle>
          Review phase
        </PanelTitle>
      </PanelHeader>
      <PanelContent>
        {reports.map((report: Report) => (
          <ManagerReviewContent key={report._id.targetId} report={report} />
        ))}
      </PanelContent>
    </Panel>
  )
}


export default ManagerReviewPanel