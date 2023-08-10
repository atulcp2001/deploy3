const nodemailer = require('nodemailer')
const emailHost = process.env.EMAIL_HOST
const emailPort = process.env.EMAIL_PORT
const emailAccount = process.env.EMAIL_ACCOUNT
const emailPassword = process.env.EMAIL_PASSWORD 
const serverUrl = process.env.NODE_ENV !== 'development' ? process.env.SERVER_URL : 'http://localhost:4000'
// const serverUrl = 'https://deploy3-api.onrender.com'


const sendResetEmail = (email, resetToken) => {
    
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
      subject: 'Account Password Reset',
      text: `Please reset your account password by clicking the following link: ${serverUrl}/users/reset/${resetToken}`,
      // You can also include an HTML version of the email with a link/button styled as a hyperlink
    }
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending reset password email:', error);
      } else {
        console.log('Reset email sent:', info.response);
      }
    })
  }

  module.exports = sendResetEmail