const mongoose = require('mongoose')
const Users = require('./src/lib/mongoose/seeders/users.seeder.js')
import MONGODB_URL from './lib/constants'

const mongoURL = MONGODB_URL || 'mongodb://localhost:27017/mongodb-container'

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  Users,
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
