import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
const serverUrl = process.env.SERVER_URL || 'http://localhost:4000' 

const ResetPassword = () => {
  useTitle('Reset Password')

  // const [username, setUsername] = useState('guest')
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false)
  const [resetPasswordMessage, setResetPasswordMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const seacrhParams = new URLSearchParams(location.search)
    const token = seacrhParams.get('resetToken')
    // const uname = searchParams.get('username')
    if(token) {
      setResetToken(token)
    }
    
  }, [location.search])

  const handleSubmit = async (e) => {
    e.preventDefault()

    //Basic data validation
    if (!newPassword) {
      setResetPasswordMessage('Please enter a new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetPasswordMessage('New password must match with confirm password');
      setNewPassword('')
      setConfirmPassword('')
      return;
    }

    // password specs
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!&*])[A-Za-z\d@#!&*]+$/;
    // if (!passwordRegex.test(newPassword)) {
    //   setResetPasswordMessage('Password must contain at least 1 uppercase letter, 1 number, and 1 special character (@, #, !, &, *)');
    //   return;
    // }

    //send the data to server to complete the reset
    try {

      const response = await fetch(`${serverUrl}/users/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newPassword, resetToken})
      })

      const data = await response.json()
      if(data){
        setResetPasswordMessage(data.message)
        setResetPasswordSuccess(true)
      }
      

    } catch (error) {
      // Error handling
        console.error('Error:', error);
    }

  }

  const handlePasswordInput = e => setNewPassword(e.target.value)
  const handleConfirmPasswordInput = e => setConfirmPassword(e.target.value)

  const content = (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen bg-teal-900">

    {/* Show only if there is a password message */}
  {!resetPasswordSuccess && resetPasswordMessage && (
    <p className='lg:mx-10 py-2 text-xl text-orange-600 font-oswald font-light'>{resetPasswordMessage}</p>
  )}

    {/* Show only when there is a resetToken in the url and the server has not sent back the response */}
  {!resetPasswordSuccess && (
        <div className='mx-auto rounded-xl border-2 border-gray-500 px-5 py-5 lg:px-20 lg:py-10 lg:mx-40'>

        <div className='flex flex-col items-center'>

          <h3 className="lg:my-2 py-2 text-yellow-300 text-xl lg:text-2xl font-bold">Reset Password</h3>
          {/* <p className='py-2 text-xl text-orange-600 font-oswald font-light'>user: {username}</p> */}
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="flex justify-center"> {/* Center align the input boxes */}
              <div className="mt-2 w-[300px]">
                <input
                  id="password"
                  type="password"
                  placeholder='Enter your new password here'
                  value={newPassword}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handlePasswordInput}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center"> {/* Center align the input boxes */}
              <div className="mt-2 w-full">
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder='Confirm your new password here'
                  value={confirmPassword}
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleConfirmPasswordInput}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="py-5 flex justify-center"> {/* Center align the button */}
              <button
                className="block rounded-md bg-indigo-600 w-30 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Set New Password
              </button>
            </div>
          </form>
        </div>
      </div>
  )}

  {resetPasswordSuccess && (
    <p className='lg:mx-10 py-2 text-xl text-yellow-600 font-oswald font-light'>
      <Link to='/login'>Password reset! Proceed to sign in</Link>
    </p>

  )}
        
    </div>

  )


  return content
}

export default ResetPassword