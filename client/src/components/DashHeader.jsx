import { Link } from 'react-router-dom'

const DashHeader = () => {

    const content = (
        <header className="bg-teal-700">
            <div className="py-5 text-center">
                <Link to="/dash">
                    <h1 className="text-white p-5 text-6xl font-bold">Journey Notes</h1>
                </Link>
                <nav className="flex justify-between">
                    {/* add nav buttons later */}
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader