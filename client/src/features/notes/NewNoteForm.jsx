import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"

const NewNoteForm = ( {users} ) => {

  const [addNewNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewNoteMutation()

  const navigate = useNavigate();

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [userId, setUserId] = useState(users[0].id)

  useEffect(() => {
    if (isSuccess) {
        setTitle('')
        setText('')
        setUserId('')
        navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onUserIdChanged = e => setUserId(e.target.value)

  // const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    e.preventDefault()
    // if (canSave) {
    //     await addNewNote({ user: userId, title, text })
    // }

        await addNewNote({ user: userId, title, text })
  }

  const options = users.map(user => {
    return (
        <option
            key={user.id}
            value={user.id}
        > {user.username}</option >
    )
  })

  const content = (
    <div className="bg-teal-900">

      {isError && <p className="text-orange-600 font-semi-bold">{error?.data?.message}</p>}

      <div className="pt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSaveNoteClicked}>
          <div className="text-center text-gray-300">
            <h2 className="text-4xl font-bold py-5">New Note</h2>
              <div className="py-5">
                <button 
                  title="save"
                  className="block rounded-md bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  // disabled={!canSave}
                  >
                    Save
                </button>
              </div>
          </div>
            
          <div>
              <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="title">
                        Title:
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={title}
                  onChange={onTitleChanged}
                />
              </div>
          </div>

          <div>
              <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="text">
                        Text: 
              </label>
              <div className="mt-2">
                <textarea
                  id="text"
                  name="text"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={text}
                  onChange={onTextChanged}
                />
              </div>
          </div>
          
          <div className="pb-10">
              <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="username">
                        ASSIGNED TO:
              </label>
              <div className="mt-2">
                <select
                  id="username"
                  name="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userId}
                  onChange={onUserIdChanged}
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

export default NewNoteForm