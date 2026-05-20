import { Outlet, NavLink } from 'react-router-dom'
import { useEffect } from 'react'

const Dashboard = () => {
    useEffect(() => {
        document.title = 'Dashboard | DocAppoint'
    }, [])

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-green-800 text-white p-6 flex flex-col gap-4">
                <NavLink to="my-bookings" className="hover:text-green-300">My Bookings</NavLink>
                <NavLink to="my-profile" className="hover:text-green-300">My Profile</NavLink>
            </aside>
            <main className="flex-grow p-8">
                <Outlet />
            </main>
        </div>
    )
}
export default Dashboard 