import faker from './faker'
import { UserModel } from '../../../../../../packages/types/models'

function generateUsers(count: number) {
  const users: UserModel[] = []
  const companyName = 'Arol.Dev'
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const user = {
      email: `${firstName[0].toLowerCase()}${lastName.toLowerCase()}@${companyName.toLowerCase()}`,
      fullName: `${firstName} ${lastName}`,
      hashedPw: '321',
      title: faker.person.jobTitle(),
      isAdmin: faker.datatype.boolean(),
      photo: faker.internet.avatar(),
      teamName: faker.helpers.arrayElement([
        'Staff',
        'Students',
        'Instructors',
      ]),
      companyName: companyName,
    }
    users.push(user)
  }
  return users
}

export default generateUsers
