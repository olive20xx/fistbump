import { ReportInput, ReviewInput } from '@/__generated__/resolvers-types'
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
    input: {
      reportInput?: ReportInput
      reviewInput?: ReviewInput
    }
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
      if (input.reviewInput?.reviewerId) {
        const peersToNominate = report.reviews.peers.find(
          (peer) => peer.reviewerId === null
        )
        if (peersToNominate) {
          if (input.reviewInput.reviewerId)
            peersToNominate.reviewerId = new modelTypes.ObjectId(
              input.reviewInput.reviewerId
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
        if (input.reviewInput?.grades) {
          report.reviews.self.grades = input.reviewInput
            ?.grades as modelTypes.GradeModel[]
        }
        if (
          input.reviewInput?.submitted !== undefined &&
          input.reviewInput?.submitted !== null
        ) {
          report.reviews.self.submitted = input.reviewInput?.submitted
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
      if (input.reviewInput?.grades) {
        review.grades = input.reviewInput?.grades as modelTypes.GradeModel[]
      }
      if (
        input.reviewInput?.isDeclined !== undefined &&
        input.reviewInput?.isDeclined !== null
      ) {
        review.isDeclined = input.reviewInput?.isDeclined
      }
      if (input.reviewInput?.submitted) {
        review.submitted = input.reviewInput?.submitted
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

    if (input.reviewInput?.grades) {
      review.grades = input.reviewInput?.grades as modelTypes.GradeModel[]
    }
    if (
      input.reviewInput?.isDeclined !== undefined &&
      input.reviewInput?.isDeclined !== null
    ) {
      review.isDeclined = input.reviewInput?.isDeclined
    }
    if (input.reviewInput?.submitted) {
      review.submitted = input.reviewInput?.submitted
    }
  }

  // updateReportStatus(report)

  await report.save()

  return report
}
