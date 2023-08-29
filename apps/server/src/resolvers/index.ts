import { Resolvers } from '../__generated__/resolvers-types'
import Query from './queries'
import Mutation from './mutations'
import queries from './queries'
import mutations from './mutations'

const resolvers: Resolvers = { ...queries, ...mutations }

export default resolvers
