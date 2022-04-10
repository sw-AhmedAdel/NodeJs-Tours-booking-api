
const users = require('./users.mongo');
const bookings = require('./booking.mongo');
const tours = require('./tours.mongo');

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

async function GetMyTours(user_id) {
  const userBookings = await bookings.find({
    user : user_id,
  })
  const toursId = userBookings.map((el) => el.tour); // return all tours id
  const userTours = await tours.find({
    _id: {
     $in : toursId
    }
  })
  return userTours;
 }

module.exports = {
  CreateUser,
  findByrCedenitals,
  UpdateUSer,
  GetAllUsers,
  DeleteUser,
  GetMyTours
}