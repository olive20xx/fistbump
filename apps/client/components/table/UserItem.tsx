import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function UserItem({ loggedUser, user }) {
  const cycleId = '131313'

  return (
    <div className="bg-white">
      <div className="grid grid-cols-8 gap-4 border-b p-2 items-center">
        <p className="font-semibold col-span-2">{user.title}</p>
        <p className="col-span-2">{user.fullName}</p>
        <p className="col-span-2">{user.teamName}</p>
        {loggedUser === user.fullName ? (
          <p>
            <Link href={`/employee/${user._id}/report/${cycleId}`}>
              <Button variant="destructive">View my report</Button>
            </Link>
          </p>
        ) : (
          <p>
            <Button>Nominate peer</Button>
          </p>
        )}
        <p>
          <Link
            href={`/employee/${user._id}/new-review`}
            className={`${buttonVariants({
              variant: 'outline',
            })} bg-blue-500 text-white`}
          >
            Write Review
          </Link>
        </p>
      </div>
    </div>
  )
}
