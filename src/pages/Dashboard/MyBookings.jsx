import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

const MyBookings = () => {
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [editBooking, setEditBooking] = useState(null)
    const [form, setForm] = useState({})

    useEffect(() => {
        if (!user?.email) return
        fetch(`https://docappoint-server-d42e.onrender.com/api/appointments/user/${user.email}`)
            .then(res => res.json())
            .then(data => setBookings(Array.isArray(data) ? data : []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [user])

    const handleDelete = async (id) => {
        try {
            await fetch(`https://docappoint-server-d42e.onrender.com/api/appointments/${id}`, {
                method: 'DELETE'
            })
            setBookings(bookings.filter(b => b._id !== id))
            toast.success('Appointment deleted successfully!')
        } catch (err) {
            toast.error('Delete failed!')
        }
    }

    const handleEditOpen = (booking) => {
        setEditBooking(booking)
        setForm({
            patientName: booking.patientName,
            gender: booking.gender,
            phone: booking.phone,
            appointmentDate: booking.appointmentDate,
            appointmentTime: booking.appointmentTime,
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`https://docappoint-server-d42e.onrender.com/api/appointments/${editBooking._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            const updated = await res.json()
            setBookings(bookings.map(b => b._id === editBooking._id ? { ...b, ...form } : b))
            setEditBooking(null)
            toast.success('Appointment updated successfully!')
        } catch (err) {
            toast.error('Update failed!')
        }
    }

    if (loading) return (
        <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    if (bookings.length === 0) return (
        <div className="text-center py-20 text-gray-400 text-lg">
            No bookings yet.
        </div>
    )

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map(booking => (
                    <div key={booking._id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{booking.doctorName}</h3>
                                <span className="text-green-600 text-xs font-semibold">{booking.specialty}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEditOpen(booking)}
                                    className="bg-blue-50 text-blue-500 hover:bg-blue-100 p-2 rounded-lg transition">
                                    <FiEdit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(booking._id)}
                                    className="bg-red-50 text-red-500 hover:bg-red-100 p-2 rounded-lg transition">
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 space-y-1 text-sm text-gray-500">
                            <p><span className="font-medium text-gray-700">Patient:</span> {booking.patientName}</p>
                            <p><span className="font-medium text-gray-700">Gender:</span> {booking.gender}</p>
                            <p><span className="font-medium text-gray-700">Phone:</span> {booking.phone}</p>
                            <p><span className="font-medium text-gray-700">Date:</span> {booking.appointmentDate}</p>
                            <p><span className="font-medium text-gray-700">Time:</span> {booking.appointmentTime}</p>
                            <p><span className="font-medium text-gray-700">Hospital:</span> {booking.hospital}</p>
                            <p><span className="font-medium text-gray-700">Fee:</span> <span className="text-green-600 font-bold">৳{booking.fee}</span></p>
                        </div>
                    </div>
                ))}
            </div>

            {editBooking && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                        <button onClick={() => setEditBooking(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <FiX size={22} />
                        </button>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">Update Appointment</h3>
                        <p className="text-green-600 text-sm mb-6">{editBooking.doctorName}</p>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Doctor</label>
                                <input value={editBooking.doctorName} readOnly
                                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-400" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                                <input value={user?.email} readOnly
                                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-400" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Patient Name</label>
                                <input value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Gender</label>
                                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
                                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Date</label>
                                    <input type="date" value={form.appointmentDate}
                                        onChange={e => setForm({ ...form, appointmentDate: e.target.value })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Time</label>
                                    <input type="time" value={form.appointmentTime}
                                        onChange={e => setForm({ ...form, appointmentTime: e.target.value })}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                                </div>
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

export default MyBookings