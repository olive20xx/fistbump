'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'


export default function Targets({ loggedUser, user, cycleId, assignedReviews }) {
  return (
    <div className="bg-white">
      {assignedReviews.map((review, index) => (
        review._id.targetId === user._id && (
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
                <Link
                  href={`/employee/${user._id}/new-review`}
                  className={`${buttonVariants({
                    variant: 'outline',
                  })} bg-blue-500 text-white`}
                >
                  Write a review
                </Link>
              </p>
            )}
            {loggedUser === user.fullName ? (
              <p>
                <Link
                  href={`/employee/${user._id}/new-review`}
                  className={`${buttonVariants({
                    variant: 'outline',
                  })} bg-blue-500 text-white`}
                >
                  Review Me
                </Link>
              </p>
            ) : (
              <></>
            )}
          </div>
        )
      ))}
    </div>
  )
}
