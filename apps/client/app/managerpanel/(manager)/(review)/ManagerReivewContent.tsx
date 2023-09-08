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
  const reviewers = report.reviews.peers
  const nomineesPromises =
    reviewers.map(async r => {
      if (r.reviewerId === null) {
        return (
          <CirclePhoto key={r._id} src={ProfilePicture} alt={'profile picture'} toolTipContent={'Noone yet'}></CirclePhoto>
        )
      } else {
        const nominee = await getUserById(r.reviewerId)
        return (
          <CirclePhoto key={nominee._id} variant={r.submitted ? 'green' : 'gray'} src={nominee.photo} alt={'profile picture'} toolTipContent={nominee.fullName}></CirclePhoto>
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