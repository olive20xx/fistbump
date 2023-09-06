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
      if (input.reviews?.peers?.reviewerId) {
        const peersToNominate = report.reviews.peers.find(
          (peer) => peer.reviewerId === null
        )
        if (peersToNominate) {
          if (input.reviews.peers.reviewerId)
            peersToNominate.reviewerId = new modelTypes.ObjectId(
              input.reviews.peers.reviewerId
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
        if (
          input.reviews?.self?.submitted !== undefined &&
          input.reviews?.self?.submitted !== null
        ) {
          report.reviews.self.submitted = input.reviews?.self?.submitted
        }
        await report.save()
        return {
          reviews: {
            self: report.reviews.self,
          },
        }
      }
    }
  }
  //if reviewer->  review the peer
  if (isReviewer) {
    let review: modelTypes.ReviewModel | undefined
    review = report.reviews.peers.find(
      (review) => review.reviewerId?.toString() === context.user?.id
    )

    if (review) {
      if (input.reviews?.peers?.grades) {
        review.grades = input.reviews.peers.grades as modelTypes.GradeModel[]
      }
      if (
        input.reviews?.peers?.isDeclined !== undefined &&
        input.reviews?.peers?.isDeclined !== null
      ) {
        review.isDeclined = input.reviews.peers.isDeclined
      }
      if (input.reviews?.peers?.submitted) {
        review.submitted = input.reviews.peers.submitted
      }
    }
    await report.save()

    const peerReview = report.reviews.peers.find((peer) => {
      return peer.reviewerId?.toString() === context?.user?.id
    })

    return {
      reviews: {
        peers: [peerReview],
      },
    }
  }
  //still missing isManager
}
