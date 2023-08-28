import User from './lib/mongoose/models/User'
import Report from './lib/mongoose/models/Report'
import { UserInput } from '../../../packages/types/inputs'
import { ReportInput } from '../../../packages/types/inputs'


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
    getUser: async ({ id }: { id: String }) => {
      try {
        const user = await User.findById(id)
        return user
      } catch (error) {
        throw new Error('Error fetching users from the database')
      }
    },
    getUserByEmail: async ({
      email,
      password,
    }: {
      email: String
      password: String
    }) => {
      try {
        console.log('im looking for a user')
        const user = await User.findOne({
          email,
          hashedPw: password,
        })
        console.log('ive found a user', user)

        return user
      } catch (error) {
        throw new Error('Error fetching users from the database')
      }
    },
    getReport: async ({
      targetId,
      cycleId,
    }: {
      targetId: String
      cycleId: String
    }) => {
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
    createUser: async ({ input }: { input: UserInput }) => {
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
    updateUser: async ({ input }: { input: UserInput }) => {
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

    updateReport: async ({
      targetId,
      cycleId,
      input,
    }: {
      targetId: String
      cycleId: String
      input: ReportInput
    }) => {
      try {
        const filter = { '_id.target': targetId, '_id.cycle': cycleId }
        const updatedReport = await Report.findOneAndUpdate(filter, input, {
          new: true,
        })
        return updatedReport
      } catch (error) {
        throw new Error('Error updating a report in the database')
      }
    },
  },
}
