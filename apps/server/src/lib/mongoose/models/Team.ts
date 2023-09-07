import { Schema, model } from 'mongoose'
import { modelTypes } from '../../../types/export'

const teamSchema = new Schema<modelTypes.TeamModel>({
  name: { type: String, unique: true },
  managerId: Schema.Types.ObjectId,
})

const Team = model<modelTypes.TeamModel>('Team', teamSchema)

export default Team
