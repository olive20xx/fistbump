import { Resolvers } from '../__generated__/resolvers-types'
import Query from './queries'
import Mutation from './mutations'
import queries from './queries'
import mutations from './mutations'
import { dateScalar } from './dateScalar'

const resolvers: Resolvers = { Date: dateScalar, ...queries, ...mutations }

export default resolvers
