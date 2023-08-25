import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_URL } from './src/lib/constants'
import router from './src/router'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'fs'
import { resolvers } from './src/resolvers'

const app = express()
app.use(express.json())
app.use(cors())

app.use(router)

mongoose.connect(MONGODB_URL)
const db = mongoose.connection

const typeDefs = readFileSync('./src/schema.graphql', 'utf-8')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB!')
})

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(apolloServer, { listen: { port: 4000 } })
  .then(({ url }) => {
    console.log('🚀 Server ready at', url)
  })
  .catch((error) => {
    console.error('An error occurred:', error)
  })

console.log('for arol listening now')
const server = app.listen(8080, () => {
  console.log('connectig to db...', MONGODB_URL)

  console.log('360 review server is listening on port 8080! 🤜🤛')
})

function shutdown() {
  console.log('for craig hello')
  server.close(() => {
    mongoose.connection.close().then(() => {
      process.exit(0)
    })
  })

  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
}
process.on('SIGTERM', () => {
  console.log('SIGTERM')
  shutdown()
})
process.on('SIGUSR2', () => {
  console.log('SIGUSR2')
  shutdown()
})
