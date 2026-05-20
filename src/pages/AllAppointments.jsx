import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiSearch, FiMapPin, FiStar, FiClock } from 'react-icons/fi'

const AllAppointments = () => {
    const { user } = useAuth()
    const [doctors, setDoctors] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = 'All Appointments | DocAppoint'
        fetch('https://docappoint-server-d42e.onrender.com/api/doctors')
            .then(res => res.json())
            .then(data => setDoctors(Array.isArray(data) ? data : []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    const filtered = doctors.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-10">
                    <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">All Doctors</span>
                    <h2 className="text-4xl font-extrabold text-gray-800 mt-2">Book an Appointment</h2>
                    <p className="text-gray-500 mt-3">Find and book appointments with our verified specialists</p>
                </div>

                <div className="max-w-lg mx-auto mb-10">
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by doctor name..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-sm"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center text-gray-400 py-20 text-lg">No doctors found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map(doctor => (
                            <div key={doctor._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                                <div className="relative h-52 overflow-hidden">
                                    <img src={doctor.image} alt={doctor.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        <FiStar size={11} /> {doctor.rating}
                                    </div>
                                    <div className="absolute bottom-3 left-3 bg-white/90 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                                        {doctor.specialty}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                                        <FiMapPin size={13} className="text-green-500" />
                                        {doctor.hospital} • {doctor.location}
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                        <FiClock size={13} className="text-green-500" />
                                        {doctor.experience} experience
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {doctor.availability.map((time, i) => (
                                            <span key={i} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
                                                {time}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mt-5">
                                        <span className="text-green-700 font-bold text-lg">৳{doctor.fee}</span>
                                        <Link
                                            to={user ? `/doctor/${doctor._id}` : '/login'}
                                            className="bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-5 py-2 rounded-xl transition">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllAppointments