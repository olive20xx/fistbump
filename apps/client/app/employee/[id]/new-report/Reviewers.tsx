import { Header2 } from '@/components/typography/header2'
import UserNamePhotoCaption from '@/components/ui/UserNamePhotoCaption'

async function Reviewers({ reviewerIds }: { reviewerIds: string[] }) {
  return (
    <div className='p-4'>
      <Header2>Reviewers</Header2>
      <div className='gap-2 flex-wrap flex'>
        {reviewerIds.map(async (id, i) => (
          <UserNamePhotoCaption
            className='bg-white p-2 min-w-[200px] rounded-md border-2 border-gray-200 shadow-sm'
            userId={id}
            caption={''}
            key={i} />
        ))}
      </div>
    </div>
  )
}

export default Reviewers