import React, { useEffect, useState } from 'react'
import useTitle from '../../hooks/useTitle'
// const serverUrl = process.env.SERVER_URL || 'http://localhost:4000' 
const serverUrl = 'https://deploy3-api.onrender.com'         

const ForgotPasswordForm = () => {

}

const ResetPasswordForm = () => {

}


const PasswordReset = () => {

  useTitle('Forgot Password')
      
  const [resetPasswordEmail, setResetPasswordEmail] = useState('')
  const [resetPasswordMessage, setResetPasswordMessage] = useState('')
  
const handleEmailInput = e => setResetPasswordEmail(e.target.value)

const handleSubmit = async (e) => {
  e.preventDefault()

  //Basic validation
  if(!resetPasswordEmail) {
    setResetPasswordMessage('Please enter your email');
      return;
  }

  //Send the email to the server to check and validate

  try{
    const response = await fetch(`${serverUrl}/users/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: resetPasswordEmail })
    })

    const data = await response.json()

    setResetPasswordMessage(data.message)

    // if(response.ok) {
    //   // Forgot password email sent successfully
    //   setResetPasswordMessage(data.message);
    // } else {
    //   // Forgot password failed
    //   const error = await response.json();
    //   setResetPasswordMessage(error.message);
    // }

  }catch (error) {
    // Error handling
    console.error('Error:', error);
  }
}

const content =  (
  <div className="flex flex-col lg:flex-row items-center justify-center h-screen bg-teal-900"> 

          {resetPasswordMessage && (
            <p className='py-2 text-xl text-orange-600 font-oswald font-light'>{resetPasswordMessage}</p>
          )}   
      <div className='mx-auto rounded-xl border-2 border-gray-500 px-5 py-5 lg:px-20 lg:py-10 lg:mx-40'>

        <div className='flex flex-col items-center'>
        <h3 className="lg:ml-10 lg:my-2 py-2 text-yellow-300 text-xl lg:text-2xl font-bold">Forgot Password</h3>
        
        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  placeholder='Enter your email here'
                  value={resetPasswordEmail}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleEmailInput}
                  autoComplete="off"
                  required
                />
              </div>
          </div>

            <div className="py-5 justify-center">
              <button 
                className="block rounded-md bg-indigo-600 w-30 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send Reset Link
              </button>
            </div>
            
        </form>
        </div>
        
      </div>
  </div>
)

  return content
}

export default PasswordReset