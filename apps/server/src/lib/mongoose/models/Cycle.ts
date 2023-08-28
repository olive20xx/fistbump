import { Schema, model } from 'mongoose'
import { CycleModel } from "../../../../../../packages/types/models"

const cycleSchema = new Schema<CycleModel>({
  title: String,
  startDate: Date,
  endDate: Date,
  peersPerTarget: Number,
  nominationDeadline: Date,
  reviewDeadline: Date,
  reportDeadline: Date,
})

const Cycle = model<CycleModel>('Cycle', cycleSchema)

export default Cycle
