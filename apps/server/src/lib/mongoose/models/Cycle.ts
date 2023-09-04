import { HydratedDocument, Model, Schema, model } from 'mongoose'
import { CycleModel } from '../../../../../../packages/types/models'

const cycleSchema = new Schema<CycleModel>({
  title: String,
  startDate: Date,
  endDate: Date,
  peersPerTarget: Number,
  nominationDeadline: Date,
  reviewDeadline: Date,
  reportDeadline: Date,
})

interface CycleMethods {}
type CycleInstance = HydratedDocument<CycleModel, CycleMethods>

interface UserModel extends Model<CycleModel> {
  getCurrentCycle(): CycleInstance
}

cycleSchema.static('getCurrentCycle', async function getCurrentCycle() {
  try {
    const now = new Date()

    const cycle = await Cycle.findOne({
      startDate: { $lte: now },
      endDate: { $gte: now },
    })
    return cycle
  } catch (error) {
    throw new Error('Error fetching report from the database')
  }
})

const Cycle = model<CycleModel, UserModel>('Cycle', cycleSchema)

export default Cycle
