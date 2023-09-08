export interface ApolloContext {
  user?: {
    id: string
    email: string
  }
}

export interface JWTPayload {
  id: string
  email: string
}
