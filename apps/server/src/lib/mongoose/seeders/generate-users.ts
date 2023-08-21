import faker from './faker'
import User from '../models/User'

function generateUsers(count: number) {
  const users: User[] = []

  for (let i = 0; i < count; i++) {
    const user = {
      email: faker.internet.email(),
      fullName: faker.person.fullName(),
      hashedPw: faker.string.hexadecimal(),
      title: faker.person.jobTitle(),
      isOlga: faker.datatype.boolean(),
      photo: faker.internet.avatar(),
      teamName: faker.helpers.arrayElement(['Staff, Students, Instructors']),
      companyName: 'Arol.Dev',
    }
    users.push(user)
  }
  return users
}

export default generateUsers
