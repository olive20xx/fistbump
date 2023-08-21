const { Seeder } = require('mongoose-data-seed')
const { User } = require('../models/User.ts')

const data = [
  {
    email: 'sfakename@gmail.com',
    fullName: 'Stacy Fakename',
    hashedPw: '2retnuh',
    title: 'Student',
    isOlga: false,
    photo: '#',
    teamName: 'Students',
    companyName: 'Arol.Dev',
  },
  {
    email: 'jfakename@gmail.com',
    fullName: 'Joanna Fakename',
    hashedPw: 'hunter22',
    title: 'CEO',
    isOlga: true,
    photo: '#',
    teamName: 'Founders',
    companyName: 'Arol.Dev',
  },
]

class Users extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then((count) => count === 0)
  }

  async run() {
    return User.create(data)
  }
}

module.exports = Users 
