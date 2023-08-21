import mongoose, { Error } from 'mongoose'
import seedUsers from './users.seeder'
import 'dotenv/config'

const mongoURL = process.env.MONGODB_URL
// Connect to mongodb implementation
async function seedDb() {
  try {
    if (mongoURL === undefined)
      throw new Error('Could not get MongoDB URL from .env')

    await mongoose.connect(mongoURL)
    await mongoose.connection.db.dropDatabase()
    console.log('🧑🏻‍💻👍🏻 Connected to DB')

    await seedUsers(5)

    mongoose.connection.close()
  } catch (error: any) {
    console.log(error.message)
  }
}

export default seedDb
