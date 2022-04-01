const mongoose = require('mongoose');
const validator = require('validator');

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


const users = mongoose.model('user' , userSchema);
module.exports = users;
