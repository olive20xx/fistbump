import { User } from '@/src/__generated__/graphql'
import UserNamePhotoCaption from '@/components/ui/UserNamePhotoCaption'
import { ReviewStatus } from '@/types/review-status'
import { ReviewButton } from '@/components/ui/Dashboard/ReviewButton'


function ReviewTarget({ user, reviewStatus }: { user: User, reviewStatus?: ReviewStatus }) {

  // TODO fix this... need to add a GraphQL return value on server (doesn't need to be in DB)
  if (!reviewStatus) reviewStatus = 'ready'

  return (
    <div className="justify-between flex items-center">
      <UserNamePhotoCaption userId={user._id} caption={user.teamName} />
      <ReviewButton userId={user._id} reviewStatus={reviewStatus} />
    </div>
  )
}

export default ReviewTarget
