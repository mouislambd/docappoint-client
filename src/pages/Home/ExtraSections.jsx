import { FiShield, FiClock, FiPhone, FiAward } from 'react-icons/fi'

const ExtraSections = () => {
    return (
        <>
            {/* Section 1: Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Why Us</span>
                        <h2 className="text-4xl font-extrabold text-gray-800 mt-2">Why Choose DocAppoint?</h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                            We make healthcare simple, fast, and accessible for everyone.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <FiShield size={28} />, title: 'Verified Doctors', desc: 'All doctors are thoroughly verified and certified by medical boards.' },
                            { icon: <FiClock size={28} />, title: 'Quick Booking', desc: 'Book your appointment in under 2 minutes, anytime anywhere.' },
                            { icon: <FiPhone size={28} />, title: '24/7 Support', desc: 'Our support team is available around the clock to assist you.' },
                            { icon: <FiAward size={28} />, title: 'Best Experience', desc: 'Rated 4.9/5 by over 10,000 patients for exceptional service.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-green-50 rounded-2xl p-8 text-center hover:shadow-lg transition group">
                                <div className="w-16 h-16 bg-green-100 group-hover:bg-green-600 text-green-600 group-hover:text-white rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 2: How It Works */}
            <section className="py-20 bg-green-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">Simple Steps</span>
                        <h2 className="text-4xl font-extrabold mt-2">How It Works</h2>
                        <p className="text-green-200 mt-3 max-w-xl mx-auto">
                            Get your appointment booked in just 3 easy steps.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {[
                            { step: '01', title: 'Find a Doctor', desc: 'Browse through our list of verified specialists and find the right doctor for your needs.' },
                            { step: '02', title: 'Book Appointment', desc: 'Select your preferred date and time slot that works best for your schedule.' },
                            { step: '03', title: 'Get Consultation', desc: 'Visit the doctor at the scheduled time and get the care you deserve.' },
                        ].map((item, i) => (
                            <div key={i} className="relative bg-green-800/50 border border-green-700 rounded-2xl p-8 text-center">
                                <span className="text-6xl font-black text-green-700 absolute top-4 right-6 select-none">
                                    {item.step}
                                </span>
                                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-black">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-green-200 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ExtraSections