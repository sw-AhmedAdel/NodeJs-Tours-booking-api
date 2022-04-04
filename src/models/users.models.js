
const users = require('./users.mongo');

async function GetAllUsers () {
  return await users.find();
}

async function CreateUser (newUSer) {
  const user = new users(newUSer);
  await user.save();
  return user;
}

async function findByrCedenitals(email , password) {
  return await users.findByrCedenitals(email , password);
}

async function UpdateUSer (id , editUser) {
  const user = await users.findByIdAndUpdate(id , editUser , {
    new:true,
    runValidators:true,
  })
  return user;
}

async function DeleteUser (id) {
  await users.findByIdAndUpdate(id , {
    active: false,
  })
}

module.exports = {
  CreateUser,
  findByrCedenitals,
  UpdateUSer,
  GetAllUsers,
  DeleteUser
}