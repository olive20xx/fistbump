import { HydratedDocument, Model, Schema, model } from 'mongoose'
import { modelTypes } from '../../../types/export'

const cycleSchema = new Schema<modelTypes.CycleModel>({
  title: String,
  startDate: Date,
  endDate: Date,
  peersPerTarget: Number,
  nominationDeadline: Date,
  reviewDeadline: Date,
  reportDeadline: Date,
})

interface CycleMethods {}
type CycleInstance = HydratedDocument<modelTypes.CycleModel, CycleMethods>

interface UserModel extends Model<modelTypes.CycleModel> {
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

const Cycle = model<modelTypes.CycleModel, UserModel>('Cycle', cycleSchema)

export default Cycle
