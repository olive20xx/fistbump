import '@/app/global.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cookies } from 'next/headers'
import UserItem from '@/components/table/UserItem'
import { queries } from '@/lib/graphql-queries'
import { apolloClient } from '@/lib/apollo-client'
import handleLogout from '@/components/Logout'

export const fetchCache = 'force-no-store'
export default async function Dashboard() {
  const cookieStore = cookies()

  const { data: { getCurrentCycle } } = await apolloClient.query({ query: queries.GET_CURRENT_CYCLE })
  const cycleId = getCurrentCycle._id

  let loggedUserFullName
  let loggedUser

  const userCookie = cookieStore.get('user');
  if (userCookie === undefined) {
    loggedUser = null
    loggedUserFullName = null
  }
  if (userCookie && userCookie.value) {
    loggedUserFullName = userCookie.value
    loggedUser = true
  }

  const loggedUserFirstName = loggedUserFullName ? loggedUserFullName.split(' ')[0] : '';


  const { data: { getUsers } } = await apolloClient.query({ query: queries.GET_USERS })
  const { data: { getUserByName: { _id: loggedUserId } } } = await apolloClient.query({ query: queries.GET_USER_BY_NAME, variables: { fullName: loggedUserFullName } })


  return (
    <div className="bg-slate-200 h-screen">
      <div className="bg-pink-400 flex px-12 justify-between items-center h-24 text-center mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold">List of the users</h2>
        <div>
          {loggedUser && loggedUserFullName ? (
            <div>
              <h2>Hello {loggedUserFirstName}</h2>
              <Button onClick={handleLogout}> Log out</Button>
            </div>
          ) : (
            <Link href={'/login'}>
              <Button>Log in</Button>
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
          <UserItem
            key={user.fullName}
            loggedUser={loggedUserFullName}
            user={user}
            cycleId={cycleId}
            loggedUserId={loggedUserId}
          />
        ))}
      </div>
    </div>
  )
}
