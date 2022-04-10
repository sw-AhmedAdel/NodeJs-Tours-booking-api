require('dotenv').config();
const nodemailer = require('nodemailer');// used to create transporter to send emails
require('dotenv').config();

class Email {
  constructor (user , url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from =`Ahmed adel <${process.env.EMAIL_FRON}> `;
  };

  newTransporter() {
    if(process.env.NODE_ENV==='production') {

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
  async send(subject , message) {
    const mailOptions ={
      from :this.from,
      to:this.to,
      subject,
      text :message
    }
    await this.newTransporter().sendMail(mailOptions);
  }

  async sendWelcome() {
  await this.send('Welcome' , 'welcome to our family :)');
  }
  async sendGoodBy(){
    await this.send('You deleted you account' , 'We will miss you, please come back soon!!');
  }

  async sendPasswordreset(subject , message) {
    await this.send(subject , message);
  }

}
module.exports = Email;
/*
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


