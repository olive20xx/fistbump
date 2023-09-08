import '@/app/global.css'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import handleLogout from '@/components/Logout'
import NominationBox from '@/app/dashboard/(user)/(nomination)/NominationBox'
import {
  getAllUsers,
  getCurrentCycle,
  getAssignedReviews,
  getUserById,
  getFullReport,
} from '@/lib/get-data-api'
import { redirect } from 'next/navigation'
import SelfReview from '@/components/review/Self'
import { User } from '@/src/__generated__/graphql'

import ReviewTarget from '@/app/dashboard/(user)/(review)/ReviewTarget'
import NominationPhase from '@/components/ui/Dashboard/NominationPhase'
import UserNominationContent from '../dashboard/(user)/(nomination)/UserNominationContent'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '@/components/ui/Panel'

export const revalidate = 0

export default async function Dashboard() {
  const cookieStore = cookies()

  const token = cookieStore.get('token')
  const id = cookieStore.get('userId')

  if (token === undefined || !token.value || id === undefined || !id.value) {
    redirect('/')
  }

  const loggedUser = await getUserById(id.value)


  let loggedUserFullName = loggedUser.fullName
  let isLogged = true
  let loggedUserId = id.value
  const loggedUserFirstName = loggedUserFullName
    ? loggedUserFullName.split(' ')[0]
    : ''


  const loggedUserLastName = loggedUserFullName
    ? loggedUserFullName.split(' ')[1]
    : ''

  const assignedReviews = await getAssignedReviews(loggedUserId)
  const assignedUsers = await Promise.all(
    assignedReviews.map(async (review) => await getUserById(review._id.targetId))
  )


  const reportVars = {
    targetId: id.value,
  }
  const loggedUserReport = await getFullReport(reportVars.targetId)
  const peers = await getAllUsers()
  console.log('==== peers', peers)

  return (
    <div className="bg-slate-200 h-screen">
      <div className="bg-pink-400 flex px-12 justify-between items-center h-24 text-center mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold">List of the users</h2>
        <div>
          {isLogged && loggedUserFullName ? (
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
        {assignedUsers.map((user: User) => (
          <ReviewTarget
            key={user._id}
            user={user}
          />
        ))}
        <SelfReview user={loggedUser}></SelfReview>
        <div className='my-12' />
        <Panel>
          <PanelHeader>
            <PanelTitle>Nominations</PanelTitle>
          </PanelHeader>
          <PanelContent className='p-5'>
            <UserNominationContent users={peers} report={loggedUserReport} loggedUserId={loggedUserId} />
          </PanelContent>
        </Panel>
      </div>
    </div>
  )
}
