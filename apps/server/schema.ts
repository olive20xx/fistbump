import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    hello: {
      type: GraphQLString,
      description: 'A simple hello world query',
      resolve: () => 'Hello, world!'
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = schema;
