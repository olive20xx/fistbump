import Photo from '@/components/ui/photo'
import '@/app/global.css'
//to be deleted
import UserCard from '@/components/ui/user-card'
import { Header2 } from '@/components/typography/header2'
import MetricList from './metric-list'
import { GET_FULLREPORT, GET_USER_BY_ID } from '@/lib/queries'
import { getClient } from '@/lib/client'



// regular variables
const panelPadding = 'p-4'

export default async function Review({ params }: { params: any }) {
  const client = getClient()

  const { data: { getUser } } = await client.query({ query: GET_USER_BY_ID, variables: { id: params.id } })


  const { data: { getReport } } = await client.query({ query: GET_FULLREPORT, variables: { targetId: params.id, cycleId: '131313' } })



  const [firstName] = getUser.fullName.split(' ')


  return (
    <div className="flex  mx-auto max-w-6xl h-screen ">
      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <Header2>Subject of review</Header2>
        <UserCard
          photo={getUser.photo}
          fullName={`${getUser.fullName}`}
          title={getUser.title}
          team={getUser.teamName}
        />
      </div>

      <MetricList report={getReport} target={firstName} />

      <div className={`w-1/4 border-2 ${panelPadding}`}>
        <h1>PROFILE PICTURE</h1>
        <Photo photo={getUser.photo} alt="Motorcycle" />
      </div>
    </div>
  )
}
