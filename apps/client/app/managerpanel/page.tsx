'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function UserItem({ user }) {
  const cycleId = '131313'

  return (
    <div className="grid grid-cols-4 gap-4 border-b p-2 bg-white items-center">
      <p className="font-semibold">{user.title}</p>
      <p>{user.fullName}</p>
      <p>{user.teamName}</p>
      <Link href={`/employee/${user._id}/manager-report/${cycleId}`}>
        <Button>View Full Report</Button>
      </Link>
    </div>
  )
}

export default function ManagerPanel() {
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
    <div className="bg-slate-200 h-screen">
      <div className="bg-pink-400 flex px-12 justify-between items-center h-24 text-center mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold">List of the users</h2>
      </div>
      <div className="rounded-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-8 gap-4 font-bold border-b p-2 bg-slate-400">
          <p className="col-span-2">Title</p>
          <p className="col-span-2">Full Name</p>
          <p className="col-span-2">Team Name</p>
        </div>
        {users.map((user) => (
          <UserItem key={user.fullName} user={user} />
        ))}
      </div>
    </div>
  )
}
