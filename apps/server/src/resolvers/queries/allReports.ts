import Report from '../..//lib/mongoose/models/Report'
import { ApolloContext } from '@/types/devops'

export default async function resolveAllReports(
  _: any,
  __: any,
  context: ApolloContext
) {
  //maybe should be protected later?
  const reports = await Report.find()

  const managerId = context.user?.id

  const myManagees = reports.filter(
    (report) => report.reviews.manager.reviewerId?.toString() === managerId
  )

  return myManagees
}
