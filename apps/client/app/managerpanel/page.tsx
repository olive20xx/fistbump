import '@/app/global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { apolloClient } from '@/lib/apollo-client'
import { queries } from '@/lib/graphql-queries'
import { UserModel } from '../../../../packages/types/models'
import { getAllUsers, getCurrentCycle } from '@/lib/get-data-api'


function UserItem({ user, cycle }) {
  return (
    <div className="grid grid-cols-5 gap-4 border-b p-2 bg-white items-center">
      <p className="font-semibold">{user.title}</p>
      <p>{user.fullName}</p>
      <p>{user.teamName}</p>
      <Link href={`/employee/${user._id}/new-review`}>
        <Button>Write a report</Button>
      </Link>
      <Link href={`/employee/${user._id}/manager-report/${cycle.cycleId}`}>
        <Button>View Full Report</Button>
      </Link>

    </div>
  )
}

export default async function ManagerPanel() {
  const cycle = await getCurrentCycle()
  const users = await getAllUsers()

  return (
    <div className="bg-slate-200 h-screen">
      <div className="bg-pink-400 justify-between flex px-12 gap-2 items-center h-24 text-center mx-auto max-w-7xl">
        <h2 className="text-2xl font-bold">Manager Panel</h2>
        <h2 className="text-3xl font-bold">List of the users</h2>
        <div>
        <Link href={'/dashboard'}>
        <Button>Go to dashboard</Button>
      </Link>
      </div>
      </div>
      <div className="rounded-xl max-w-7xl mx-auto">
        <div className="flex gap-10">{cycle.title.split(',')[0]} <p>End date: {cycle.endDate.split('T')[0]}</p></div>
        <div className="grid grid-cols-10 gap-4 font-bold border-b p-2 bg-slate-400">
          <p className="col-span-2">Title</p>
          <p className="col-span-2">Full Name</p>
          <p className="col-span-2">Team Name</p>
        </div>
        {users.map((user: UserModel) => (
          <UserItem key={user.fullName} user={user} cycle={cycle} />
        ))}
      </div>
    </div>
  )
}
