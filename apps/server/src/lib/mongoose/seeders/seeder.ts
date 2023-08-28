import mongoose from 'mongoose'
import generateUsers from './generate-users'
import 'dotenv/config'
import User from '../models/User'
import generateReport from './generate-reports'
import Report from '../models/Report'
import { UserModel, ReportModel } from '../../../../../../packages/types/models'

const NUMBER_OF_USERS = 10
const NUMBER_OF_PEER_REVIEWS = 1
const NUMBER_OF_METRICS = 3
const MAX_RATING = 5

const mongoURL = process.env.MONGODB_URL

type UserDoc = mongoose.MergeType<
  mongoose.Document<unknown, {}, UserModel> &
  UserModel & {
    _id: mongoose.Types.ObjectId
  },
  Omit<UserModel, '_id'>
>

// Connect to mongodb implementation
async function seedDb() {
  try {
    if (mongoURL === undefined)
      throw new Error('Could not get MongoDB URL from .env')
    await mongoose.connect(mongoURL)
    await mongoose.connection.db.dropDatabase()
    console.log('🧑🏻‍💻👍🏻 Connected to DB')

    await seedData(NUMBER_OF_USERS)

    mongoose.connection.close()
  } catch (error: any) {
    console.log(error.message)
  }
}

async function seedData(count: number) {
  try {
    const userInput = generateUsers(count)
    const users: UserDoc[] = await User.insertMany(userInput)
    if (!users) throw new Error('User.insertMany() failed')
    console.log(`${users.length} users have been added to the database`)
    console.log(users)

    const fakeCycle = '131313'
    const fakeManager = new mongoose.Types.ObjectId()
    console.log(`💜 CYCLE ID: '${fakeCycle}' 💜`)
    const reportInput: ReportModel[] = []

    users.forEach((user, index) => {
      const reviewers = pickRandomReviewers(
        user._id,
        users,
        NUMBER_OF_PEER_REVIEWS
      )
      //! ~half the reports will have empty reviews
      const areReviewsEmpty = index < users.length / 2

      const report = generateReport(
        user._id,
        fakeCycle,
        fakeManager,
        reviewers,
        NUMBER_OF_METRICS,
        MAX_RATING,
        areReviewsEmpty
      )

      reportInput.push(report)
    })

    const reports = await Report.insertMany(reportInput)
    if (!reports) throw new Error('Report.insertMany() failed')
    console.log(`${reports.length} reports have been added to the database`)
    console.log(reports[8].reviews.peers[0])
  } catch (error: any) {
    console.log(error.message)
  }
}

function pickRandomReviewers(
  targetId: mongoose.Types.ObjectId,
  users: UserDoc[],
  reviewerCount: number
) {
  const reviewers: mongoose.Types.ObjectId[] = []

  while (reviewers.length < reviewerCount) {
    const i = getRandomInt(users.length - 1)
    const user = users[i]
    if (user._id !== targetId) reviewers.push(user._id)
  }

  return reviewers
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export default seedDb
