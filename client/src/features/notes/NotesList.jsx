import { useGetNotesQuery } from "./notesApiSlice"
import Note from './Note'
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"

const NotesList = () => {
    useTitle('Notes List')
    const { username, isCoach, isAdmin } = useAuth()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content 

    if(isLoading) content = <p>Loading....</p>

    if(isError) {
        content = <p className="text-yellow-400 text-xl">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = notes

        let filteredIds
        if (isCoach || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)
        

        content = (
            <div className="flex flex-col items-center justify-center h-full py-10 bg-teal-900">
    <div className="text-center text-gray-300">
        <h1 className="py-5 text-4xl font-bold">Notes List</h1>
    </div>
    
    <div className="flex flex-grow w-3/4 px-4">
        <table className="w-full divide-y divide-gray-300">
            <thead>
                <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-white sm:pl-0">Status</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-white">Created</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-white">Updated</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-white">Title</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-white">Owner</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold text-white">Edit</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {tableContent}
            </tbody>
        </table>
    </div>
</div>

            
        )
    }
    
    return content
}

export default NotesList