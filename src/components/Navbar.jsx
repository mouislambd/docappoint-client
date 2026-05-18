import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
    const { user, logout } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    const links = (
        <>
            <NavLink to="/" end className={({ isActive }) =>
                isActive ? 'text-green-300 font-semibold' : 'hover:text-green-300 transition'}>
                Home
            </NavLink>
            <NavLink to="/appointments" className={({ isActive }) =>
                isActive ? 'text-green-300 font-semibold' : 'hover:text-green-300 transition'}>
                All Appointments
            </NavLink>
            {user && (
                <NavLink to="/dashboard/my-bookings" className={({ isActive }) =>
                    isActive ? 'text-green-300 font-semibold' : 'hover:text-green-300 transition'}>
                    Dashboard
                </NavLink>
            )}
        </>
    )

    return (
        <nav className="bg-green-900 text-white sticky top-0 z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl">🩺</span>
                    <span className="text-xl font-bold tracking-wide">
                        Doc<span className="text-green-400">Appoint</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm">
                    {links}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <img
                                src={user.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                                alt={user.name}
                                className="w-9 h-9 rounded-full border-2 border-green-400 object-cover"
                                title={user.name}
                            />
                            <button
                                onClick={logout}
                                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm font-medium transition">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login"
                                className="border border-green-400 text-green-300 hover:bg-green-800 px-4 py-2 rounded-lg text-sm transition">
                                Login
                            </Link>
                            <Link to="/register"
                                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-green-800 px-6 pb-4 flex flex-col gap-4 text-sm">
                    {links}
                    {user ? (
                        <button onClick={logout}
                            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg text-sm font-medium transition w-fit">
                            Logout
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="border border-green-400 text-green-300 px-4 py-2 rounded-lg text-sm">Login</Link>
                            <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar