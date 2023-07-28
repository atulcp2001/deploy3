import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) return <p className='text-yellow-300'>Logging Out...</p>

    if (isError) return <p className='text-yellow-300'>Error: {error.data?.message}</p>

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <ArrowRightOnRectangleIcon className='h-12 w-12 text-white' />
        </button>
    )

    const content = (
        <header className="bg-teal-700">
            <div className="py-5 text-center">
                <Link to="/dash">
                    <h1 className="text-white p-5 text-6xl font-bold">Journey Notes</h1>
                </Link>
                <nav className="flex justify-end pr-10">
                    {/* add nav buttons later */}
                    {logoutButton}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader