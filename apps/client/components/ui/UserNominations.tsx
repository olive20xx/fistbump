import { getUserById } from '@/lib/get-data-api'
import { Report, Review } from '@/src/__generated__/graphql'

import Image from 'next/image'
import ProfilePicture from '../../../assets_to_test/profile-picture.png'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'




interface UserNominationsProps {
  report: Report
}

export async function UserNominations({ report }: UserNominationsProps) {
  const user = await getUserById(report._id.targetId)
  const nominations = report.reviews.peers
  const nomineesPromises =
    nominations.map(async n => {
      if (n.reviewerId === null) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image className='rounded-full mx-2' src={ProfilePicture} width={50} height={50} alt={'profile picture'} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Noone yet</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      } else {
        const nominee = await getUserById(n.reviewerId)
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image className='rounded-full mx-2' src={nominee.photo} width={50} height={50} alt={'profile picture'} />
              </TooltipTrigger>
              <TooltipContent><p>{nominee.fullName}</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>

        )
      }
    })
  const nominees = await Promise.all(nomineesPromises)

  return (
    <div className="flex justify-between bg-white items-center px-12 py-4">
      <div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Image className='rounded-full' src={user.photo} width={50} height={50} alt={'profile picture'} />              </TooltipTrigger>
            <TooltipContent>
              <p>{user.photo}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='flex'>
        {nominees}
      </div>
    </div >
  )
}
