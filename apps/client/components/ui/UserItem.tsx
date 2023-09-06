import Link from 'next/link'
import { Button } from './button'

export function UserItem({ user, cycleId }) {
  return (
    <div className="grid grid-cols-8 gap-4 border-b p-2 bg-white items-center">
      <p className="font-semibold col-span-2">{user.title}</p>
      <p className="col-span-2">{user.fullName}</p>
      <p className="col-span-2">{user.teamName}</p>
      <Link href={`/employee/${user._id}/manager-report/${cycleId}`}>
        <Button>View Full Report</Button>
      </Link>
      <Link href={`/employee/${user._id}/new-report`}>
        <Button>Write Report</Button>
      </Link>
    </div>
  )
}
