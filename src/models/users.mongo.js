const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =require('bcrypt');

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
  }
}, {
  timestamps : true,
})





userSchema.pre('save' , async function(next) {
  const user = this;
  if(user.isModified  ('password')) {
    user.password = await bcrypt.hash(user.password , 8 );
  }
})

const users = mongoose.model('user' , userSchema);
module.exports = users;
