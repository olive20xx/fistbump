import { QueryResolvers } from '../__generated__/resolvers-types'
import Report from '../lib/mongoose/models/Report'
import User from '../lib/mongoose/models/User'
import Cycle from '../lib/mongoose/models/Cycle'

const queries: QueryResolvers = {
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
    getUserByEmail: async (
      _: any,
      {
        email,
        password,
      }: {
        email: String
        password: String
      }
    ) => {
      try {
        const user = await User.findOne({
          email,
          hashedPw: password,
        })
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
          '_id.targetId': targetId,
          '_id.cycleId': cycleId,
        })
        return report
      } catch (error) {
        throw new Error('Error fetching report from the database')
      }
    },
    getCurrentCycle: async (_: any) => {
      try {
        const now = new Date()

        const cycle = await Cycle.findOne({
          startDate: { $lte: now },
          endDate: { $gte: now },
        })
        return cycle
      } catch (error) {
        throw new Error('Error fetching report from the database')
      }
    },
  },
}

export default queries
