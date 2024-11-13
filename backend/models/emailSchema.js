const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  otp: String,
  otpExpiresAt: Date,
})
const User = mongoose.model('otp', userSchema)
module.exports=User
