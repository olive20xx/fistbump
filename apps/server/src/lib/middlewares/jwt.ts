import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../constants'
import { ApolloContext, JWTPayload } from '@/types/devops'
import { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone'

export default async function jwtMiddleware({
  req,
}: StandaloneServerContextFunctionArgument): Promise<ApolloContext> {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return {}
  }
  const token = authHeader.split('Bearer ')[1]
  const payload = jwt.verify(token, JWT_SECRET) as JWTPayload
  let user
  if (typeof payload !== 'string') {
    user = {
      id: payload.id,
      email: payload.email,
    }
  }

  return {
    user,
  }
}
