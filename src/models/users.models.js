
const users = require('./users.mongo');

async function CreateUser (newUSer) {
  const user = new users(newUSer);
  await user.save();
  return user;
}


module.exports = {
  CreateUser
}