import { Link } from 'react-router-dom'
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
    return (
        <footer className="bg-green-900 text-white pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Brand */}
                <div>
                    <Link to="/" className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🩺</span>
                        <span className="text-xl font-bold">Doc<span className="text-green-400">Appoint</span></span>
                    </Link>
                    <p className="text-green-300 text-sm leading-relaxed">
                        Your trusted platform for booking doctor appointments quickly and easily. Quality healthcare at your fingertips.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-green-400 font-semibold mb-4 text-sm uppercase tracking-widest">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-green-200">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/appointments" className="hover:text-white transition">All Appointments</Link></li>
                        <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                        <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-green-400 font-semibold mb-4 text-sm uppercase tracking-widest">Follow Us</h3>
                    <div className="flex gap-4">
                        <a href="#" className="bg-green-700 hover:bg-green-500 p-3 rounded-full transition">
                            <FaFacebookF size={14} />
                        </a>
                        <a href="#" className="bg-green-700 hover:bg-green-500 p-3 rounded-full transition">
                            <FaXTwitter size={14} />
                        </a>
                        <a href="#" className="bg-green-700 hover:bg-green-500 p-3 rounded-full transition">
                            <FaLinkedinIn size={14} />
                        </a>
                        <a href="#" className="bg-green-700 hover:bg-green-500 p-3 rounded-full transition">
                            <FaGithub size={14} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-green-700 mt-10 pt-5 text-center text-green-400 text-xs">
                © {new Date().getFullYear()} DocAppoint. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer