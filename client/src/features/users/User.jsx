import { useNavigate } from 'react-router'
// import { useSelector } from 'react-redux'
// import { selectUserById  } from './usersApiSlice'

import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ( { userId }) => {

    //const user = useSelector(state => selectUserById(state, userId))

    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ( { data }) => ({
           user: data?.entities[userId] 
        })
    })

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        return (
            <tr>
                <td className="whitespace-nowrap px-3 py-2 text-sm text-yellow-200">
        {user.username}
    </td>
    <td className="whitespace-nowrap px-3 py-2 text-sm text-yellow-200">{userRolesString}</td>
    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
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

const memoizedUser = memo(User)
export default memoizedUser