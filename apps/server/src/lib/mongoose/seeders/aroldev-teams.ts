import { generateTeam } from './generate-teams'
import { ObjectId } from './types'

export const TEAMS = {
  FOUNDERS: 'Founders',
  STDNT_EXP: 'Student Experience',
  MKTING: 'Marketing',
  INSTR: 'Instructors',
  STUDS: 'Students',
} as const

function generateArolDevTeams(olgaId: ObjectId, arolId: ObjectId) {
  const founders = generateTeam(TEAMS.FOUNDERS, olgaId)
  const studentXp = generateTeam(TEAMS.STDNT_EXP, olgaId)
  const marketing = generateTeam(TEAMS.MKTING, olgaId)

  const instructors = generateTeam(TEAMS.INSTR, arolId)
  const students = generateTeam(TEAMS.STUDS, arolId)

  return [founders, studentXp, marketing, instructors, students]
}

export default generateArolDevTeams
