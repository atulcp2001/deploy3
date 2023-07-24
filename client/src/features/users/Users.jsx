import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { selectUserById  } from './usersApiSlice'

const Users = ( { userId }) => {

    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            // <tr className="table__row user">
            //     <td className={`table__cell ${cellStatus}`}>{user.username}</td>
            //     <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
            //     <td className={`table__cell ${cellStatus}`}>
            //         <button
            //             className="icon-button table__button"
            //             onClick={handleEdit}
            //         >
            //             <FontAwesomeIcon icon={faPenToSquare} />
            //         </button>
            //     </td>
            // </tr>

            <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {user.username}
                    </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{userRolesString}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Edit
                        </button>
                </td>
            </tr>
        )

    } else return null

}

export default Users


return (
    
  )