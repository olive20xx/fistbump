import User from '../../lib/mongoose/models/User'
import { modelTypes } from '@fistbump/fistbump-types'
import { ApolloContext } from '@/types'
import { Types } from 'mongoose'

export async function resolveUsers(_: any, __: any, context: ApolloContext) {
  if (!context.user?.id || !context.user.email) throw new Error('Unauthorized')
  const loggedUserId = context.user.id

  const users = await User.find()
  if (!users) throw new Error('Error fetching users from database')

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
