const {
  CreateUser,
} = require('../../models/users.models');


async function httpCreateUser(req , res) {
   const user = req.body;
   await CreateUser(user);
   const token = await user.getAuthToken();
   return res.status(201).json({
     user,
     token,
   })
}

module.exports = {
  httpCreateUser
}