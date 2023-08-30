import Photo from '@/components/ui/photo'
import '@/app/global.css'
//to be deleted
import UserCard from '@/components/ui/user-card'
import { Header2 } from '@/components/typography/header2'
import MetricList from './metric-list'
import { ReportData } from '@/types/models'
import { getCurrentCycle, getFullReport, getUserById } from '@/lib/get-data-api'

// regular variables
const panelPadding = 'p-4'

export default async function Review({ params }: { params: any }) {
  const targetId = params.id
  const cycle = await getCurrentCycle()
  const cycleId = cycle._id

  const user = await getUserById(targetId)
  const fullReport = await getFullReport(targetId, cycleId)
  const [firstName] = user.fullName.split(' ')

  return (
    <div className="flex  mx-auto max-w-6xl h-screen ">
      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <Header2>Subject of review</Header2>
        <UserCard
          photo={user.photo}
          fullName={`${user.fullName}`}
          title={user.title}
          team={user.teamName}
        />
      </div>
      <MetricList report={fullReport as ReportData} target={firstName} />
      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <h1>PROFILE PICTURE</h1>
        <Photo photo={user.photo} alt="photo of the user" />
      </div>
    </div>
  )
}
