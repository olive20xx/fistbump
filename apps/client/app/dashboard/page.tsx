'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getCookie, setCookie } from 'cookies-next'
import UserItem from '@/components/table/UserItem'
 

export default function Dashboard() {
  const [users, setUsers] = useState([])

  const loggedUser = getCookie('user')

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
    <div className="bg-slate-200 h-screen">
      <div className="bg-pink-400 flex px-12 justify-between items-center h-24 text-center mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold">List of the users</h2>
        <div>
          {loggedUser ? (
            <div>
              <h2>Hello {loggedUser}</h2>
              <Button onClick={handleLogout}> Log out</Button>
            </div>
          ) : (
            <Link href={'/login'}>
              {' '}
              <Button>Log in</Button>{' '}
            </Link>
          )}
        </div>
      </div>
      <div className="border-2 rounded-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-8 gap-4 font-bold border-b p-2 bg-slate-400">
          <p className='col-span-2'>Title</p>
          <p className='col-span-2'>Full Name</p>
          <p className='col-span-2'>Team Name</p>
        </div>
        {users.map((user) => (
          <UserItem key={user.fullName} loggedUser={loggedUser} user={user} />
        ))}
      </div>
    </div>
  )
}
