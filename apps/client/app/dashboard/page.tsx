import '@/app/global.css'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import handleLogout from '@/components/Logout'
import NominationBox from '@/components/Combobox'
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
import DashboardTop from '@/components/ui/Dashboard/DashboardTop'
import DashboardContent from '@/components/ui/Dashboard/DashboardContent'
import NavBar from '@/components/ui/Dashboard/Navbar'

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

  const assignedReviews = await getAssignedReviews(loggedUserId, cycleId)
  const assignedUsers = await Promise.all(
    assignedReviews.map(async (review) => await getUserById(review._id.targetId))
  )

  const reportVars = {
    targetId: id.value,
  }
  const loggedUserReport = await getFullReport(reportVars.targetId)
  const peers = await getAllUsers()
 
  return (
    <>
      <NavBar />
      <div className="bg-neutral-100 ml-20 pt-10 p-20 h-screen">
        <DashboardTop
          firstName={loggedUserFirstName}
          lastName={loggedUserLastName}
          title={loggedUser.title}
          photo={loggedUser.photo}
        />
        <DashboardContent />
      </div>
    </>
  )
}
