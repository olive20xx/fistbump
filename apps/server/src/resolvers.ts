import Report from './lib/mongoose/models/Report'
import User from './lib/mongoose/models/User'
import { Input } from './lib/types/User'

export const resolvers = {
  Query: {
    hello: () => {
      return 'Hello world!'
    },
    getUsers: async () => {
      try {
        const users = await User.find()
        return users
      } catch (error) {
        throw new Error('Error fetching users from the database')
      }
    },
    getUser: async (_: any, { id }: { id: String }) => {
      try {
        const user = await User.findById(id)
        return user
      } catch (error) {
        throw new Error('Error fetching users from the database')
      }
    },
    getReport: async (
      _: any,
      {
        targetId,
        cycleId,
      }: {
        targetId: String
        cycleId: String
      }
    ) => {
      try {
        const report = await Report.findOne({
          '_id.target': targetId,
          '_id.cycle': cycleId,
        })
        return report
      } catch (error) {
        throw new Error('Error fetching report from the database')
      }
    },
  },

  Mutation: {
    changeUser: async (_: any, { input }: { input: Input }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { email: input.email },
          input,
          { new: true }
        )
        return updatedUser
      } catch (error) {
        throw new Error('Error updating a user in the database')
      }
    },

    createUser: async (_: any, { input }: { input: Input }) => {
      try {
        const newUser = new User(input)
        const savedUser = await newUser.save()
        return savedUser
      } catch (error) {
        throw new Error(
          'Error creating a new user and saving it to the database'
        )
      }
    },
  },
}
