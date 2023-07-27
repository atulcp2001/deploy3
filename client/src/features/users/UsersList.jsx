import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content 

    if(isLoading) content = <p>Loading....</p>

    if(isError) {
        content = <p>{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <div class="flex flex-col items-center justify-center h-full py-10 bg-teal-900">
    <div class="text-center text-gray-300">
        <h1 class="py-5 text-4xl font-bold">Users List</h1>
    </div>
    
    <div class="flex flex-grow w-3/4 px-4">
        <table class="w-full divide-y divide-gray-300">
            <thead>
                <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-lg font-semibold text-white sm:pl-0">Username</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-lg font-semibold text-white">Roles</th>
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

export default UsersList