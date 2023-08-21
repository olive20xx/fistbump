import { faker } from '@faker-js/faker/locale/en_US'
 
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

export default generateUsers
