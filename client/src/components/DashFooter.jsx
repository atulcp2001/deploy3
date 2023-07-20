import { HomeIcon } from '@heroicons/react/24/solid'
import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="mt-5 mx-10 px-2 py-2 text-md font-oswald text-black hover:text-white hover:bg-teal-900 bg-yellow-400 rounded-lg"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <HomeIcon className='h-6 w-6'/>
            </button>
        )
    }

    const content = (
        <footer className="bg-slate-900 text-white">
            {goHomeButton}
            <p className='pt-5 mx-10'>Current User :</p>
            <p className='pb-5 mx-10'>Status :</p>
        </footer>
    )
    return content
}
export default DashFooter