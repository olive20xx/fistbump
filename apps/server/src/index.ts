import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_URL } from './lib/constants'
import router from './router'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import User from './lib/mongoose/models/User'
import { Input } from './lib/types/User'

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

input UserInput {
  email: String!
  fullName: String
  hashedPw: String
  title: String
  isOlga: Boolean
  photo: String
  teamName: String
  companyName: String
}

type Mutation {
  createUser(input: UserInput): User
  changeUser(input: UserInput): User
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
  createUser: async ({ input }: { input: Input }) => {
    try {
      const newUser = new User(input)
      const savedUser = await newUser.save()
      return savedUser
    } catch (error) {
      throw new Error('Error creating a new user and saving it to the database')
    }
  },
  changeUser: async ({ input }: { input: Input }) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: input.email },
        input,
        { new: true }
      )
      return updatedUser
    } catch (error) {
      throw new Error('Error updating a user in the database')
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

  console.log('360 review server is listening on port 8080! 🤜🤛')
})
