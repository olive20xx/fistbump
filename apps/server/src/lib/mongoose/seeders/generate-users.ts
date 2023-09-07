import faker from './faker'
import { modelTypes } from '../../../types/export'
import generateMongoId from './generate-id'
import { Types } from 'mongoose'

const PASSWORD = '321'

export function generateRandomUserModels(count: number, companyName: string) {
  const users: modelTypes.UserModel[] = []
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const user = {
      email: `${firstName[0].toLowerCase()}${lastName.toLowerCase()}@${companyName.toLowerCase()}`,
      fullName: `${firstName} ${lastName}`,
      hashedPw: PASSWORD,
      title: faker.person.jobTitle(),
      isAdmin: faker.datatype.boolean(),
      photo: faker.internet.avatar(),
      teamName: faker.helpers.arrayElement([
        'Staff',
        'Students',
        'Instructors',
      ]),
      companyName,
    }
    users.push(user)
  }
  return users
}

export function generateSpecificUserModel(
  firstName: string,
  lastName: string,
  title: string,
  isAdmin: boolean,
  teamName: string,
  companyName: string
) {
  const user: modelTypes.UserModel & { _id: Types.ObjectId } = {
    // this generates consistent IDs that won't change every time we seed
    _id: generateMongoId(),
    email: `${firstName.toLowerCase()}@${companyName.toLowerCase()}`,
    fullName: `${firstName} ${lastName}`,
    hashedPw: PASSWORD,
    title,
    isAdmin,
    photo: faker.internet.avatar(),
    teamName,
    companyName,
  }

  return user
}
