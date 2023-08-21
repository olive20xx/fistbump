const mongoose = require('mongoose')
const UsersSeeder = require('./seeders/users.seeder')

const mongoURL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/mongodb-container'

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  UsersSeeder,
}
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () => await mongoose.connect(mongoURL)
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase()

module.exports = { seedersList, connect, dropdb }