import mongoose from 'mongoose'
import {
  MutationResolvers,
  PeerUpdateInput,
  ReportInput,
  UserInput,
} from '../__generated__/resolvers-types'
import Report from '../lib/mongoose/models/Report'
import User from '../lib/mongoose/models/User'

const mutations: MutationResolvers = {
  Mutation: {
    createUser: async (_: any, { input }: { input: UserInput }) => {
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
    updateUser: async (_: any, { input }: { input: UserInput }) => {
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

    updateReport: async (
      _: any,
      {
        targetId,
        cycleId,
        input,
      }: {
        targetId: String
        cycleId: String
        input: ReportInput
      }
    ) => {
      try {
        const filter = { '_id.targetId': targetId, '_id.cycleId': cycleId }
        const updatedReport = await Report.findOneAndUpdate(filter, input, {
          new: true,
        })
        return updatedReport
      } catch (error) {
        throw new Error('Error updating a report in the database')
      }
    },
    updatePeerReview: async (
      _: any,
      {
        targetId,
        cycleId,
        input,
      }: { targetId: String; cycleId: String; input: PeerUpdateInput }
    ) => {
      try {
        const filter = { '_id.targetId': targetId, '_id.cycleId': cycleId }
        const report = await Report.findOne(filter)
        const ObjectId = mongoose.Types.ObjectId
        if (report) {
          for (let i = 0; i < report.reviews.peers.length; i++) {
            const review = report.reviews.peers[i]
            if (review.reviewerId === null) {
              review.reviewerId = new ObjectId(input.newReviewerId)
              await report.save()
              break
            }
          }
        } else {
          throw new Error('Report not found')
        }
        return report
      } catch (error) {
        console.error('Error updating report:', error)
        throw new Error('Error updating a report in the database')
      }
    },
  },
}

export default mutations
