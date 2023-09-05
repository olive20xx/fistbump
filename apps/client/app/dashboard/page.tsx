import '@/app/global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'
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
import { queries } from '@/lib/graphql-queries'

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

  let loggedUserFullName = user.fullName
  let loggedUser = true
  let loggedUserId = id.value

  const loggedUserFirstName = loggedUserFullName ? loggedUserFullName : ''
  const assignedReviews = await getAssignedReviews(loggedUserId, cycleId)

  const reportVars = {
    targetId: id.value,
  }

  const report = await getFullReport(reportVars.targetId)

  const users = await getAllUsers()
  return (
    <div className="bg-neutral-100 p-10 h-screen">
      <div className="bg-neutral-100 justify-between items-center border-2 h-24 grid grid-cols-6">
        <h1 className="text-3xl text-green-mediumgreen font-extrabold col-span-4">
          Team member Panel
        </h1>
        <div className="border-2 col-span-2">
          {loggedUser && loggedUserFullName ? (
            <>
              <h2 className="text-3xl text-green-mediumgreen font-extrabold">
                Hello {loggedUserFirstName}
              </h2>
              <Button onClick={handleLogout}> Log out</Button>
            </>
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
        ></NominationBox>
      </div>
    </div>
  )
}
