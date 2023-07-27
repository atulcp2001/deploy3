import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="bg-teal-800 p-10 text-white">

            <p>{today}</p>

            <h1 className='text-2xl font-bold py-5'>Welcome!</h1>

            <p className='text-yellow-400'><Link to="/dash/notes">View User Notes</Link></p>

            <p className='text-yellow-400'><Link to="/dash/users">View User Settings</Link></p>

            <p className='text-yellow-400'><Link to="/dash/notes/new">Add a New User Note</Link></p>

            <p className='text-yellow-400'><Link to="/dash/users/new">Add a New User</Link></p>

        </section>
    )

    return content
}

export default Welcome