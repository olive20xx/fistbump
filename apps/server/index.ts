import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import http from 'http'
import bodyParser from 'body-parser'
import resolvers from './src/resolvers'
import { readFileSync } from 'fs'
import { MONGODB_URL } from './src/lib/constants'
import { ApolloServer } from '@apollo/server'
import jwtMiddleware from './src/lib/middlewares/jwt'
import { ApolloContext } from './src/types'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { hostname } from 'os'
const typeDefs = readFileSync('./src/schema.graphql', 'utf-8')

const app = express()
const httpServer = http.createServer(app)

mongoose.connect(MONGODB_URL)
const db = mongoose.connection

const apolloServer = new ApolloServer<ApolloContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

async function startServer() {
  await apolloServer.start()
}

startServer()
  .then(() => {
    app.use(
      '/',
      cors<cors.CorsRequest>({
        origin: ['http://localhost:3000'],
      }),
      bodyParser.json(),
      expressMiddleware(apolloServer, { context: jwtMiddleware })
    )
  })
  .then(() => {
    new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))
  })

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB!')
})

process.on('SIGINT', async () => {
  console.log('Received SIGINT. Shutting down...')
  await apolloServer.stop()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM. Shutting down...')
  await apolloServer.stop()
  process.exit(0)
})
