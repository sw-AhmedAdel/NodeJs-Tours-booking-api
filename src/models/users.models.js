
const users = require('./users.mongo');

async function CreateUser (newUSer) {
  const user = new users(newUSer);
  await user.save();
  return user;
}

async function findByrCedenitals(email , password) {
  return await users.findByrCedenitals(email , password);
}

module.exports = {
  CreateUser,
  findByrCedenitals
}