import SelfReview from '@/components/review/Self'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'
import { User } from '@/src/__generated__/graphql'

type UserReviewPanelProps = {
  loggedUser: User
}

function UserReviewPanel({ loggedUser }: UserReviewPanelProps) {
  return (
    <Panel size='horizontal'>
      <PanelHeader>
        <PanelTitle>Reviews</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-10'>
        <SelfReview user={loggedUser} />
      </PanelContent>
    </Panel>
  )
}

export default UserReviewPanel