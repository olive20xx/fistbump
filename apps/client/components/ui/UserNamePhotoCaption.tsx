import Photo from './photo'
import { getUserById } from '@/lib/get-data-api'

type UNPCProps = {
  userId: string
  caption: string
  className?: string
}

async function UserNamePhotoCaption({ userId, caption, className }: UNPCProps) {
  if (!userId) return

  const user = await getUserById(userId)
  const { fullName, photo } = user

  return (
    <div className={`flex ${className}`}>
      <Photo className='rounded-full' photo={photo} alt={`Picture of ${fullName}`} />
      <div className='ml-3 justify-center flex-col flex'>
        <h4 className='text-[16px]'>{fullName}</h4>
        <p className='text-gray text-[12px]'>{caption}</p>
      </div>
    </div>
  )
}

export default UserNamePhotoCaption