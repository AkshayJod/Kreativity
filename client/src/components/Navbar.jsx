import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Menu as MenuIcon, X, ShoppingCart, User, LogOut, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    // Navbar style logic
    const navClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${isHome && !isScrolled
        ? 'bg-transparent text-white'
        : 'bg-white/90 dark:bg-black/95 backdrop-blur-md text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 shadow-sm'
        }`;

    // Mobile menu styling
    const mobileLinkClasses = "block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors";

    const scrollToFooter = (e) => {
        e.preventDefault();
        const footer = document.getElementById('contact');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
        if (location.pathname !== '/') {
            navigate('/#contact')
        }
    }

    return (
        <nav className={navClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center group relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
                                {/* Glow effect */}
                                <motion.div
                                    className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                                <motion.img
                                    src={logo}
                                    alt="Kreativity League"
                                    className="h-16 w-auto object-contain relative z-10 drop-shadow-lg"
                                    animate={{
                                        filter: [
                                            "drop-shadow(0 0 0px rgba(220,38,38,0))",
                                            "drop-shadow(0 0 10px rgba(220,38,38,0.5))",
                                            "drop-shadow(0 0 0px rgba(220,38,38,0))",
                                        ],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-8">
                        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium text-sm tracking-wide uppercase">Home</Link>
                        <Link to="/competitions" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium text-sm tracking-wide uppercase">Competitions</Link>
                        <Link to="/teams" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium text-sm tracking-wide uppercase">Teams</Link>
                        <Link to="/partners" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium text-sm tracking-wide uppercase">Partners</Link>
                        <Link to="/products" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium text-sm tracking-wide uppercase">Shop</Link>
                        <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium text-sm tracking-wide uppercase">About</Link>
                        <a href="#contact" onClick={scrollToFooter} className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors font-medium text-sm tracking-wide uppercase cursor-pointer">Contact</a>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-white"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-white">
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-primary rounded-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative hidden sm:block">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center space-x-1 focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                </button>
                                {/* Dropdown Menu */}
                                {isProfileOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40 cursor-default"
                                            onClick={() => setIsProfileOpen(false)}
                                        ></div>
                                        <div className="absolute right-0 w-64 mt-4 origin-top-right bg-white dark:bg-black/95 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-sm shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.8)] ring-1 ring-gray-200 dark:ring-white/5 focus:outline-none z-50 animate-fade-in-up overflow-hidden">
                                            {/* Decorative top line */}
                                            <div className="h-0.5 w-full bg-black dark:bg-white"></div>

                                            <div className="px-5 py-4 border-b border-gray-200 dark:border-white/5 bg-gray-50 dark:bg-white/5">
                                                <Link
                                                    to="/dashboard"
                                                    className="block group"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Active Session</p>
                                                    <p className="text-base text-gray-900 dark:text-white font-bold truncate group-hover:text-primary transition-colors">{user.name}</p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate font-mono opacity-70">{user.email}</p>
                                                </Link>
                                            </div>
                                            <div className="py-2">
                                                {user.role === 'admin' && (
                                                    <Link to="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center px-5 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-black dark:hover:border-white group">
                                                        <span className="mr-3 text-lg group-hover:scale-110 transition-transform">🛡️</span>
                                                        <span className="uppercase tracking-wide font-medium text-xs">Admin Console</span>
                                                    </Link>
                                                )}
                                                <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center px-5 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-black dark:hover:border-white group">
                                                    <User className="w-4 h-4 mr-3 group-hover:text-primary transition-colors" />
                                                    <span className="uppercase tracking-wide font-medium text-xs">Access Dashboard</span>
                                                </Link>

                                                <div className="my-1 border-t border-gray-200 dark:border-white/5 mx-2"></div>

                                                <button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setIsProfileOpen(false);
                                                    }}
                                                    className="w-full text-left flex items-center px-5 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border-l-2 border-transparent hover:border-black dark:hover:border-white group"
                                                >
                                                    <LogOut className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                                                    <span className="uppercase tracking-wide font-bold text-xs">Terminate Session</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="hidden sm:flex space-x-4">
                                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white font-medium transition-colors text-sm uppercase tracking-wide flex items-center">Login</Link>
                                <Link to="/register" className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-sm font-bold uppercase text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]">
                                    Join Now
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="lg:hidden bg-white dark:bg-black shadow-xl absolute top-full left-0 w-full border-t border-gray-200 dark:border-white/10 animate-fade-in-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>Home</Link>
                        <Link to="/competitions" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>Competitions</Link>
                        <Link to="/partners" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>Partners</Link>
                        <Link to="/products" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>Shop</Link>
                        <Link to="/about" onClick={() => setIsOpen(false)} className={mobileLinkClasses}>About</Link>
                        <a href="#contact" onClick={(e) => { scrollToFooter(e); setIsOpen(false); }} className={mobileLinkClasses}>Contact</a>
                    </div>
                    <div className="pt-4 pb-4 border-t border-gray-200 dark:border-white/10">
                        {user ? (
                            <div className="px-4 space-y-3">
                                <div className="flex items-center">
                                    <Link to="/dashboard" className="flex items-center w-full">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-900 dark:text-gray-200">{user.name}</div>
                                            <div className="text-sm font-medium text-gray-600 dark:text-gray-500">{user.email}</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="mt-3 space-y-1">
                                    {user.role === 'admin' && (
                                        <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Admin Panel</Link>
                                    )}
                                    <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">My Profile</Link>
                                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">Logout</button>
                                </div>
                            </div>
                        ) : (
                            <div className="px-4 pb-2 flex flex-col space-y-2">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block text-center w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-white/20 rounded-md py-2 text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="block text-center w-full bg-primary text-white border border-transparent rounded-md py-2 text-base font-medium hover:bg-red-700 transition-colors">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
