import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { 
    ArrowRightOnRectangleIcon,
    DocumentDuplicateIcon,
    UserPlusIcon,
    UserGroupIcon,
    DocumentPlusIcon 
} from '@heroicons/react/24/solid'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const { isCoach, isAdmin } = useAuth()

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

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users') 


    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "max-width-[800px]"
    }

    let newNoteButton = null
    if(NOTES_REGEX.test(pathname)){
        newNoteButton = (
            <button
            className="rounded-md mx-2 bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                title='New Note'
                onClick={onNewNoteClicked}
                >
                <DocumentPlusIcon className='h-12 w-12 text-white'/>
            </button>

        )
    }
    
    let newUserButton = null
    if(USERS_REGEX.test(pathname)){
        newUserButton = (
            <button
            className="rounded-md mx-2 bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            title='New User'
            onClick={onNewUserClicked}
                >
                <UserPlusIcon className='h-12 w-12 text-white'/>
            </button>

        )
    }
    
    let userButton = null
    if(isCoach || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')){
            userButton = (
                <button
                className="rounded-md mx-2 bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"    
                title='Users'
                onClick={onUsersClicked}
                    >
                    <UserGroupIcon className='h-12 w-12 text-white'/>
                </button>
    
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')){
            notesButton = (
                <button
                className="rounded-md mx-2 bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    title='Notes'
                    onClick={onNotesClicked}
                    >
                    <DocumentDuplicateIcon className='h-12 w-12 text-white'/>
                </button>
    
            )
        }
    
    const logoutButton = (
        <button
            className="rounded-md mx-2 bg-indigo-600 w-20 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            title="Logout"
            onClick={sendLogout}
        >
            <ArrowRightOnRectangleIcon className='h-12 w-12 text-white' />
        </button>
    )



    if (isError) return <p className='text-yellow-300'>Error: {error?.data?.message}</p>
  

    let buttonContent
    if (isLoading) {
        buttonContent = <p className='text-yellow-300'>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <header className="bg-teal-700">
            <div className="py-5 text-center">
                <Link to="/dash">
                    <h1 className="text-white p-5 text-6xl font-bold">Journey Notes</h1>
                </Link>
                <nav className="flex justify-end pr-10">
                    {/* add nav buttons later */}
                    {buttonContent}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader