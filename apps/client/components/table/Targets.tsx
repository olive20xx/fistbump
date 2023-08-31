'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { mutations } from '@/lib/graphql-queries'
import { useMutation } from '@apollo/client'


export default function Targets({ loggedUser, user, cycleId, loggedUserId, assignedReviews }) {
  const [updatePeerReviews] = useMutation(mutations.UPDATE_PEER_REVIEWS)
  async function handleNominatePeer() {
    const mutationVars = {
      targetId: loggedUserId,
      cycleId: cycleId,
      input:
        { newReviewerId: user._id }
    }
    const { data: { updatePeerReview: { reviews: { peers } } } } = await updatePeerReviews({ variables: mutationVars })
    console.log('reviewerId is changing===>', peers)
  }


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
                {/* add write a review */}
                <Button>Write a review</Button>
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
