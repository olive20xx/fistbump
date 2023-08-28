import { Schema, model } from 'mongoose'
import { TeamModel } from "../../../../../../packages/types/models"

const teamSchema = new Schema<TeamModel>({
  name: { type: String, unique: true },
  managerId: Schema.Types.ObjectId
})

const Team = model<TeamModel>('Team', teamSchema)

export default Team
