import { Schema, model } from 'mongoose'
import { UserModel } from "../../../../../types/models"

const userSchema = new Schema<UserModel>({
  email: String,
  fullName: String,
  hashedPw: String,
  title: String,
  isAdmin: Boolean,
  photo: String,
  teamName: String,
  companyName: String,
})

const User = model<UserModel>('User', userSchema)

export default User
