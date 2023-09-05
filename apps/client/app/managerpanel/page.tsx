import '@/app/global.css'
import { UserItem } from '@/components/UserItem'
import { modelTypes } from '@/fistbump-types/'
import { getAllUsers, getCurrentCycle } from '@/lib/get-data-api'
export default async function ManagerPanel() {
  const cycle = await getCurrentCycle()
  const cycleId = cycle._id

  const users = await getAllUsers()

  return (
    <div className="bg-slate-200 h-screen">
      <div className="bg-pink-400 flex px-12 justify-between items-center h-24 text-center mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold">List of the users</h2>
      </div>
      <div className="rounded-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-8 gap-4 font-bold border-b p-2 bg-slate-400">
          <p className="col-span-2">Title</p>
          <p className="col-span-2">Full Name</p>
          <p className="col-span-2">Team Name</p>
        </div>
        {users.map((user: modelTypes.UserModel) => (
          <UserItem key={user.fullName} user={user} cycleId={cycleId} />
        ))}
      </div>
    </div>
  )
}
