import Photo from '@/components/ui/photo'
import '@/app/global.css'
//to be deleted
import IndianScout from '../../../../../assets_to_test/scout-rogue.jpeg'
import UserCard from '@/components/ui/user-card'
import { Header2 } from '@/components/typography/header2'
import MetricList from './metric-list'
import { ReviewData } from '@/types/models'
import { getReport, getUser } from '@/lib/fetch'
import { getFullReportQuery } from '@/lib/queries'

const userQuery = `
query getUser($id: String) {
  getUser(id:$id) {
    fullName
    title
    teamName
    photo
}}`

// regular variables
const panelPadding = 'p-4'

export default async function Review({ params }: { params: any }) {
  const user = await getUser(userQuery, { id: params.id })
  const [firstName, lastName] = user.fullName.split(' ')

  const reportVariables = { targetId: params.id, cycleId: '131313' }
  const report = await getReport(getFullReportQuery, reportVariables)

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

      <MetricList report={report} target={firstName} />

      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <h1>PROFILE PICTURE</h1>
        <Photo photo={IndianScout} alt="Motorcycle" />
      </div>
    </div>
  )
}
