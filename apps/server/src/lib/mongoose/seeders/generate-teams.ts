import { TeamModel } from '../../../../../../packages/types/models'
import mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId

export function generateTeam(name: string, managerId: ObjectId) {
  const team: TeamModel = { name, managerId }

  return team
}

export function generateTeamsWithSameManager(
  teamNames: string[],
  managerId: ObjectId
) {
  const teams: TeamModel[] = []

  teamNames.forEach((name) => {
    const team: TeamModel = {
      name,
      managerId,
    }
    teams.push(team)
  })

  return teams
}
