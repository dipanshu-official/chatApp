import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
 
 
},
{
timestamps:true // createdAt and updatedAt
});

const User = mongoose.model("User" ,userSchema)
export default User