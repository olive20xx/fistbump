import express from 'express'
import { graphqlHTTP } from "express-graphql"
import { graphql, buildSchema } from 'graphql';
import mongoose from 'mongoose'

const schema = buildSchema(`
type Query {
  hello: String
}
`)
const root = {
  hello: () => {
    return "Hello world!"
  },
}

const app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(8080, () => {
  console.log('360 review server is listening on port 8080! 🤜🏼🤛🏼')
})
