import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import resolvers from './src/resolvers'
import { readFileSync } from 'fs'
import { MONGODB_URL } from './src/lib/constants'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import jwtMiddleware from './src/lib/middlewares/jwt'
import { ApolloContext } from './src/types'

const typeDefs = readFileSync('./src/schema.graphql', 'utf-8')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(MONGODB_URL)
const db = mongoose.connection

const apolloServer = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB!')
})

startStandaloneServer(apolloServer, {
  listen: { port: 4000 },
  context: jwtMiddleware,
}).then(({ url }) => {
  console.log('🚀 Server ready at', url)
})
