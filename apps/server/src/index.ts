import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_URL } from './lib/constants'
import router from './router'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import User from './lib/mongoose/models/User'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

mongoose.connect(MONGODB_URL)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB!')
})

const schema = buildSchema(`
type Query {
  hello: String
  getUsers: [User]
}

type User {
  email: String,
  fullName: String,
  hashedPw: String,
  title: String,
  isOlga: Boolean,
  photo: String,
  teamName: String,
  companyName: String,
}`)

const rootValue = {
  hello: () => {
    return 'Hello world!'
  },
  getUsers: async () => {
    try {
      const users = await User.find()
      return users
    } catch (error) {
      throw new Error('Error fetching users from the database')
    }
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true,
  })
)

app.listen(8080, () => {
  console.log('connectig to db...', MONGODB_URL)

  console.log('360 review server is listening on port 8080! 🤜🏼🤛🏼')
})
