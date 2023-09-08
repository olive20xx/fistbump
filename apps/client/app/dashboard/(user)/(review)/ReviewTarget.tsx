import { Button } from '@/components/ui/button'
import { User } from '@/src/__generated__/graphql'
import IconWrite from 'static/icon-write.svg'
import UserNamePhotoCaption from '@/components/ui/UserNamePhotoCaption'
import Photo from '@/components/ui/photo'


function ReviewTarget({ user }: { user: User }) {
  return (
    <div className="justify-between flex items-center">
      <UserNamePhotoCaption userId={user._id} caption={user.teamName} />
      <Button
        href={`/employee/${user._id}/new-review`}
        variant='heavy'
      >
        Write review <Photo className='ml-1' photo={IconWrite} alt='Write icon' width={12} />
      </Button>
    </div>
  )
}

export default ReviewTarget
