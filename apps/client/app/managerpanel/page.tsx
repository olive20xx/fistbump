import '@/app/global.css'
import DashboardTop from '@/components/ui/Dashboard/DashboardTop'
import { cookies } from 'next/headers'
import { getAllReports, getAllUsers, getCurrentCycle, getFullReport, getUserById } from '@/lib/get-data-api'
import { redirect } from 'next/navigation'
import { UserItem } from '@/components/ui/UserItem'
import { modelTypes } from '@/app/fistbump-types'
import { Report } from '@/src/__generated__/graphql'
import { UserNominations } from '@/components/ui/UserNominations'
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

  const myManageesReports = await getAllReports()

  return (
    <div className="bg-stone-100 h-screen">
      <DashboardTop
        firstName={loggedUserFirstName}
        lastName={loggedUserLastName}
        title={loggedUser.title}
        photo={loggedUser.photo}
        panelTitle={panelTitle}
      />
      {myManageesReports.map((report: Report) => (
        <UserNominations key={report._id.targetId} report={report} cycleId={cycleId} />
      ))}
    </div>
  )
}
