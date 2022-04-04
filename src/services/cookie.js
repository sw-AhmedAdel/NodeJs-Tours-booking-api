require('dotenv').config();
// cookie means it is a text in the broswer it will have the jwt and the broswer will send it to the server
//each time client make a request so server can verify this token and this token can not be modefyied in the broser
function sendTokenViaCookie ( token , res) {
  const cookieOptions = {                              //  hours   mints   sec    milesec
   expires: new Date( Date.now() + process.env.EXPIRED_COOKIE  * 24  *60    *60    *1000), //convert that to mile sec
   httpOnly: true,//can not be accessed or modyfied by the borwser
  }
  if(process.env.NODE_ENV === 'production') {
    tokenOptions.secure = true; // means will only send in encrypted coneections which is https
  }
  res.cookie('jwt' , token , cookieOptions);
}

module.exports = sendTokenViaCookie;