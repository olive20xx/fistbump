import mongoose from 'mongoose'
import { GradeModel, ReviewModel } from '../../../../packages/types/models'
import {
  MutationResolvers,
  ReportInput,
  ReviewInput,
  UserInput,
} from '../__generated__/resolvers-types'
import Report from '../lib/mongoose/models/Report'
import User from '../lib/mongoose/models/User'

const ObjectId = mongoose.Types.ObjectId

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
    updateAssignedReview: async (
      _: any,
      {
        targetId,
        cycleId,
        input,
      }: {
        targetId: String
        cycleId: String
        input: ReviewInput
      }
    ) => {
      try {
        const filter = { '_id.targetId': targetId, '_id.cycleId': cycleId }
        const report = await Report.findOne(filter)
        if (!report) throw new Error('Report not found')

        const reviews = report.reviews
        if (!reviews)
          throw new Error('Report does not contain reviews property')

        const reviewerId = new ObjectId(input.reviewerId)

        let review: ReviewModel | undefined
        if (reviews.self.reviewerId === reviewerId) review = reviews.self
        else if (reviews.manager.reviewerId === reviewerId)
          review = reviews.manager
        else {
          review = reviews.peers.find((r) => r.reviewerId === reviewerId)
        }
        if (!review)
          throw new Error(`Review not found for reviewerId ${reviewerId}`)

        if (input.grades) review.grades = input.grades as GradeModel[]
        if (input.isDeclined !== undefined && input.isDeclined !== null) {
          review.isDeclined = input.isDeclined
        }
        if (input.submitted !== undefined && input.submitted !== null) {
          review.submitted = input.submitted
        }

        await report.save()
        return report
      } catch (error) {
        throw new Error('Error updating a review in the database')
      }
    },
  },
}

export default mutations
