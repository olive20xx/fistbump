import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'

function UserReviewPanel({ }) {
  return (
    <Panel size='horizontal'>
      <PanelHeader>
        <PanelTitle>Reviews</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-10'>
        UserReviewContent will go here 🤗
      </PanelContent>
    </Panel>
  )
}

export default UserReviewPanel