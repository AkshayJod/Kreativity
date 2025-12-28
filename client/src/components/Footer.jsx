import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 font-sans transition-colors duration-300" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: About */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-3 group relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1, rotate: [0, -3, 3, -3, 0] }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
                                {/* Glow effect */}
                                <motion.div
                                    className="absolute inset-0 bg-primary/15 rounded-full blur-lg"
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                        scale: [1, 1.15, 1],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                                <motion.img
                                    src={logo}
                                    alt="Kreativity League"
                                    className="h-12 w-auto object-contain relative z-10 drop-shadow-md"
                                    animate={{
                                        filter: [
                                            "drop-shadow(0 0 0px rgba(220,38,38,0))",
                                            "drop-shadow(0 0 8px rgba(220,38,38,0.4))",
                                            "drop-shadow(0 0 0px rgba(220,38,38,0))",
                                        ],
                                    }}
                                    transition={{
                                        duration: 3.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.div>
                        </Link>
                        <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed">
                            Empowering the next generation of innovators through world-class STEM competitions, robotics challenges, and entrepreneurship programs.
                        </p>
                        <div className="flex space-x-5 pt-2">
                            <a href="#" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"><Facebook className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"><Instagram className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Column 2: Competitions */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-6 font-heading uppercase tracking-wide">Competitions</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/competitions" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">All Competitions</Link></li>
                            <li><Link to="/competitions" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Robotics League</Link></li>
                            <li><Link to="/competitions" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Coding Challenges</Link></li>
                            <li><Link to="/competitions" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Innovation Fair</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-6 font-heading uppercase tracking-wide">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/products" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Shop Resources</Link></li>
                            <li><Link to="/dashboard" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">User Dashboard</Link></li>
                            <li><Link to="/register" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Register for Event</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Contact */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-200 mb-6 font-heading uppercase tracking-wide">Stay Updated</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-500 mb-4">Subscribe to our newsletter for latest updates.</p>
                        <form className="flex mb-8" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-white/10 rounded-l-sm focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white focus:bg-white dark:focus:bg-dark-700 w-full text-sm py-2.5 px-4 transition-all"
                            />
                            <button type="submit" className="bg-primary hover:bg-red-700 text-white rounded-r-sm px-4 py-2.5 transition-all shadow-lg hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start text-gray-600 dark:text-gray-500">
                                <MapPin className="h-4 w-4 mr-3 mt-0.5 text-black dark:text-white flex-shrink-0" />
                                <span>123 Innovation Dr, Tech City</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-500">
                                <Mail className="h-4 w-4 mr-3 text-black dark:text-white flex-shrink-0" />
                                <span>contact@kreativity.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-gray-200 dark:border-white/10 pt-8 text-center text-sm flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                        <p className="text-gray-600 dark:text-gray-500">&copy; {new Date().getFullYear()} Kreativity League. All rights reserved.</p>
                        <span className="hidden md:block h-4 w-px bg-gray-300 dark:bg-white/10"></span>
                        <p className="text-gray-600 dark:text-gray-500 font-medium">Powered by <span className="text-black dark:text-white font-bold">ABL Education</span></p>
                    </div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-600 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
