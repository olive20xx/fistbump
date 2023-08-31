import { Cycle, Report, User } from '@/src/__generated__/graphql'
import { queries } from './graphql-queries'
import { apolloClient } from '@/lib/apollo-client'

//** FOR SERVER COMPONENTS **
// client components use 'useQuery' or 'useMutation'

// **** users ***
export async function getAllUsers(): Promise<User[]> {
  const query = queries.GET_USERS

  const result = await apolloClient.query({ query })

  const users = result.data.getUsers
  return users
}

export async function getUserById(id: string): Promise<User> {
  const query = queries.GET_USER_BY_ID
  const variables = { id }

  const result = await apolloClient.query({ query, variables })

  const user = result.data.getUser
  return user
}

export async function getUserByEmail(email: string): Promise<string> {
  const query = queries.GET_USER_BY_EMAIL
  const variables = { email }

  const result = await apolloClient.query({ query, variables })

  const fullName = result.data.getUserByEmail.fullName
  return fullName
}

export async function getUserFullName(id: string): Promise<string> {
  const query = queries.GET_USER_FULLNAME_BY_ID
  const variables = { id }

  const result = await apolloClient.query({ query, variables })

  const fullName = result.data.getUser.fullName
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
  cycleId: string
): Promise<Report> {
  const query = queries.GET_FULL_REPORT
  const variables = { targetId, cycleId }

  const result = await apolloClient.query({ query, variables })

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

  const report = result.data.getReport
  return report
}

export async function getAssignedReviews(reviewerId: string, cycleId: string) {
  const query = queries.GET_REVIEWS_TO_WRITE
  const variables = { reviewerId, cycleId }
  const result = await apolloClient.query({ query, variables })
  const assignedReviews = result.data.getAssignedReviews
  return assignedReviews
}

// *** cycles ***
export async function getCurrentCycle(): Promise<Cycle> {
  const query = queries.GET_CURRENT_CYCLE

  const result = await apolloClient.query({ query })

  const cycle = result.data.getCurrentCycle
  return cycle
}
