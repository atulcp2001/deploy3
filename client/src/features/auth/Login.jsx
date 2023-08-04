import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'


const Login = () => {
  useTitle('Trail Notes - Login')

  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
    }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const { accessToken } = await login({ username, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setUsername('')
        setPassword('')
        navigate('/dash')
    } catch (err) {
        if (!err.status) {
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg(err.data?.message);
        }
        errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = (e) => setPersist(prev => !prev)

  if (isLoading) return <p className='text-yellow-300'>Loading...</p>

  const content =  (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen bg-teal-900">    
        <div className="w-1/2 text-center text-white">
            <h1 className="lg:ml-10 lg:my-10 py-5 text-3xl lg:text-8xl font-bold">Start Here!</h1>
        </div>

        <div className='mx-auto rounded-xl border-2 border-gray-500 px-5 py-5 lg:px-20 lg:py-10 lg:mx-40'>
          <p ref={errRef} className='text-yellow-300' aria-live="assertive">{errMsg}</p>

          <h3 className="lg:ml-10 lg:my-2 py-2 text-yellow-300 text-xl lg:text-3xl font-bold">Sign In</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="username">
                          Username:
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    type="text"
                    ref={userRef}
                    value={username}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                  />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="password">
                          Password:
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handlePwdInput}
                    required
                  />
                </div>
            </div>

            <div className="py-5">
                <button 
                  className="block rounded-md bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign In
                </button>
              </div>

              <div className='pb-10'>
                  <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="persist">
                            
                  <input
                      id="persist"
                      type="checkbox"
                      checked={persist}
                      onChange={handleToggle}
                      className="h-4 w-4 mr-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />   
                    Trust this device 
                  </label>
              </div>
              
          </form>
            <div className='py-30 flex flex-col'>
              <Link to="/signup" className='text-yellow-300 text-lg'>Sign up here</Link>
              <Link to="/" className='text-white text-lg'>Back to Home</Link>

            </div>
        </div>
    </div>
  )

  return content
}

export default Login