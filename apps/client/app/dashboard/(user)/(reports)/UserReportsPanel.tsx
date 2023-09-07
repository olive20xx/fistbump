import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'

function UserReportsPanel({ }) {
  return (
    <Panel size='vertical'>
      <PanelHeader variant='highlight'>
        <PanelTitle>My Reports</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-10'>
        ReportsContent will go here 🤗
      </PanelContent>
    </Panel>
  )
}

export default UserReportsPanel