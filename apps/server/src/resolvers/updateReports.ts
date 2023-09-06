import {
  PeerUpdateInput,
  ReportInput,
  ReviewInput,
} from '@/__generated__/resolvers-types'
import { modelTypes } from '@/fistbump-types'
import Cycle from '../lib/mongoose/models/Cycle'
import Report from '..//lib/mongoose/models/Report'
import { ApolloContext } from '@/types'

export async function resolveUpdateReport(
  _: any,
  {
    targetId,
    cycleId,
    input,
  }: {
    targetId: String
    cycleId: String
    input: ReportInput & PeerUpdateInput & ReviewInput
  },
  context: ApolloContext
) {
  if (!cycleId) {
    const cycle = await Cycle.getCurrentCycle()
    if (cycle === null) throw new Error('No current cycle found')
    cycleId = cycle._id.toString()
  }

  const report = await Report.findOne({
    '_id.targetId': targetId,
    '_id.cycleId': cycleId,
  })

  if (!report) throw new Error('No report found')
  if (!context.user?.id || !context.user.email) throw new Error('Unauthorized')

  const isSelf = context.user?.id === targetId
  const isManager =
    context.user?.id === report.reviews.manager.reviewerId?.toString()
  const isReviewer = report.reviews.peers.some(
    (peer) => peer.reviewerId?.toString() === context.user?.id
  )

  if (!isSelf && !isManager && !isReviewer) throw new Error('Unauthorized')

  // //if myself -> i can mutate self review or nominate peers!
  if (isSelf) {
    if (report.status === modelTypes.REPORT_STATUS.NOMINATION) {
      const peersToNominate = report.reviews.peers.find(
        (peer) => peer.reviewerId === null
      )

      if (peersToNominate) {
        peersToNominate.reviewerId = new modelTypes.ObjectId(
          input.newReviewerId
        )
      }
      await report.save()

      const peerIds = report.reviews.peers.map((peer) => {
        return {
          reviewerId: peer.reviewerId,
        }
      })
      return {
        reviews: {
          peers: peerIds,
        },
      }
    }
    //WRITE SELF REVIEW
    //this should be changed to check if report.status === review
    // if (input.grades) {
    //   report.reviews.self.grades = input.grades as modelTypes.GradeModel[]
    // }
    // if (input.submitted !== undefined && input.submitted !== null) {
    //   report.reviews.self.submitted = input.submitted
    // }
    // await report.save()
    // return report.reviews.self
  }
}
//if reviewer->  review the peer

//   const filter = { '_id.targetId': targetId, '_id.cycleId': cycleId }
//   const updatedReport = await Report.findOneAndUpdate(filter, input, {
//     new: true,
//   })
//   return updatedReport
// } catch (error) {
//   throw new Error('Error updating a report in the database')
// }
// }
