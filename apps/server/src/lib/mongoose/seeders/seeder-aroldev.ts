import { modelTypes } from '../../../types/export'
import Cycle from '../models/Cycle'
import User from '../models/User'
import generateCycle from './generate-cycle'
import userInput from './aroldev-users'
import { generateEmptyReport } from './generate-reports'
import Report from '../models/Report'
import generateArolDevTeams, { TEAMS } from './aroldev-teams'
import Team from '../models/Team'
import { ObjectId } from './types'
import mongoose from 'mongoose'
import 'dotenv/config'
import { addDays } from '../../utils'
import generateMongoId from './generate-id'

// CYCLE CONFIG
const yesterday = addDays(new Date(), -1)
const CYCLE_START = yesterday
const CYCLE_PEERS_PER_TARGET = 3

//TODO I think the Cycle model needs a Grade Template
const GRADES_PER_REVIEW = 3
const MAX_RATING = 5

const mongoURL = process.env.MONGODB_URL

const cycleInput = generateCycle(CYCLE_START, CYCLE_PEERS_PER_TARGET)

// Connect to mongodb implementation
async function seedDb() {
  try {
    if (mongoURL === undefined)
      throw new Error('Could not get MongoDB URL from .env')
    await mongoose.connect(mongoURL)
    await mongoose.connection.db.dropDatabase()
    console.log('🧑🏻‍💻👍🏻 Connected to DB')

    await seedArolDevData()

    mongoose.connection.close()
  } catch (error: any) {
    console.log(error.message)
  } finally {
    mongoose.connection.close()
  }
}

async function seedArolDevData() {
  try {
    const cycle = await Cycle.create(cycleInput)
    if (!cycle) throw new Error('Cycle.create() failed')
    console.log(`💜 CYCLE ID: '${cycle._id}' 💜`)

    const users = await User.insertMany(userInput)
    if (!users) throw new Error('User.insertMany() failed')
    console.log(`${users.length} users have been added to the database`)
    console.log(users)

    const arol = users.find((user) => {
      return user.title === 'CTO'
    })
    console.log('AROL', arol)
    if (!arol) throw new Error('Arol not found in users collection')

    const olga = users.find((user) => {
      return user.title === 'CEO'
    })
    if (!olga) throw new Error('Olga not found in users collection')

    const teamsInput = generateArolDevTeams(olga._id, arol._id)
    const teams = await Team.insertMany(teamsInput)
    if (!teams) throw new Error('Team.insertMany() failed')
    console.log(`${teams.length} teams have been added to the database`)
    console.log(teams)

    const reportInput: modelTypes.ReportModel[] = []

    users.forEach((user) => {
      let managerId: ObjectId
      if (user.teamName === TEAMS.STUDS || user.teamName === TEAMS.INSTR) {
        managerId = arol._id
      } else {
        managerId = olga._id
      }

      const report = generateEmptyReport(
        user._id,
        cycle._id,
        managerId,
        cycle.peersPerTarget,
        GRADES_PER_REVIEW,
        MAX_RATING
      )

      reportInput.push(report)
    })

    const reports = await Report.insertMany(reportInput)
    if (!reports) throw new Error('Report.insertMany() failed')
    console.log(`${reports.length} reports have been added to the database`)
    console.log('😱 first report 😱 —> ', reports[0])
  } catch (error: any) {
    console.log(error.message)
  } finally {
    mongoose.connection.close()
  }
}

export default seedDb
