import mongoose from 'mongoose'

export interface IUser {
  email: string
  fullName: string
  hashedPw: string
  title: string
  isOlga: boolean
  photo: string
  teamName: string
  companyName: string
}

type UserSchema = IUser & mongoose.Document

const userSchema = new mongoose.Schema<UserSchema>({
  email: String,
  fullName: String,
  hashedPw: String,
  title: String,
  isOlga: Boolean,
  photo: String,
  teamName: String,
  companyName: String,
})

const User = mongoose.model<UserSchema>('User', userSchema)

export default User
