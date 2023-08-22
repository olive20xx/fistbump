import { Schema, model } from 'mongoose'

type User = {
  email: string
  fullName: string
  hashedPw: string
  title: string
  isOlga: boolean
  photo: string
  teamName: string
  companyName: string
}

const userSchema = new Schema<User>({
  email: String,
  fullName: String,
  hashedPw: String,
  title: String,
  isOlga: Boolean,
  photo: String,
  teamName: String,
  companyName: String,
})

const User = model<User>('User', userSchema)

export default User
