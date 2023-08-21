import faker from './faker'
import Report, { Grade } from '../models/Report'

function generateGrades(count: number) {
  const grades: Grade[] = []
}

function generateReviews(count: number) {}

function generateReports(count: number) {
  const reports = []
  for (let i = 0; i < count; i++) {
    const report = {
      // email: faker.internet.email(),
      // fullName: faker.person.fullName(),
      // hashedPw: faker.string.hexadecimal(),
      // title: faker.person.jobTitle(),
      // isOlga: faker.datatype.boolean(),
      // photo: '#',
      // teamName: faker.person.jobArea(),
      // companyName: 'Arol.Dev',
      _id: {},
    }
    reports.push(report)
  }
  return reports
}

async function seedUsers(count: number) {
  const reports = generateReports(count)
  const docs = await Report.insertMany(reports)
  if (!docs) throw new Error('Report.insertMany() failed')
  console.log(`${docs.length} reports have been added to the database`)
  return docs
}

export default seedUsers
