'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../global.css'
import { useRouter } from 'next/navigation';


function UserItem({ user }) {
  const router = useRouter()

  return (
    <div className="grid grid-cols-3 gap-4 border-b p-2">
      <p className="font-semibold"  >{user.title}</p>
      <p onClick={()=> { router.push(`/employee/${user._id}/newReview`)}}>{user.fullName}</p>
      <p>{user.teamName}</p>
    </div>
    
  );
}

export default function Dashboard() {
  const [users, setUsers] = useState([])

  const getUsersQuery = `{
    getUsers {
      _id
      fullName
      title
      teamName
    }
  }`
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.post('http://localhost:8080/graphql', {
          query: getUsersQuery,
        });

        setUsers(response.data.data.getUsers)
      } catch (error) {
        console.error(error);
      }
    }

    getUsers();
  }, [getUsersQuery])


  return (
    <div>
      <h2 className="text-3xl font-bold bg-pink-400  flex justify-center items-center h-24 text-center">
        List of the users
      </h2>
      <div className="border-2 rounded-xl">
        <div className="grid grid-cols-3 gap-4 font-bold border-b p-2 bg-slate-400">
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
