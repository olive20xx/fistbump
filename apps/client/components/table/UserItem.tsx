'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { queries } from '@/lib/graphql-queries'
import { useLazyQuery, useQuery } from '@apollo/client'

export default function UserItem({ loggedUser, user, cycleId }) {


  const [getUser] = useLazyQuery(queries.GET_USER_BY_NAME)

  async function handleNominatePeer() {
    const { data: { getUserByName: { _id: userId } } } = await getUser({ variables: { fullName: loggedUser } })
  }


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
            <Button onClick={handleNominatePeer} >Nominate peer</Button>
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
    </div>
  )
}
