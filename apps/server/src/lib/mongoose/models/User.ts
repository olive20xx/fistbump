import { Schema, model } from 'mongoose'
import { modelTypes } from '../../../types/export'

const userSchema = new Schema<modelTypes.UserModel>({
  email: String,
  fullName: String,
  hashedPw: String,
  title: String,
  isAdmin: Boolean,
  photo: String,
  teamName: String,
  companyName: String,
})

const User = model<modelTypes.UserModel>('User', userSchema)

export default User
