import '@/app/global.css'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import handleLogout from '@/components/Logout'
import NominationBox from '@/components/Combobox'
import Targets from '@/components/table/Targets'
import {
  getAllUsers,
  getCurrentCycle,
  getAssignedReviews,
  getUserById,
  getFullReport,
} from '@/lib/get-data-api'
import { redirect } from 'next/navigation'
import DashboardTop from '@/components/ui/DashboardTop'
import DashboardPanel from '@/components/ui/DashboardPanel'

export const revalidate = 0

export default async function Dashboard() {
  const cookieStore = cookies()

  const cycle = await getCurrentCycle()
  const cycleId = cycle._id

  const token = cookieStore.get('token')
  const id = cookieStore.get('userId')

  if (token === undefined || !token.value || id === undefined || !id.value) {
    redirect('/')
  }

  const user = await getUserById(id.value)

  let loggedUserFirstName = user.fullName.split(' ')[0]
  let loggedUserLastName = user.fullName.split(' ')[1]
  let loggedUserId = id.value

  const assignedReviews = await getAssignedReviews(loggedUserId, cycleId)

  const reportVars = {
    targetId: id.value,
  }

  const report = await getFullReport(reportVars.targetId)

  const users = await getAllUsers()
  return (
    <div className="bg-neutral-100 p-20 h-screen">
      <div className="absolute top-0 flex gap-10">
        <Button onClick={handleLogout}> Log out</Button>
        <Link href={'/'}>
          <Button>Log in</Button>
        </Link>
        <NominationBox
          users={users}
          loggedUserId={loggedUserId}
          report={report}
          cycleId={cycleId}
        ></NominationBox>
      </div>
      <DashboardTop
        firstName={loggedUserFirstName}
        lastName={loggedUserLastName}
        title={user.title}
        photo={user.photo}
      />
      <DashboardPanel
        assignedReviews={assignedReviews}
        cycleId={cycleId}
        loggedUserFirstName={loggedUserFirstName}
      />
    </div>
  )
}
