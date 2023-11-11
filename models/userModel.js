import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const userSchema = mongoose.Schema({
  name: {
    required: [true, "The first name is required!"],
    trim: true,
    minLength: 3,
    maxLength: 10,
  },
  email: {
    type: String,
    required: [true, "The last name is required!"],
    trim: true,
    minLength: 7
  },
  password: {
    type: String,
    required: [true, "The password is required!"],
    minLength: 4,
  },
  timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

userSchema.methods.generateToken = function(payload,secret){
  const token = jwt.sign(payload, secret, {
    expiresIn: 3600,
  });
 return token;
}

userSchema.methods.hashPassword = async function(password,salt){

  const hash = await bcrypt.hash(password,salt) ;
  return hash
}

const userModel = new mongoose.model("User", userSchema);


export default User;
