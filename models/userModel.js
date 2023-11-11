import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: {
    createdAt: 'created_at', 
    updatedAt: 'updated_at'  
  } 
});

const User = mongoose.model("User", userSchema);

export default User;
