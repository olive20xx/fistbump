import express from 'express'
import { graphqlHTTP,  } from "express-graphql"
import { buildSchema } from 'graphql';
import connectDB from './database';
import schema from './schema'

//Create a server
const app = express()
/*
// Create a schema and a root resolver:
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


app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));
*/

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true,
  })
)

app.listen(8080, () => {
  console.log('360 review server is listening on port 8080! 🤜🏼🤛🏼')
})

connectDB();