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
import Photo from '@/components/ui/photo'
import UserCard from '@/components/ui/UserCard'

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

  let loggedUserFullName = user.fullName.split(' ')[0]
  let loggedUserLastName = user.fullName.split(' ')[1]
  let loggedUser = true
  let loggedUserId = id.value

  let userPhoto = user.photo
  let userTitle = user.title

  console.log(userPhoto)

  const loggedUserFirstName = loggedUserFullName ? loggedUserFullName : ''
  const assignedReviews = await getAssignedReviews(loggedUserId, cycleId)

  const reportVars = {
    targetId: id.value,
  }

  const report = await getFullReport(reportVars.targetId)

  const users = await getAllUsers()
  return (
    <div className="bg-neutral-100 p-20 h-screen">
      <div className="bg-neutral-100 justify-between items-center h-24 grid grid-cols-6">
        <h1 className="text-3xl text-green-mediumgreen font-extrabold col-span-4">
          Team member Panel
        </h1>
        <div className="flex col-span-2 justify-around">
          <div className="">
            <h2 className="text-3xl text-green-mediumgreen font-extrabold">
              Hello {loggedUserFirstName}
            </h2>
            <h2 className="text-3xl text-green-mediumgreen font-extrabold">
              {loggedUserLastName}
            </h2>
            <p className="text-sm text-gray-300">{userTitle}</p>
          </div>
          <Photo width={92} height={92} photo={userPhoto} />
        </div>
      </div>
      <div className="rounded-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-8 gap-4 font-bold border-b bg-slate-400">
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
      <Button onClick={handleLogout}> Log out</Button>
      <Link href={'/'}>
        <Button>Log in</Button>
      </Link>
    </div>
  )
}
