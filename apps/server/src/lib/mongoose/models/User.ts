const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  hashedPw: String,
  title: String,
  isOlga: Boolean,
  photo: String,
  teamName: String,
  companyName: String,
})

const User = mongoose.model('User', userSchema)

export default User