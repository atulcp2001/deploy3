const nodemailer = require('nodemailer')
const emailHost = process.env.EMAIL_HOST
const emailPort = process.env.EMAIL_PORT
const emailAccount = process.env.EMAIL_ACCOUNT
const emailPassword = process.env.EMAIL_PASSWORD 
const serverUrl = process.env.NODE_ENV !== 'development' ? process.env.SERVER_URL : 'http://localhost:4000'
// const serverUrl = 'https://deploy3-api.onrender.com'


const sendVerificationEmail = (email, verificationToken) => {
    
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: true,
      auth: {
        user: emailAccount,
        pass: emailPassword,
      },
    })
  
    const mailOptions = {
      from: emailAccount,
      to: email,
      subject: 'Account Verification',
      text: `Please verify your account by clicking the following link: ${serverUrl}/users/verify/${verificationToken}`,
      // You can also include an HTML version of the email with a link/button styled as a hyperlink
    }
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
      } else {
        console.log('Verification email sent:', info.response);
      }
    })
  }

  module.exports = sendVerificationEmail