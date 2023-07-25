import { useGetNotesQuery } from "./notesApiSlice"
import Note from './Note'

const NotesList = () => {

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery()

    let content 

    if(isLoading) content = <p>Loading....</p>

    if(isError) {
        content = <p>{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = notes

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null

        content = (
            <div class="flex flex-col items-center justify-center h-full py-10 bg-teal-900">
    <div class="text-center text-gray-300">
        <h1 class="py-5 text-4xl font-bold">Notes List</h1>
    </div>
    
    <div class="flex flex-grow w-3/4 px-4">
        <table class="w-full divide-y divide-gray-300">
            <thead>
                <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-white sm:pl-0">Status</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-white">Created</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-white">Updated</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-white">Title</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-white">Owner</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-white">Edit</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
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