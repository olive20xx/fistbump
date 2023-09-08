import { Button } from '@/components/ui/button'
import { User } from '@/src/__generated__/graphql'
import UserNamePhotoCaption from '@/components/ui/UserNamePhotoCaption'


function ReviewTarget({ user }: { user: User }) {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-8 gap-4 border-b p-2 items-center">
        <UserNamePhotoCaption userId={user._id} caption={user.teamName} />
        <Button
          href={`/employee/${user._id}/new-review`}
          variant='outline'
          className='bg-blue-500 text-white'>
          Write a review
        </Button>
      </div>
    </div >
  )
}

export default ReviewTarget
