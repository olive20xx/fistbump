import '@/app/global.css'
import DashboardTop from '@/components/ui/Dashboard/DashboardTop'
import { cookies } from 'next/headers'
import { getAllReports, getCurrentCycle, getUserById } from '@/lib/get-data-api'
import { redirect } from 'next/navigation'
import ManagerReportsPanel from './(manager)/ManagerReportsPanel'
import ManagerNominationPanel from './(manager)/(nomination)/ManagerNominationPanel'
import ManagerReviewPanel from './(manager)/(review)/ManagerReviewPanel'

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
    <div className='w-[1220px] mx-auto'>

      <DashboardTop
        firstName={loggedUserFirstName}
        lastName={loggedUserLastName}
        title={loggedUser.title}
        photo={loggedUser.photo}
        panelTitle={panelTitle}
      />
      <div className=' pt-9 flex justify-between h-[calc(100vh-8rem)]'>
        <div className="gap-6 flex-col flex" id="horizontal">
          <ManagerNominationPanel reports={myManageesReports}  ></ManagerNominationPanel>
          <ManagerReviewPanel reports={myManageesReports}></ManagerReviewPanel>
        </div>
        <div id="vertical">
          <ManagerReportsPanel myManageesReports={myManageesReports} />
        </div>
      </div >
    </div>
  )
}
