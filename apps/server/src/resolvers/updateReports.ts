import { ReportInput } from '@/__generated__/resolvers-types'
import { modelTypes } from '../types/export'
import Cycle from '../lib/mongoose/models/Cycle'
import Report from '../lib/mongoose/models/Report'
import { ApolloContext } from '@/types/devops'

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
  if (!context.user?.id || !context.user.email)
    throw new Error('Unauthorized - no userId or email')

  const isSelf = context.user?.id === targetId
  const isManager =
    context.user?.id === report.reviews.manager.reviewerId?.toString()
  const isReviewer = report.reviews.peers.some(
    (peer) => peer.reviewerId?.toString() === context.user?.id
  )

  if (!isSelf && !isManager && !isReviewer)
    throw new Error('Unauthorized - who tf are you')

  // //if myself -> i can mutate self review or nominate peers!
  if (isSelf) {
    if (report.status === modelTypes.REPORT_STATUS.NOMINATION) {
      if (input.reviews?.peer?.reviewerId) {
        const peersToNominate = report.reviews.peers.find(
          (peer) => peer.reviewerId === null
        )
        if (peersToNominate) {
          if (input.reviews.peer.reviewerId)
            peersToNominate.reviewerId = new modelTypes.ObjectId(
              input.reviews.peer.reviewerId
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
      if (input.reviews?.peer?.grades) {
        review.grades = input.reviews.peer.grades as modelTypes.GradeModel[]
      }
      if (
        input.reviews?.peer?.isDeclined !== undefined &&
        input.reviews?.peer?.isDeclined !== null
      ) {
        review.isDeclined = input.reviews.peer.isDeclined
      }
      if (input.reviews?.peer?.submitted) {
        review.submitted = input.reviews.peer.submitted
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
  if (isManager) {
    let review: modelTypes.ReviewModel | undefined
    review = report.reviews.manager

    if (input.reviews?.manager?.grades) {
      review.grades = input.reviews.manager.grades as modelTypes.GradeModel[]
    }
    if (
      input.reviews?.manager?.isDeclined !== undefined &&
      input.reviews?.manager?.isDeclined !== null
    ) {
      review.isDeclined = input.reviews.manager.isDeclined
    }
    if (input.reviews?.manager?.submitted) {
      review.submitted = input.reviews.manager.submitted
    }
  }

  // updateReportStatus(report)

  await report.save()

  return report
}
