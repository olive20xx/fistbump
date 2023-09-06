import mongoose from 'mongoose'
import { modelTypes } from '@/fistbump-types'
import {
  MutationResolvers,
  PeerUpdateInput,
  ReportInput,
  ReviewInput,
  UserInput,
} from '../__generated__/resolvers-types'
import Report from '../lib/mongoose/models/Report'
import User from '../lib/mongoose/models/User'
import Cycle from '../lib/mongoose/models/Cycle'
import { resolveUpdateReport } from './updateReports'

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

    updateReport: resolveUpdateReport,
    updateAssignedReview: async (
      _: any,
      {
        targetId,
        input,
      }: {
        targetId: String
        input: ReviewInput
      }
    ) => {
      try {
        //TODO get current cycle is repeated code, should refactor
        const now = new Date()
        const cycle = await Cycle.findOne({
          startDate: { $lte: now },
          endDate: { $gte: now },
        })
        if (!cycle) throw new Error('Current cycle not found')

        const filter = { '_id.targetId': targetId, '_id.cycleId': cycle._id }
        const report = await Report.findOne(filter)
        if (!report) throw new Error('Report not found')

        const reviews = report.reviews
        if (!reviews)
          throw new Error('Report does not contain reviews property')

        const reviewerId = input.reviewerId

        let review: modelTypes.ReviewModel | undefined
        console.log('input reviewerId:', reviewerId)
        if (reviews.manager.reviewerId?.toString() === reviewerId) {
          review = reviews.manager
        } else if (reviews.self.reviewerId?.toString() === reviewerId) {
          review = reviews.self
        } else {
          review = reviews.peers.find(
            (r) => r.reviewerId?.toString() === reviewerId
          )
        }
        console.log('review', review)
        if (!review)
          throw new Error(`Review not found for reviewerId ${reviewerId}`)

        if (input.grades)
          review.grades = input.grades as modelTypes.GradeModel[]
        if (input.isDeclined !== undefined && input.isDeclined !== null) {
          review.isDeclined = input.isDeclined
        }
        if (input.submitted !== undefined && input.submitted !== null) {
          review.submitted = input.submitted
        }

        await report.save()
        console.log('updated report', report.reviews.manager)
        return report
      } catch (error: any) {
        console.log(error.message)
        throw new Error('Error updating a review in the database')
      }
    },
    updatePeerReviewerId: async (
      _: any,
      {
        targetId,
        cycleId,
        input,
      }: { targetId: String; cycleId: String; input: PeerUpdateInput }
    ) => {
      try {
        const filter = {
          '_id.targetId': targetId,
          '_id.cycleId': cycleId,
          'reviews.peers': { $elemMatch: { reviewerId: null } },
        }
        const report = await Report.findOne(filter)
        const ObjectId = mongoose.Types.ObjectId

        if (report) {
          const peerReviewToUpdate = report.reviews.peers.find(
            (review) => review.reviewerId === null
          )
          if (peerReviewToUpdate) {
            peerReviewToUpdate.reviewerId = new ObjectId(input.newReviewerId)
          }
          await report.save()
          return report
        } else {
          throw new Error('Report not found')
        }
      } catch (error) {
        console.error('Error updating report:', error)
        throw new Error('Error updating a report in the database')
      }
    },
  },
}

export default mutations
