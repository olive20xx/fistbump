import Link from 'next/link'
import { Button } from './button'
import { getUserById } from '@/lib/get-data-api'
import { Report, Review } from '@/src/__generated__/graphql'
import Photo from './photo'
import Image from 'next/image'
import ProfilePicture from '../../../assets_to_test/profile-picture.png'


interface UserNominationsProps {
  report: Report
  cycleId: String
}

export async function UserNominations({ report, cycleId }: UserNominationsProps) {
  const user = await getUserById(report._id.targetId)
  const nominations = report.reviews.peers
  const nomineesPromises =
    nominations.map(async n => {
      if (n.reviewerId === null) {
        return (

          <Image className='rounded-full mx-2' src={ProfilePicture} width={50} height={50} alt={'profile picture'} />
        )
      } else {
        const nominee = await getUserById(n.reviewerId)
        return (
          <Image className='rounded-full mx-2' src={nominee.photo} width={50} height={50} alt={'profile picture'} />

        )
      }
    })
  const nominees = await Promise.all(nomineesPromises)

  return (
    <div className="flex justify-between bg-white items-center px-12 py-4">
      <div>
        <Image className='rounded-full' src={user.photo} width={50} height={50} alt={'profile picture'} />
      </div>
      <div className='flex'>
        {nominees}
      </div>
    </div >

  )
}
