import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AllAppointments from '../pages/AllAppointments'
import DoctorDetails from '../pages/DoctorDetails'
import Dashboard from '../pages/Dashboard/Dashboard'
import MyBookings from '../pages/Dashboard/MyBookings'
import MyProfile from '../pages/Dashboard/MyProfile'
import NotFound from '../pages/NotFound'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/appointments', element: <AllAppointments /> },
            { path: '/doctor/:id', element: <PrivateRoute><DoctorDetails /></PrivateRoute> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard /></PrivateRoute>,
                children: [
                    { path: 'my-bookings', element: <MyBookings /> },
                    { path: 'my-profile', element: <MyProfile /> },
                ]
            }
        ]
    }
])

export default router