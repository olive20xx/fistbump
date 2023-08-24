'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getCookie, setCookie } from 'cookies-next'

function UserItem({ user }) {
  const cycleId = '64e46166c1903f7622ec9852'

  return (
    <div className="grid grid-cols-4 gap-4 border-b p-2">
      <p className="font-semibold">{user.title}</p>
      <Link href={`/employee/${user._id}/new-review`}>{user.fullName}</Link>
      <p>{user.teamName}</p>
      <Link href={`/employee/${user._id}/report/131313`}>
        <Button>Take me to Report Page</Button>
      </Link>
    </div>
  )
}

export default function Dashboard() {
  const [users, setUsers] = useState([])

  const user = getCookie('user')

  function handleLogout() {
    setCookie('user', '')
  }

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
      <div className=' bg-pink-400 flex px-12 justify-between items-center h-24 text-center'>

        <h2 className="text-3xl font-bold   ">
          List of the users
        </h2>
        <div>
          {user ? <div>
            <h2>
              Hello {user}

            </h2>
            <Button onClick={handleLogout}> Log out</Button>
          </div> : <Link href={'/login'}>  <Button> Please login</Button> </Link>}
        </div>
      </div>
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
