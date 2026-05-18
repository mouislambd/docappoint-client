import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiMapPin, FiStar, FiClock } from 'react-icons/fi'
import axiosInstance from '../../lib/axios'

const TopDoctors = () => {
    const { user } = useAuth()
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosInstance.get('/api/doctors/top-rated')
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : []
                setDoctors(data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <section className="py-20 bg-gray-50">
            <div className="flex justify-center items-center h-40">
                <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        </section>
    )

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Our Specialists</span>
                    <h2 className="text-4xl font-extrabold text-gray-800 mt-2">Top Rated Doctors</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Meet our highest-rated medical professionals, chosen by thousands of satisfied patients.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {doctors.map(doctor => (
                        <div key={doctor._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <div className="relative h-56 overflow-hidden">
                                <img src={doctor.image} alt={doctor.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <FiStar size={11} /> {doctor.rating}
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-green-600 text-xs font-semibold uppercase tracking-wide">{doctor.specialty}</span>
                                <h3 className="text-xl font-bold text-gray-800 mt-1">{doctor.name}</h3>
                                <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                                    <FiMapPin size={13} className="text-green-500" /> {doctor.hospital}
                                </div>
                                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                                    <FiClock size={13} className="text-green-500" /> {doctor.experience} experience
                                </div>
                                <div className="flex items-center justify-between mt-5">
                                    <span className="text-green-700 font-bold text-lg">৳{doctor.fee}</span>
                                    <Link to={user ? `/doctor/${doctor._id}` : '/login'}
                                        className="bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-5 py-2 rounded-xl transition">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/appointments"
                        className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition-all">
                        View All Doctors
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TopDoctors