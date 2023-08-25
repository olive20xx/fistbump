import '../global.css'
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { GET_USERS } from '@/lib/queries';
import { getClient } from '@/lib/client';

export const fetchCache = 'force-no-store'

function UserItem({ user }) {


  const cycleId = "64e881e98bca6cf04694cc9e"


  return (
    <div className="grid grid-cols-4 gap-4 border-b p-2">
      <p className="font-semibold"  >{user.title}</p>
      <Link href={`/employee/${user._id}/newReview`}>{user.fullName}</Link>
      <p>{user.teamName}</p>
      <Link href={`/employee/${user._id}/report/${cycleId}`}><Button>Take me to Report Page</Button></Link>
    </div>

  );
}

export default async function Dashboard() {

  const client = getClient()

  const { data: { getUsers: users } } = await client.query({ query: GET_USERS })


  return (
    <div>
      <h2 className="text-3xl font-bold bg-pink-400  flex justify-center items-center h-24 text-center">
        List of the users
      </h2>
      <div className="border-2 rounded-xl">
        <div className="grid grid-cols-4 gap-4 font-bold border-b p-2 bg-slate-400">
          <p>Title</p>
          <p>Full Name</p>
          <p>Team Name</p>
        </div>
        {users.map((user) => (
          <UserItem key={user.fullName} user={user} />
        ))}
      </div>
    </div>
  )
}
