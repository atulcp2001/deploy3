import { useNavigate } from 'react-router-dom'

// import { useSelector } from 'react-redux'
// import { selectNoteById } from './notesApiSlice'

import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

const Note = ({ noteId }) => {

    //const note = useSelector(state => selectNoteById(state, noteId))

    const { note } = useGetNotesQuery('notesList', {
        selectFromResult: ( { data} ) => ({
            note: data?.entities[noteId]
        })
    })

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr className="py-3">
                <td className="whitespace-nowrap px-3 py-2 text-sm text-yellow-200">
                    {note.completed
                        ? (<span className="text-sm font-semibold text-yellow-400">Completed</span>)
                        : <span className="text-sm text-yellow-200">Open</span>
                    }
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-yellow-200">{created}</td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-yellow-200">{updated}</td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-yellow-200">{note.title}</td>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-yellow-200">{note.username}</td>

                <td className="table__cell">
                <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-auto text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleEdit}
                    >
                        Edit
                </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedNote = memo(Note)
export default memoizedNote