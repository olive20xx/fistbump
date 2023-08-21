import { faker } from '@faker-js/faker/locale/en_US'
import User from '../models/User'

const SEED = 1

faker.seed(SEED)

function generateUsers(count: number) {
  const users = []
  for (let i = 0; i < count; i++) {
    const user = {
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
      hashedPw: faker.string.hexadecimal(),
      title: faker.person.jobTitle(),
      isOlga: faker.datatype.boolean(),
      photo: '#',
      teamName: faker.person.jobArea(),
      companyName: 'Arol.Dev',
    }
    users.push(user)
  }
  return users
}

async function seedUsers(count: number) {
  const users = generateUsers(count)
  const docs = await User.insertMany(users)
  if (!docs) throw new Error('User.insertMany() failed')
  console.log(`${docs.length} users have been added to the database`)
  return docs
}

export default seedUsers
