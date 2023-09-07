import dotenv from 'dotenv'
dotenv.config()

export const MONGODB_URL = ensureEnvVarExist('MONGODB_URL')

function ensureEnvVarExist(name: string) {
  const value = process.env[name]
  if (value === undefined) {
    throw new Error(`${name} must be defined as an env variable`)
  }
  return value
}

export const JWT_SECRET = ensureEnvVarExist('JWT_SECRET')
export const HOST = process.env['HOST'] || '0.0.0.0'
