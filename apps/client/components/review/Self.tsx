import { User } from '@/src/__generated__/graphql'
import { Button } from "../ui/button"
import Photo from '../ui/photo'
import UserNamePhotoCaption from '../ui/UserNamePhotoCaption'
import IconWrite from 'static/icon-write.svg'

type SelfReviewProps = {
  user: User
  className?: string
}

export default function SelfReview({ user, className }: SelfReviewProps) {
  return (
    <div className={`justify-between items-center flex ${className}`}>
      <UserNamePhotoCaption userId={user._id} caption="That's you!" />

      <Button
        href={`/employee/${user._id}/new-review`}
        variant='heavy'
      >
        Write review <Photo className='ml-1' photo={IconWrite} alt='Write icon' width={12} />
      </Button>
    </div>
  )

}