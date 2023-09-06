'use client'
import { buttonVariants } from '@/components/ui/button'
import { User } from '@/src/__generated__/graphql'
import Link from 'next/link'


export default function Targets({ user }: { user: User }) {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-8 gap-4 border-b p-2 items-center">
        <p className="font-semibold col-span-2">{user.title}</p>
        <p className="col-span-2">{user.fullName}</p>
        <p className="col-span-2">{user.teamName}</p>
        <Link
          href={`/employee/${user._id}/new-review`}
          className={`${buttonVariants({
            variant: 'outline',
          })} bg-blue-500 text-white`}
        >
          Write a review
        </Link>
      </div>
    </div>

  )
}
