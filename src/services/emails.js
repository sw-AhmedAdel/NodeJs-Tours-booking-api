require('dotenv').config();
const nodemailer = require('nodemailer');// used to create transporter to send emails
require('dotenv').config();
const pug = require('pug');
const htmlToText= require('html-to-text');

class Email {
  constructor (user , url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from =`Ahmed adel <${process.env.SENDGRID_EMAIL_FROM}> `;//must use actuall email and use from
  };

  newTransporter() {
    if(process.env.NODE_ENV==='production') {
      
    return nodemailer.createTransport({
      service:'SendGrid',
      auth:{
        user: process.env.SENDGRRID_USERNAME,
        pass: process.env.SENDGRRID_PASS,
      }
    })

    }
   return nodemailer.createTransport({
    host: process.env.EMAIL_HOST  ,
    port : 587,
    auth: {
      user : process.env.EMAIL_USERNAME ,
      pass :process.env.EMAIL_PASSWORD ,
     }
   })
 }
  async send(template , subject) {
    const html = pug.renderFile(
      `${__dirname}/../../views/emails/${template}.pug`,
      {
        firstName:this.firstName,
        url:this.url,
        subject
      }
    )
    const mailOptions ={
      from :this.from,
      to:this.to,
      subject,
      html,
      text :htmlToText.fromString(html)
    }
    await this.newTransporter().sendMail(mailOptions);
  }

  async sendWelcome() {
  await this.send('welcome' , 'welcome to our family :)');
  }
  async sendGoodBy(){
    await this.send('delete' , 'We will miss you, please come back soon!!');
  }

  async sendPasswordreset() {
    await this.send('passwordReset' ,'Your password token (valid for onlu 10 mints)');
  }

}
module.exports = Email;
/*
const sendEmail  =  async (options) =>{
  USING MAILTRAP
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
    from :`Ahmed Adel <${process.env.EMAIL_FRON}>`,
    to:options.email,
    subject: options.subject,
    text : options.message,
  }
  //3 send email

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
*/


