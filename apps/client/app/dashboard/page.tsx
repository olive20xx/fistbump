import '@/app/global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'
import UserItem from '@/components/table/UserItem'
import { queries } from '@/lib/graphql-queries'
import { UserModel } from '../../../../packages/types/models'
import { apolloClient } from '@/lib/client'
import handleLogout from '@/components/Logout'




export const fetchCache = 'force-no-store'
export default async function Dashboard() {

  const cookieStore = cookies()

  const loggedUser = cookieStore.get('user')

  const { data: { getUsers } } = await apolloClient.query({ query: queries.GET_USERS })

  return (
    <div className="bg-slate-200 h-screen">
      <div className="bg-pink-400 flex px-12 justify-between items-center h-24 text-center mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold">List of the users</h2>
        <div>
          {loggedUser.value ? (
            <div>
              <h2>Hello {loggedUser.value}</h2>
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
      <div className="rounded-xl max-w-7xl mx-auto">
        <div className="grid grid-cols-8 gap-4 font-bold border-b p-2 bg-slate-400">
          <p className="col-span-2">Title</p>
          <p className="col-span-2">Full Name</p>
          <p className="col-span-2">Team Name</p>
        </div>
        {getUsers.map((user) => (
          <UserItem key={user.fullName} loggedUser={loggedUser} user={user} />
        ))}
      </div>
    </div>
  )
}
