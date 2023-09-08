import { User } from '@/src/__generated__/graphql'
import UserNamePhotoCaption from '../ui/UserNamePhotoCaption'
import { ReviewButton } from '../ui/Dashboard/ReviewButton'
import { ReviewStatus } from '@/types/review-status'

type SelfReviewProps = {
  user: User
  reviewStatus?: ReviewStatus
  className?: string
}

export default function SelfReview({ user, reviewStatus, className }: SelfReviewProps) {
  if (!reviewStatus) reviewStatus = 'ready'

  return (
    <div className={`justify-between items-center flex ${className}`}>
      <UserNamePhotoCaption userId={user._id} caption="That's you!" />

      <ReviewButton userId={user._id} reviewStatus={reviewStatus} />
    </div>
  )

}