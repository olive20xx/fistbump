import mongoose, { Error } from 'mongoose'
import usersSeeder from './users.seeder'
import User from '../models/User'
import generateUsers from './users.seeder'
import 'dotenv/config'

const mongoURL = process.env.MONGODB_URL
// Connect to mongodb implementation
async function seedDb() {
  try {
    if (mongoURL === undefined) {
      console.log('Could not get MongoDB URL from .env')
      return
    }
    await mongoose.connect(mongoURL)
    await mongoose.connection.db.dropDatabase()
    console.log('🧑🏻‍💻👍🏻 Connected to DB')

    await seedUsers(5)

    mongoose.connection.close()
  } catch (error: any) {
    console.log(error.message)
  }
}

async function seedUsers(count: number) {
  const users = generateUsers(count)
  const docs = await User.insertMany(users)
  // if (!docs) throw new Error('User.insertMany() failed')
  if (!docs) {
    console.log('User.insertMany() failed')
    return
  }
  console.log(`${docs.length} users have been added to the database`)
  console.log(docs)
}

export default seedDb
