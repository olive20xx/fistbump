import '@/app/global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'
import handleLogout from '@/components/Logout'
import NominationBox from '@/components/NominationBox'
import Targets from '@/components/table/Targets'
import {
  getAllUsers,
  getCurrentCycle,
  getAssignedReviews,
  getUserById,
  getFullReport,
} from '@/lib/get-data-api'
import { redirect } from 'next/navigation'
import { queries } from '@/lib/graphql-queries'
import { ReportData, UserData } from '@/types/models'

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

  const user = await getUserById(id.value) as UserData

  let loggedUserFullName = user.fullName
  let loggedUser = true
  let loggedUserId = id.value

  const loggedUserFirstName = loggedUserFullName
    ? loggedUserFullName.split(' ')[0]
    : ''
  const assignedReviews = await getAssignedReviews(loggedUserId, cycleId)

  const reportVars = {
    targetId: id.value,
  }

  const report = await getFullReport(reportVars.targetId) as ReportData

  const users = await getAllUsers() as UserData[]
  return (
    <div className="bg-slate-200 h-screen">
      <div className="bg-pink-400 flex px-12 justify-between items-center h-24 text-center mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold">List of the users</h2>
        <div>
          {loggedUser && loggedUserFullName ? (
            <div>
              <h2>Hello {loggedUserFirstName}</h2>
              <Button onClick={handleLogout}> Log out</Button>
            </div>
          ) : (
            <Link href={'/login'}>
              <Button>Log in</Button>
            </Link>
          )}
        </div>
      </div>
      <div className="rounded-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-8 gap-4 font-bold border-b p-2 bg-slate-400">
          <p className="col-span-2">Title</p>
          <p className="col-span-2">Full Name</p>
          <p className="col-span-2">Team Name</p>
        </div>
        {users.map((user) => (
          <Targets
            assignedReviews={assignedReviews}
            key={user.fullName}
            loggedUser={loggedUserFullName}
            user={user}
            cycleId={cycleId}
          />
        ))}
        <NominationBox
          users={users}
          loggedUserId={loggedUserId}
          report={report}
          cycleId={cycleId}
        />
      </div>
    </div>
  )
}
