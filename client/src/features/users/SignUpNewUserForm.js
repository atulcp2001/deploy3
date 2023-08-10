import { Fragment, useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import useTitle from "../../hooks/useTitle"
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from "react-router-dom";
import { HomeIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/outline';


const SignUpNewUserForm = () => {

  useTitle('Signup New User')
  const [addNewUser, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useAddNewUserMutation()

const [showModal, setShowModal] = useState(false)
const navigate = useNavigate()

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

// Function to open the modal
const openModal = () => {
  setShowModal(true);
};

// Function to close the modal
const closeModal = () => {
  navigate('/login')
};

const onGoHomeClicked = () => navigate('/login')

useEffect(() => {
  if (isSuccess) {
      setName('')
      setEmail('')  
      setUsername('')
      setPassword('')
      openModal()
  }
}, [isSuccess])

    const onNameChanged = e => setName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)      
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onSaveUserClicked = async (e) => {
      e.preventDefault()
        await addNewUser({ name, email, username, password })
    }

  const content = (
    <div className="bg-teal-900 h-screen">
      {isError && <p className="text-orange-600 font-semi-bold">{error?.data?.message}</p>}

      <div className="pt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSaveUserClicked}>
          <div className="text-center text-gray-300">
                  <div className="flex flex-row justify-evenly align-middle">
                      <button
                        className="mt-5 px-2 text-md font-oswald text-black hover:text-white hover:bg-teal-900 bg-yellow-400 rounded-lg"
                        title="Home"
                        onClick={onGoHomeClicked}
                        >
                          <HomeIcon className='h-8 w-8'/>
                      </button>
                    <h2 className="text-3xl font-bold py-5">New User Sign Up</h2>
                  </div>
                  
              <div className="flex items-center justify-center py-5">
                <button 
                  title="save"
                  className="block rounded-md bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                
                  >
                    Save
                </button>
              </div>
          </div>
            
          <div className="px-10 py-10 rounded-xl border-2 border-gray-500">
            <div>
                <label className="py-2 block text-sm font-medium leading-6 text-gray-300" htmlFor="name">
                            Name: <span className="nowrap">[3-20 letters]</span>
                </label>
                <div className="mb-4">
                    <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={name}
                    onChange={onNameChanged}
                    />
                </div>
            </div>

            <div>
                <label className="py-2 block text-sm font-medium leading-6 text-gray-300" htmlFor="email">
                            Email: <span className="nowrap">[3-20 letters]</span>
                </label>
                <div className="mb-4">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={onEmailChanged}
                    />
                </div>
            </div>

            <div>
                <label className="py-2 block text-sm font-medium leading-6 text-gray-300" htmlFor="username">
                            Username: <span className="nowrap">[3-20 letters]</span>
                </label>
                <div className="mb-4">
                    <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={username}
                    onChange={onUsernameChanged}
                    />
                </div>
            </div>

              <div>
                <label className="py-2 block text-sm font-medium leading-6 text-gray-300" htmlFor="password">
                            Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
                </label>
                <div className="mb-4">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={onPasswordChanged}
                    />
                </div>
              </div>
          </div> 
        </form>

        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={closeModal}>
            <div data-modal-backdrop="static" className="flex items-center justify-center min-h-screen px-4 pb-20 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-teal-800 bg-opacity-75" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel>
                  <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Signup successful
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Congratulations! You have successfully completed the sign-up. You can now use your credentials to sign in.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={closeModal}
                      >
                        Go to Sign In
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  )

  return content
}

export default SignUpNewUserForm