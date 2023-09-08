import UserNamePhotoCaption from '@/components/ui/UserNamePhotoCaption'
import { Button } from '@/components/ui/button'
import Photo from '@/components/ui/photo'
import EyeIcon from '@/static/eye-open-green.svg'

type ViewReportProps = {
  loggedUserId: string
  loggedUserTeam: string
}

function ViewReport({ loggedUserId, loggedUserTeam }: ViewReportProps) {
  return (
    <div className='items-center justify-between flex'>
      <UserNamePhotoCaption userId={loggedUserId} caption={loggedUserTeam} />
      <Button href={`/employee/${loggedUserId}/report/`}>View Report <Photo className='ml-2' photo={EyeIcon} alt='icon' width={16} /></Button>
    </div>
  )
}


export default ViewReport