const {
  CreateUser,
  findByrCedenitals,
  UpdateUSer,
  GetAllUsers,
  DeleteUser
} = require('../../models/users.models');

const {
  fliterObject
}  = require('../../services/query');

const sendTokenViaCookie = require('../../services/cookie');

const appError = require('../../services/class.err.middleware');
const multer = require('multer');
const sharp = require('sharp');

/* here store the image in the desk not memory
const multerStorage = multer.diskStorage({
  destination: (req , file , cb) => {
    cb(null , 'public/images/users');
  },
  filename:(req , file , cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null , `user-${req.user._id}-${Date.now()}.${ext}`);
  }
})
*/

// save the image in the memory as a buffer so i can use sharp to resize it
const multerStorage = multer.memoryStorage();
const multerFilter = (req , file , cb) => {
  if(file.mimetype.startsWith('image')) 
  {
    cb(null , true);
  }else {
    cb(new appError ('Not an image! please upload only images', 400 ) , false);
  }
}


const resizeImage = (req , res , next) => {
  if(!req.file) {
    return next();
  }
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`
  sharp(req.file.buffer)
  .resize({width:500 , height:500})
  .toFormat('jpeg')
  .jpeg({quality:90}) // compressed it's size
  .toFile(`public/images/users/${req.file.filename}`);

  next();
}

const upload = multer({
  storage: multerStorage,
  fileFilter : multerFilter,
})

const uploadImageMiddleware = upload.single('photo');

async function httpGetAllUsers(req ,res , next) {
  return res.status(200).json(await GetAllUsers());
}

async function httpCreateUser(req , res , next) {
   const user_info = req.body;
   const user = await CreateUser(user_info);
   const token = await user.getAuthToken();
   sendTokenViaCookie(token , res)
   return res.status(201).json({
     user,
     token,
   })
}

async function httpGetMyProfile (req , res , next) {
  const user = req.user;
  if(!user) {
    return next(new appError('something went wrong', 400));
  }
  return res.status(200).json({
    status:'success',
    data : user
  })
}


async function httpLoginUser (req , res , next) {
  const {email , password} = req.body;
  if(!email || !password) {
    return next(new appError('please provie email and password', 400));
  }
  const user = await findByrCedenitals (email , password);
  if(!user) {
   return next(new appError('unable to login', 400));
  }
  const token = await user.getAuthToken();
  sendTokenViaCookie(token , res)
  return res.status(201).json({
    user,
    token,
  })
}
async function httpUpdateUSer(req , res , next) {
  //console.log(req.file);
  if(req.body.password || req.body.passwordConfirm){
    return next(new appError('This route is not for password update, please use /updatepassword', 400));
  }
  
  const filter = fliterObject(req.body , 'name', 'email')
  if(req.file) {
    filter.photo = req.file.filename
  }
   const user = await UpdateUSer(req.user._id  , filter);

  return res.status(200).json({
    status:'success',
    data: user,
  })
}

async function httpDeleteMyAccount (req , res , next) {
  await DeleteUser(req.user._id);
  return res.status(200).json({
    status:'success',
    message:'your account has been deleted'
  })
}

async function httpLogOut (req , res , next) {
  
  res.cookie('jwt', 'LoggedOut', {
    expires: new Date(Date.now + 1 + 1000),// 1 sec
    httpOnly: true
  })
  return res.status(200).json({
    status:'success',
    message:'you have loged out'
  })
}


async function httpDeleteMyImage(req , res , next) {

  if(req.user.photo.startsWith('defualt')) {
   return next(new appError('You do not have an image to delete it!', 400));
  }
  req.user.photo ='defualt.png';
  await req.user.save();
  return res.status(200).json({
    status:'success',
    messgae:'your image has been deleted',
    data: req.user
  })
}

module.exports = {
  httpGetAllUsers,
  httpCreateUser,
  httpUpdateUSer,
  httpGetMyProfile,
  httpLoginUser,
  httpDeleteMyAccount,
  httpLogOut,
  uploadImageMiddleware,
  httpDeleteMyImage,
  resizeImage
}