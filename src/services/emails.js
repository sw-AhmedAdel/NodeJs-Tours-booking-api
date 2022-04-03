require('dotenv').config();
const nodemailer = require('nodemailer');// used to create transporter to send emails

const sendEmail  =  async (options) =>{
  // 1 create transporter > servie like gmail
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST  ,
    port : 587,
    
    auth: {
      user : process.env.EMAIL_USERNAME ,
      pass :process.env.EMAIL_PASSWORD ,
    }
  })
  //2 define enail options
  const mailOptions ={
    from :'Ahmed Adel <hello@gmail.io>',
    to:options.email,
    subject: options.subject,
    text : options.message,
  }
  //3 send email

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;