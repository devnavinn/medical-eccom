import logo from './../../assets/nav.svg'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <header>
            <nav className="flex justify-between items-center py-2 ">
                <Link to="/" className='flex'>
                    <span className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                    </span>
                    <h1 className="text-base font-medium text-[#003780]">Back to home page</h1>
                </Link>
                <img src={logo} alt="Logo" className="w-20 h-20" />
                <div />
            </nav>
        </header>
    )
}

export default Navbar