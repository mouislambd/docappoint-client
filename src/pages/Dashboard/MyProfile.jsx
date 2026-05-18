import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FiEdit2, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

const MyProfile = () => {
    const { user, login } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ name: user?.name || '', photoURL: user?.photoURL || '' })

    const handleUpdate = (e) => {
        e.preventDefault()
        login({ ...user, name: form.name, photoURL: form.photoURL })
        setShowModal(false)
        toast.success('Profile updated successfully!')
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>

            <div className="bg-white rounded-2xl shadow-md p-8 max-w-md">
                <div className="flex flex-col items-center text-center">
                    <img
                        src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
                        alt={user?.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-green-400 mb-4"
                    />
                    <h3 className="text-2xl font-bold text-gray-800">{user?.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-6 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium px-6 py-2.5 rounded-xl transition">
                        <FiEdit2 size={15} /> Update Profile
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                        <button onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <FiX size={22} />
                        </button>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h3>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Name</label>
                                <input
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Photo URL</label>
                                <input
                                    value={form.photoURL}
                                    onChange={e => setForm({ ...form, photoURL: e.target.value })}
                                    placeholder="https://your-photo-url.com"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                />
                            </div>
                            <button type="submit"
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyProfile