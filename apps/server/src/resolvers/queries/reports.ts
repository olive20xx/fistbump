import Report from '../../lib/mongoose/models/Report'
import Cycle from '../../lib/mongoose/models/Cycle'

export async function resolveReport(
  _: any,
  {
    targetId,
    cycleId,
  }: {
    targetId: String
    cycleId: String
  }
) {
  // what if cycleId is undefined?
  if (!cycleId) {
    const cycle = await Cycle.getCurrentCycle()
    if (cycle === null) throw new Error('No current cycle found')
    cycleId = cycle._id.toString()
  }

  try {
    const report = await Report.findOne({
      '_id.targetId': targetId,
      '_id.cycleId': cycleId,
    })
    return report
  } catch (error) {
    throw new Error('Error fetching report from the database')
  }
}
