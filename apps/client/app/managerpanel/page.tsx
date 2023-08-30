import '@/app/global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { apolloClient } from '@/lib/apollo-client'
import { queries } from '@/lib/graphql-queries'
import { UserModel } from '../../../../packages/types/models'
import { getAllUsers, getCurrentCycle } from '@/lib/get-data-api'


function UserItem({ user, cycleId }) {
  return (
    <div className="grid grid-cols-4 gap-4 border-b p-2 bg-white items-center">
      <p className="font-semibold">{user.title}</p>
      <p>{user.fullName}</p>
      <p>{user.teamName}</p>
      <Link href={`/employee/${user._id}/manager-report/${cycleId}`}>
        <Button>View Full Report</Button>
      </Link>
    </div>
  )
}

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
        {users.map((user: UserModel) => (
          <UserItem key={user.fullName} user={user} cycleId={cycleId} />
        ))}
      </div>
    </div>
  )
}
