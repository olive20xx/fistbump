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
import Photo from '@/components/ui/photo'
import DashboardTop from '@/components/ui/DashboardTop'

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
  let loggedUser = true
  let loggedUserId = id.value

  const assignedReviews = await getAssignedReviews(loggedUserId, cycleId)

  const reportVars = {
    targetId: id.value,
  }

  const report = await getFullReport(reportVars.targetId)

  const users = await getAllUsers()
  return (
    <div className="bg-neutral-100 p-20 h-screen">
      <DashboardTop
        firstName={loggedUserFirstName}
        lastName={loggedUserLastName}
        title={user.title}
        photo={user.photo}
      />
      <div className="mt-10 grid grid-cols-3 border-2 max-w-screen lg:h-[34rem] max-xl:h-[42rem]">
        <div className="col-span-2 h-full border-2 max-w-screen"></div>
        <div className="col-span-1 border-2 h-full max-w-screen"></div>
      </div>
    </div>
  )
}

/*
?that was in the div box
        {users.map((user) => (
          <Targets
            assignedReviews={assignedReviews}
            key={user.fullName}
            loggedUser={loggedUserFirstName}
            user={user}
            cycleId={cycleId}
          />
        ))}
?LOG IN LOG OUT
      <Button onClick={handleLogout}> Log out</Button>
      <Link href={'/'}>
        <Button>Log in</Button>
      </Link>
?NOMINATIONBOX
      <NominationBox
        users={users}
        loggedUserId={loggedUserId}
        report={report}
        cycleId={cycleId}
      ></NominationBox>
*/
