import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { auth } from '../lib/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import toast from 'react-hot-toast'

const Register = () => {
    const { googleLogin } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', photoURL: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = e => { setForm({ ...form, [e.target.name]: e.target.value }); setError('') }

    const validatePassword = (password) => {
        if (password.length < 6) return 'Password must be at least 6 characters'
        if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
        if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter'
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const passwordError = validatePassword(form.password)
        if (passwordError) { setError(passwordError); return }
        setLoading(true)
        try {
            const result = await createUserWithEmailAndPassword(auth, form.email, form.password)
            await updateProfile(result.user, { displayName: form.name, photoURL: form.photoURL })
            toast.success('Registration successful! Please login.')
            navigate('/login')
        } catch (err) {
            toast.error(err.message || 'Registration failed!')
        }
        setLoading(false)
    }

    const handleGoogleSignup = async () => {
        try {
            await googleLogin()
            toast.success('Registration successful!')
            navigate('/')
        } catch (err) {
            toast.error('Google signup failed!')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <span className="text-3xl">🩺</span>
                    <h2 className="text-3xl font-extrabold text-gray-800 mt-2">Register</h2>
                    <p className="text-gray-500 text-sm mt-1">Create your DocAppoint account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                            placeholder="Your full name" required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                            placeholder="your@email.com" required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Photo URL</label>
                        <input type="url" name="photoURL" value={form.photoURL} onChange={handleChange}
                            placeholder="https://your-photo-url.com"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange}
                            placeholder="••••••••" required
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
                        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                    </div>
                    <button type="submit" disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition">
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-gray-400 text-xs">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <button onClick={handleGoogleSignup}
                    className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-600 font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register