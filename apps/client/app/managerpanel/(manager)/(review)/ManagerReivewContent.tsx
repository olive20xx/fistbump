import { getUserById } from '@/lib/get-data-api'
import { Report } from '@/src/__generated__/graphql'
import ProfilePicture from '../../../../../assets_to_test/profile-picture.png'
import { CirclePhoto } from '@/components/ui/Managerpanel/CirclePhoto'




interface ManagerReviewContentProps {
  report: Report
}





export async function ManagerReviewContent({ report }: ManagerReviewContentProps) {
  console.log({ report })
  const user = await getUserById(report._id.targetId)
  const nominations = report.reviews.peers
  const nomineesPromises =
    nominations.map(async n => {
      if (n.reviewerId === null) {
        return (
          <CirclePhoto src={ProfilePicture} alt={'profile picture'} toolTipContent={'Noone yet'}></CirclePhoto>
        )
      } else {
        const nominee = await getUserById(n.reviewerId)
        return (
          <CirclePhoto variant={n.submitted ? 'green' : 'gray'} src={nominee.photo} alt={'profile picture'} toolTipContent={nominee.fullName}></CirclePhoto>
        )
      }
    })
  const nominees = await Promise.all(nomineesPromises)

  return (
    <div className="flex justify-between bg-white items-center px-12 py-1">
      <div>
        <CirclePhoto src={user.photo} alt={'profile picture'} toolTipContent={user.fullName}></CirclePhoto>
      </div>
      <div className='flex'>
        {nominees}
      </div>
    </div >
  )
}