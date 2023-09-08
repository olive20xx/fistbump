import '@/app/global.css'
import DashboardTop from '@/components/ui/Dashboard/DashboardTop'
import { cookies } from 'next/headers'
import { getAllUsers, getCurrentCycle, getUserById } from '@/lib/get-data-api'
import { redirect } from 'next/navigation'
import { UserItem } from '@/components/ui/UserItem'
import { modelTypes } from '@/app/fistbump-types'
import ManagerReportPanel from './(manager)/(reports)/ManagerReportPanel'
export default async function ManagerPanel() {
  const panelTitle = `Manager Panel`
  const cookieStore = cookies()

  const token = cookieStore.get('token')
  const id = cookieStore.get('userId')

  if (token === undefined || !token.value || id === undefined || !id.value) {
    redirect('/')
  }
  const loggedUserId = id.value
  const loggedUser = await getUserById(id.value)

  let loggedUserFullName = loggedUser.fullName

  const loggedUserFirstName = loggedUserFullName
    ? loggedUserFullName.split(' ')[0]
    : ''

  const loggedUserLastName = loggedUserFullName
    ? loggedUserFullName.split(' ')[1]
    : ''

  const cycle = await getCurrentCycle()
  const cycleId = cycle._id

  const users = await getAllUsers()

  return (
    <div className="bg-stone-100 h-screen">
      <DashboardTop
        firstName={loggedUserFirstName}
        lastName={loggedUserLastName}
        title={loggedUser.title}
        photo={loggedUser.photo}
        panelTitle={panelTitle}
      />
      <ManagerReportPanel />

      ))}
    </div>
  )
}

// {users.map((user: modelTypes.UserModel) => (
//   <UserItem key={user.fullName} user={user} cycleId={cycleId} />