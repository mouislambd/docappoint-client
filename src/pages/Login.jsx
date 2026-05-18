import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import toast from 'react-hot-toast'

const Login = () => {
    const { login, googleLogin } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const [form, setForm] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, form.email, form.password)
            login({
                name: result.user.displayName || form.email.split('@')[0],
                email: result.user.email,
                photoURL: result.user.photoURL,
                uid: result.user.uid
            })
            toast.success('Login successful!')
            navigate(from, { replace: true })
        } catch (err) {
            toast.error('Invalid email or password!')
        }
        setLoading(false)
    }

    const handleGoogleLogin = async () => {
        try {
            await googleLogin()
            toast.success('Login successful!')
            navigate(from, { replace: true })
        } catch (err) {
            toast.error('Google login failed!')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">

                <div className="text-center mb-8">
                    <span className="text-3xl">🩺</span>
                    <h2 className="text-3xl font-extrabold text-gray-800 mt-2">Login</h2>
                    <p className="text-gray-500 text-sm mt-1">Welcome back to DocAppoint</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                            placeholder="your@email.com" required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange}
                            placeholder="••••••••" required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                        <p className="text-right mt-1">
                            <span className="text-green-600 text-xs cursor-pointer hover:underline">Forgot Password?</span>
                        </p>
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-gray-400 text-xs">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <button onClick={handleGoogleLogin}
                    className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-green-600 font-semibold hover:underline">Register</Link>
                </p>
            </div>
        </div>
    )
}

export default Login