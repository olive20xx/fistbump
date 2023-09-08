import Report from '../../lib/mongoose/models/Report'
import Cycle from '../../lib/mongoose/models/Cycle'
import { ApolloContext } from '@/types/devops'
import { modelTypes } from '../../types/export'
import User from '../../lib/mongoose/models/User'

export async function resolveReport(
  _: any,
  {
    targetId,
    cycleId,
  }: {
    targetId: String
    cycleId: String
  },
  context: ApolloContext
) {
  // what if cycleId is undefined?
  if (!cycleId) {
    const cycle = await Cycle.getCurrentCycle()
    if (cycle === null) throw new Error('No current cycle found')
    cycleId = cycle._id.toString()
  }

  const report = await Report.findOne({
    '_id.targetId': targetId,
    '_id.cycleId': cycleId,
  })
  const target = await User.findOne({ _id: targetId })
  if (!report) throw new Error('No report found')

  if (!context.user?.id || !context.user.email) throw new Error('Unauthorized')

  const isSelf = context.user?.id === targetId
  const isManager =
    context.user?.id === report.reviews.manager.reviewerId?.toString()
  const isReviewer = report.reviews.peers.some(
    (peer) => peer.reviewerId?.toString() === context.user?.id
  )

  if (!isSelf && !isManager && !isReviewer) throw new Error('Unauthorized')

  const reportBase = {
    _id: report._id,
    status: report.status,
  }
  if (isManager) return report
  if (isSelf) {
    if (report.status === modelTypes.REPORT_STATUS.COMPLETE) {
      return {
        ...reportBase,
        summary: report.summary,
        reviews: {
          manager: report.reviews.manager,
          self: report.reviews.self,
        },
      }
    } else {
      const peerIds = report.reviews.peers.map((peer) => {
        return {
          reviewerId: peer.reviewerId,
        }
      })
      return {
        ...reportBase,
        reviews: {
          self: report.reviews.self,
          peers: peerIds,
          //TODO this is temp because we're not currently updating Report.status
          manager: {
            reviewerId: report.reviews.manager.reviewerId,
            grades: report.reviews.manager.grades,
            submitted: report.reviews.manager.submitted,
          },
        },
      }
    }
  }
  if (isReviewer) {
    return {
      ...reportBase,
      reviews: {
        peers: report.reviews.peers.filter(
          (peer) => peer.reviewerId?.toString() === context.user?.id
        ),
      },
    }
  }
}
