import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"

const EditNoteForm = ({note, users}) => {

  const [updateNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateNoteMutation()

  const [deleteNote, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
  }] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)
  const [userId, setUserId] = useState(note.user)

  useEffect(() => {

    if (isSuccess || isDelSuccess) {
        setTitle('')
        setText('')
        setUserId('')
        navigate('/dash/notes')
    }

  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChanged = e => setTitle(e.target.value)
  const onTextChanged = e => setText(e.target.value)
  const onCompletedChanged = e => setCompleted(prev => !prev)
  const onUserIdChanged = e => setUserId(e.target.value)

  // const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    // if (canSave) {
    //     await updateNote({ id: note.id, user: userId, title, text, completed })
    // }
    await updateNote({ id: note.id, user: userId, title, text, completed })
  }

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id })
  }

  const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
  const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

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

        {isError && isDelError && <p className="text-orange-600 font-semi-bold">{error?.data?.message || delerror?.data?.message}</p>}

        <div className="pt-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
          <div className="text-center text-gray-300">
            <h2 className="text-4xl font-bold py-5">Edit Note</h2>
              <div className="flex justify-between py-2">
                <button 
                  title="Save"
                  className="block rounded-md bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  // disabled={!canSave}
                  onClick={onSaveNoteClicked}
                  >
                    Save
                </button>

                <button 
                  title="Delete"
                  className="block rounded-md bg-red-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={onDeleteNoteClicked}
                  >
                    Delete
                </button>


              </div>
          </div>
            
          <div>
              <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="note-title">
                        Title:
              </label>
              <div className="mt-2">
                <input
                  id="note-title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={title}
                  onChange={onTitleChanged}
                />
              </div>
          </div>

          <div>
              <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="note-text">
                        Text: 
              </label>
              <div className="mt-2">
                <textarea
                  id="note-text"
                  name="text"
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={text}
                  onChange={onTextChanged}
                />
              </div>
          </div>

          <div>
              <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="note-completed">
                        WORK COMPLETE: 
              <input
                  id="note-completed"
                  name="completed"
                  type="checkbox"
                  checked={completed}
                  onChange={onCompletedChanged}
                  className="h-4 w-4 mx-2 px-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />   
              </label>
          </div>
          
          <div className="pb-10">
              <label className="block text-sm font-medium leading-6 text-gray-300" htmlFor="note-username">
                        ASSIGNED TO:
              </label>
              <div className="mt-2">
                <select
                  id="note-username"
                  name="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userId}
                  onChange={onUserIdChanged}
                > 
                  {options}
                </select>
              </div>

              <div className="pt-5 divide-y divide-gray-300">
                        <p className="py-2 text-gray-300">Created :   <span className="text-yellow-300 text-sm">{created}</span></p>
                        <p className="py-2 text-gray-300">Updated :   <span className="text-yellow-600 text-sm">{updated}</span></p>
              </div>

          </div>
          
        </form>
      </div>


    </div>
  )



  return content
}

export default EditNoteForm