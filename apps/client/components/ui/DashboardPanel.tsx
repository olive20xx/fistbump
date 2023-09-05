import { getAllUsers } from '@/lib/get-data-api'
import Targets from '../table/Targets'

async function DashboardPanel({
  assignedReviews,
  cycleId,
  loggedUserFirstName,
}) {
  const users = await getAllUsers()

  return (
    <div className="mt-10 grid grid-cols-3 max-w-screen lg:h-[34rem] max-xl:h-[42rem]">
      <div className="col-span-2 h-full border-2 max-w-screen">
        {users.map((user) => (
          <Targets
            assignedReviews={assignedReviews}
            key={user.fullName}
            loggedUser={loggedUserFirstName}
            user={user}
            cycleId={cycleId}
          />
        ))}
      </div>
      <div className="col-span-1 border-2 h-full max-w-screen"></div>
    </div>
  )
}

export default DashboardPanel
