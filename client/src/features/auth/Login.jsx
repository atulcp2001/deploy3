import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'


const Login = () => {

  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

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

  if (isLoading) return <p className='text-yellow-300'>Loading...</p>

  const content =  (
    <section className="flex items-center justify-center h-screen bg-teal-900">    
        <header className="text-center text-white">
            <h1 className="my-5 py-5 text-8xl font-bold">Login Here!</h1>
        </header>

        <main>
          <p ref={errRef} className='text-yellow-300' aria-live="assertive">{errMsg}</p>

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

          </form>

        </main>
        
        <footer>
            <Link to="/">Back to Home</Link>
        </footer>

    </section>
  )

  return content
}

export default Login