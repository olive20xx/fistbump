import { modelTypes } from '../../../types/export'
import mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId

export function generateTeam(name: string, managerId: ObjectId) {
  const team: modelTypes.TeamModel = { name, managerId }

  return team
}

export function generateTeamsWithSameManager(
  teamNames: string[],
  managerId: ObjectId
) {
  const teams: modelTypes.TeamModel[] = []

  teamNames.forEach((name) => {
    const team: modelTypes.TeamModel = {
      name,
      managerId,
    }
    teams.push(team)
  })

  return teams
}
