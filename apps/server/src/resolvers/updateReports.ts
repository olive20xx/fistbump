import { ReportInput } from '@/__generated__/resolvers-types'
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
    input: ReportInput
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
      if (input.newReviewerId) {
        const peersToNominate = report.reviews.peers.find(
          (peer) => peer.reviewerId === null
        )
        if (peersToNominate) {
          if (input.newReviewerId)
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
      } else {
        //WRITE SELF REVIEW
        //this should be changed to check if report.status === review
        if (input.reviews?.self?.grades) {
          report.reviews.self.grades = input.reviews?.self
            ?.grades as modelTypes.GradeModel[]
        }
        console.log({
          grades: input.reviews?.self?.grades,
          submitted: input.reviews?.self?.submitted,
        })
        if (
          input.reviews?.self?.submitted !== undefined &&
          input.reviews?.self?.submitted !== null
        ) {
          report.reviews.self.submitted = input.reviews?.self?.submitted
        }
        await report.save()
        console.log(report.reviews.self)
        return {
          reviews: {
            self: report.reviews.self,
          },
        }
      }
    }
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
