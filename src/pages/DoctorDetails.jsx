import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMapPin, FiStar, FiClock, FiDollarSign, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

const DoctorDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const [doctor, setDoctor] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({ patientName: '', gender: '', phone: '', appointmentDate: '', appointmentTime: '' })
    const [booking, setBooking] = useState(false)

    useEffect(() => {
        document.title = 'Doctor Details | DocAppoint'
        fetch(`https://docappoint-server-d42e.onrender.com/api/doctors/${id}`)
            .then(res => res.json())
            .then(data => setDoctor(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id])

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setBooking(true)

        const bookingData = {
            userEmail: user?.email,
            doctorId: doctor._id,
            doctorName: doctor.name,
            specialty: doctor.specialty,
            hospital: doctor.hospital,
            fee: doctor.fee,
            patientName: form.patientName,
            gender: form.gender,
            phone: form.phone,
            appointmentDate: form.appointmentDate,
            appointmentTime: form.appointmentTime,
        }

        try {
            const res = await fetch('https://docappoint-server-d42e.onrender.com/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData)
            })
            const data = await res.json()
            if (res.ok) {
                toast.success('Appointment booked successfully!')
                setShowModal(false)
            } else {
                toast.error(data.message || 'Booking failed!')
            }
        } catch (err) {
            toast.error('Something went wrong!')
        }
        setBooking(false)
    }

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    if (!doctor) return (
        <div className="text-center py-20 text-gray-500 text-xl">Doctor not found.</div>
    )

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="h-80 md:h-auto">
                            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                            <span className="text-green-600 text-sm font-semibold uppercase tracking-widest">{doctor.specialty}</span>
                            <h1 className="text-3xl font-extrabold text-gray-800 mt-1">{doctor.name}</h1>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <FiStar size={11} /> {doctor.rating}
                                </span>
                                <span className="text-gray-500 text-sm">{doctor.experience} experience</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed mt-4">{doctor.description}</p>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <FiMapPin className="text-green-500" /> {doctor.hospital}, {doctor.location}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <FiClock className="text-green-500" /> {doctor.availability?.join(' | ')}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <FiDollarSign className="text-green-500" />
                                    Consultation Fee: <span className="text-green-700 font-bold">৳{doctor.fee}</span>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(true)}
                                className="mt-6 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-xl transition w-fit">
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                        <button onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <FiX size={22} />
                        </button>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">Book Appointment</h3>
                        <p className="text-green-600 text-sm font-medium mb-6">{doctor.name} — {doctor.specialty}</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Patient Name</label>
                                <input type="text" name="patientName" value={form.patientName} onChange={handleChange} required
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                                <input type="email" value={user?.email} readOnly
                                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-400" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Gender</label>
                                <select name="gender" value={form.gender} onChange={handleChange} required
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
                                    <option value="">Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
                                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                                    placeholder="01XXXXXXXXX"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Date</label>
                                    <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Time</label>
                                    <input type="time" name="appointmentTime" value={form.appointmentTime} onChange={handleChange} required
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                                </div>
                            </div>
                            <button type="submit" disabled={booking}
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition mt-2">
                                {booking ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DoctorDetails