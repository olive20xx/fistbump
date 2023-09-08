import { Cycle, Report, User } from '@/src/__generated__/graphql'
import { queries } from './graphql-queries'
import { apolloClient } from '@/lib/apollo-client'

//** FOR SERVER COMPONENTS **
// client components use 'useQuery' or 'useMutation'

// **** users ***
export async function getAllUsers(): Promise<User[]> {
  const query = queries.GET_USERS

  const result = await apolloClient.query({ query })
  if (!result.data.getUsers) throw new Error(`❌ getAllUsers: users not found`)

  const users = result.data.getUsers
  return users
}

export async function getUserById(id: string): Promise<User> {
  const query = queries.GET_USER_BY_ID
  const variables = { id }

  const result = await apolloClient.query({ query, variables })

  if (!result.data.getUser)
    throw new Error(`❌ getUserById: user not found, id ${id}`)

  const user = result.data.getUser
  return user
}

export async function login(email: string, password: string): Promise<object> {
  const query = queries.LOGIN
  const variables = { email, password }

  const result = await apolloClient.query({ query, variables })

  if (!result.data.login)
    throw new Error(`❌ Login: wrong credentials, email ${email}`)

  const response = result.data.login
  return response
}

export async function getUserFullName(id: string): Promise<string> {
  const query = queries.GET_USER_FULLNAME_BY_ID
  const variables = { id }

  const result = await apolloClient.query({ query, variables })

  if (!result.data.getUser)
    throw new Error(`❌ getUserFullName: user not found, id ${id}`)

  const fullName = result.data.getUser?.fullName
  return fullName
}

export async function getUserByName(fullName: string): Promise<string> {
  const query = queries.GET_USER_BY_NAME
  const variables = { fullName }
  const result = await apolloClient.query({ query, variables })
  const userId = result.data.getUserByName._id
  return userId
}
// *** reports ***
export async function getFullReport(
  targetId: string,
  cycleId?: string
): Promise<Report> {
  const query = queries.GET_FULL_REPORT
  const variables = { targetId, cycleId }

  const result = await apolloClient.query({
    query,
    variables,
  })
  if (!result.data.getReport)
    throw new Error(`❌ getFullReport: report not found`)

  const report = result.data.getReport
  return report
}

export async function getEmployeeReport(
  targetId: string,
  cycleId: string
): Promise<Report> {
  const query = queries.GET_REPORT_FOR_EMPLOYEE
  const variables = { targetId, cycleId }

  const result = await apolloClient.query({ query, variables })
  if (!result.data.getReport)
    throw new Error(`❌ getEmployeeReport: report not found`)

  const report = result.data.getReport
  return report
}

export async function getAssignedReviews(reviewerId: string) {
  const query = queries.GET_REVIEWS_TO_WRITE
  const variables = { reviewerId }
  const result = await apolloClient.query({ query, variables })
  const assignedReviews = result.data.getAssignedReviews
  return assignedReviews
}

// *** cycles ***
export async function getCurrentCycle(): Promise<Cycle> {
  const query = queries.GET_CURRENT_CYCLE

  const result = await apolloClient.query({ query })
  if (!result.data.getCurrentCycle)
    throw new Error(`❌ getCurrentCycle: cycle not found`)

  const cycle = result.data.getCurrentCycle
  return cycle
}

export async function getAllReports(): Promise<Report[]> {
  const query = queries.GET_ALL_REPORTS

  const result = await apolloClient.query({ query })
  if (!result.data.getAllReports)
    throw new Error(`❌ Reports: reports are not found`)

  const reports = result.data.getAllReports
  return reports
}
