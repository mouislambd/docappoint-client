import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'

const HeroBanner = () => {
    return (
        <section className="relative bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 text-white overflow-hidden min-h-[92vh] flex items-center">

            {/* Background decorative circles */}
            <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] bg-green-600 opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] bg-emerald-400 opacity-10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

                {/* Left Content */}
                <div className="space-y-7">
                    <span className="inline-block bg-green-700 text-green-200 text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase">
                        🩺 Trusted Healthcare Platform
                    </span>

                    <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                        Book Your <br />
                        <span className="text-green-400">Doctor</span> Appointment <br />
                        In Seconds
                    </h1>

                    <p className="text-green-200 text-lg leading-relaxed max-w-md">
                        Connect with top-rated specialists, choose your preferred time, and get the care you deserve — all from one platform.
                    </p>

                    {/* Checklist */}
                    <ul className="space-y-3 text-green-100 text-sm">
                        {['100+ Verified Doctors', 'Instant Appointment Booking', 'Secure & Private', '24/7 Support'].map(item => (
                            <li key={item} className="flex items-center gap-2">
                                <FiCheckCircle className="text-green-400 text-lg shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link to="/appointments"
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-green-900/50">
                            Book Appointment <FiArrowRight />
                        </Link>
                        <Link to="/register"
                            className="flex items-center gap-2 border border-green-400 text-green-300 hover:bg-green-800 font-medium px-7 py-3.5 rounded-xl transition-all">
                            Get Started Free
                        </Link>
                    </div>
                </div>

                {/* Right — Stats + Image Card */}
                <div className="relative flex justify-center lg:justify-end">
                    {/* Main card */}
                    <div className="relative bg-green-800/50 backdrop-blur-sm border border-green-700/50 rounded-3xl p-8 w-full max-w-md shadow-2xl">

                        {/* Doctor image placeholder */}
                        <div className="w-full h-64 bg-gradient-to-br from-green-700 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                            <img
                                src="https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg"
                                alt="Doctor"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                                { number: '500+', label: 'Appointments' },
                                { number: '100+', label: 'Doctors' },
                                { number: '4.9★', label: 'Rating' },
                            ].map(stat => (
                                <div key={stat.label} className="bg-green-700/40 rounded-xl p-3">
                                    <p className="text-green-300 font-bold text-lg">{stat.number}</p>
                                    <p className="text-green-400 text-xs">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                             Verified Doctors
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default HeroBanner