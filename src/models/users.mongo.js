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
    required: [true, 'please provide your  password'],
    minlength : 8,
   },
  passwordConfirm : {
    type:String ,
    required: [true, 'please provide your password'],
    
    validate : {
      validator : function(val) {
        return val === this.password;
      },
      message :'passwords are not the same',
    }
  },
 passwordCreatedAt : Date,

  /*tokens: [{
    token: {
      type: String,
      required: true,
    },
  }]*/
}, {
  timestamps : true,
})



userSchema.methods.changePasswordAfter =  function(jwtTime) {
 
  if(this.passwordCreatedAt) {
   const changePasswordTime = parseInt(this.passwordCreatedAt.getTime() / 1000 , 10);

   return jwtTime < changePasswordTime
  }
  return false;
}
/* 1 when i use the cookie to store the token, first check if token is verify   
 2- when i get the decoded i need to check if the user still exits in the database or he deleted his account 
 3- if user exits i want to make sure he did not change the password coz it related to the token
 so i need to give him new token 
*/ 


userSchema.methods.toJSON = function () {
  const user =this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.passwordConfirm;
  //delete userObject.tokens;
  return userObject;
}

const secret = process.env.JWT_SECRET;
userSchema.methods.getAuthToken = async function () {
  const user = this;
  const token = jwt.sign( {_id : user._id.toString()} , secret , {expiresIn:'7 days'} );
//  user.tokens.push({token});
  await user.save();
  return token;
}

userSchema.statics.findByrCedenitals =  async function (email , password) {
  const user = await users.findOne({
    email
  });
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
   if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password , 12 );
    user.passwordConfirm = user.password ;
  }

  next();
})

 
const users = mongoose.model('user' , userSchema);
module.exports = users;
