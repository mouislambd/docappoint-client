import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-6">
            <span className="text-8xl mb-6">🩺</span>
            <h1 className="text-7xl font-black text-green-600">404</h1>
            <h2 className="text-2xl font-bold text-gray-800 mt-3">Page Not Found</h2>
            <p className="text-gray-500 mt-2 max-w-md">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/"
                className="mt-8 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl transition">
                Back to Home
            </Link>
        </div>
    )
}

export default NotFound