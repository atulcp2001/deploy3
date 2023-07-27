import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from '../../config/role'

const EMAIL_REGEX = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

  const [updateUser, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useUpdateUserMutation()

const [deleteUser, {
  isSuccess: isDelSuccess,
  isError: isDelError,
  error: delerror
}] = useDeleteUserMutation()

const navigate = useNavigate()

const [name, setName] = useState(user.name)
const [email, setEmail] = useState(user.email)
const [validEmail, setValidEmail] = useState(false)
const [username, setUsername] = useState(user.username)
const [validUsername, setValidUsername] = useState(false)
const [password, setPassword] = useState('')
const [validPassword, setValidPassword] = useState(false)
const [roles, setRoles] = useState(user.roles)
const [active, setActive] = useState(user.active)

useEffect(() => {
  setValidEmail(EMAIL_REGEX.test(email))
}, [email])

useEffect(() => {
  setValidUsername(USER_REGEX.test(username))
}, [username])

useEffect(() => {
  setValidPassword(PWD_REGEX.test(password))
}, [password])

useEffect(() => {
  console.log(isSuccess)
  if (isSuccess || isDelSuccess) {
      setName('')
      setEmail('')
      setUsername('')
      setPassword('')
      setRoles([])
      navigate('/dash/users')
  }

}, [isSuccess, isDelSuccess, navigate])


    const onNameChanged = e => setName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)      
    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
      const values = Array.from(
          e.target.selectedOptions, //HTMLCollection 
          (option) => option.value
      )
      setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
      
      if (password) {
          await updateUser({ id: user.id, name, email, username, password, roles, active })
      } else {
          await updateUser({ id: user.id, name, email, username, roles, active })
      }
    }

    const onDeleteUserClicked = async () => {
      await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
      return (
          <option
              key={role}
              value={role}

          > {role}</option >
      )
    })

    let canSave

    if (password) {
      canSave = [roles.length, name, validEmail, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
      canSave = [roles.length, name, validEmail, validUsername].every(Boolean) && !isLoading
    }

  const content = (
    <div className="bg-teal-900">
      {isError && isDelError && <p className="text-orange-600 font-semi-bold">{error?.data?.message || delerror?.data?.message}</p>}

      <div className="pt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
          <div className="text-center text-gray-300">
            <h2 className="text-4xl font-bold py-5">Edit User</h2>
              <div className="flex justify-between py-2">
                <button 
                  title="Save"
                  className="block rounded-md bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  // disabled={!canSave}
                  onClick={onSaveUserClicked}
                  >
                    Save
                </button>

                <button 
                  title="Delete"
                  className="block rounded-md bg-red-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={onDeleteUserClicked}
                  >
                    Delete
                </button>
              </div>
          </div>
            
          <div>
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="name">
                        Name: <span className="nowrap">[3-20 letters]</span>
              </label>
              <div className="mt-2">
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
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="email">
                        Email: <span className="nowrap">[3-20 letters]</span>
              </label>
              <div className="mt-2">
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
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="username">
                        Username: <span className="nowrap">[3-20 letters]</span>
              </label>
              <div className="mt-2">
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
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="password">
                        Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
              </label>
              <div className="mt-2">
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

          <div>
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="user-active">
                        ACTIVE: 
              <input
                  id="user-active"
                  name="user-active"
                  type="checkbox"
                  checked={active}
                  onChange={onActiveChanged}
                  className="h-4 w-4 px-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />   
              </label>
          </div>

          <div className="pb-10">
              <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="roles">
                        Assigned Roles:
              </label>
              <div className="mt-2">
                <select
                  id="roles"
                  name="roles"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  multiple={true}
                  size="3"
                  value={roles}
                  onChange={onRolesChanged}
                > 
                  {options}
                </select>
              </div>
          </div>
        </form>
      </div>

    </div>
  )

  return content
}

export default EditUserForm