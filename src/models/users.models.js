
const users = require('./users.mongo');

async function CreateUser (newUSer) {
  const user = new users({
    name:newUSer.name,
    email : newUSer.email,
    password: newUSer.password,
    passwordConfirm :newUSer.passwordConfirm,
    photo :newUSer.photo,
  });
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

module.exports = {
  CreateUser,
  findByrCedenitals,
  UpdateUSer
}