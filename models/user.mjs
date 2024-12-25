import mongoose,{ Schema } from "mongoose";
import passport from "passport-local-mongoose";

const userSchema = new Schema ({
  email : {
    type : String,
    required: true,
    unique : [true, 'Email already registered']
  },
  firstname : {
    type : String,
    required: true,

  },
  lastname : {
    type : String,
    required: true,
  }
})

userSchema.plugin(passport) // this will automatically add user name and password field

export default mongoose.model('User',userSchema)
