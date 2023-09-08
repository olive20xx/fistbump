import Cycle from '../../lib/mongoose/models/Cycle'
import User from '../../lib/mongoose/models/User'
import { modelTypes } from '../../types/export'
import { ApolloContext } from '@/types/devops'
import { Types } from 'mongoose'
import Report from '../..//lib/mongoose/models/Report'
import Team from '../../lib/mongoose/models/Team'

export async function resolveUsers(_: any, __: any, context: ApolloContext) {
  if (!context.user?.id || !context.user.email) throw new Error('Unauthorized')
  const loggedUserId = context.user.id

  const users = await User.find()
  if (!users) throw new Error('Error fetching users from database')

  const managerOf = await Team.find({ managerId: loggedUserId })
  let isManager = managerOf.length > 0

  /// for the manager to find managees
  if (isManager) {
    let cycleId = ''

    if (cycleId === '') {
      const cycle = await Cycle.getCurrentCycle()
      if (cycle === null) throw new Error('No current cycle found')
      cycleId = cycle._id.toString()
    }

    const allUsersIds = users.map((user) => user._id)
    const allUsersReports = await Report.find({
      '_id.cycleId': cycleId,
      '_id.targetId': { $in: allUsersIds },
    })

    //usersIManage =====> array of the reports
    const usersIManage = allUsersReports.filter(
      (user) => user.reviews.manager.reviewerId?.toString() === loggedUserId
    )

    //usersIdsIManage =====> array of the targetId
    const usersIdsIManage = usersIManage.map((user) => user._id.targetId)

    //array of the User that I manage
    const myManagees = await User.find({
      _id: { $in: usersIdsIManage },
    })

    return myManagees
    ///
  } else {
    const allUsersExceptSelf = users.filter(
      (user) => user._id.toString() !== loggedUserId
    )

    const filteredUserData = allUsersExceptSelf.map((user) => {
      const data: Partial<modelTypes.UserModel> & { _id: Types.ObjectId } = {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        title: user.title,
        photo: user.photo,
        teamName: user.teamName,
      }
      return data
    })

    return filteredUserData
  }
}
