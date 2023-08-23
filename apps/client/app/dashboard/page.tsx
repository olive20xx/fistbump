'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function UserItem({ user }) {
  const cycleId = '64e46166c1903f7622ec9852'

  return (
    <div className="grid grid-cols-4 gap-4 border-b p-2">
      <p className="font-semibold">{user.title}</p>
      <Link href={`/employee/${user._id}/new-review`}>{user.fullName}</Link>
      <p>{user.teamName}</p>
      <Link href={`/employee/${user._id}/report/${cycleId}`}>
        <Button>Take me to Report Page</Button>
      </Link>
    </div>
  )
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
        })

        setUsers(response.data.data.getUsers)
      } catch (error) {
        console.error(error)
      }
    }

    getUsers()
  }, [getUsersQuery])

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
