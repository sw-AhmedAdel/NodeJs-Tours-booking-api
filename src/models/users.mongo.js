const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type : String ,
    required: [true , 'please provide your name'],
  },
  email : {
    type : String ,
    required :[true , 'please provide your email'],
    unique: true,
    validate : [validator.isEmail , 'please provide a valid email']
  },
  photo : {
    type : String,
  },
  password : {
    type:String ,
    required: [true, 'please provide your a password'],
    minlength : 8,
  },
  passwordConfirm : {
    type:String ,
    required: [true, 'please provide your a password'],
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }]
}, {
  timestamps : true,
})



const secret = process.env.JWT_SECRET;
userSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign( {_id : user._id.toString()} , secret , {expiresIn:'7 days'} );
  user.tokens.push({token});
  await user.save();
  return token;
}

userSchema.statics.findByrCedenitals =  await function (email , password) {
  const user = await users.findOne(email);
  if(!user) {
    return false;
  }

  const isMatch = await bcrypt.compare(password , user.password);
  if(!isMatch) {
    return false;
  }
  return user;
}

userSchema.pre('save' , async function(next) {
  const user = this;
  if(user.isModified  ('password')) {
    user.password = await bcrypt.hash(user.password , 8 );
  }
})

const users = mongoose.model('user' , userSchema);
module.exports = users;
