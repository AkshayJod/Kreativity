import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import CompetitionCard from '../components/CompetitionCard';
import Stats from '../components/Stats';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { mockCompetitions } from '../data/mockCompetitions';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const { data } = await api.get('/competitions');
                if (data && data.length > 0) {
                    setCompetitions(data);
                } else {
                    setCompetitions(mockCompetitions);
                }
            } catch (error) {
                console.error("Failed to fetch competitions", error);
                setCompetitions(mockCompetitions);
            }
        };

        fetchCompetitions();
    }, []);

    return (
        <div className="bg-white dark:bg-black min-h-screen transition-colors duration-300">
            <Hero />

            {/* Countdown Section */}
            <div className="relative z-20 mx-4 mt-12">
                <div className="max-w-5xl mx-auto shadow-lg rounded-sm overflow-hidden border border-white/20">
                    <Countdown targetDate="2026-01-15T00:00:00" />
                </div>
            </div>

            {/* Featured Competitions */}
            <div className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-black dark:to-gray-950 transition-colors duration-300">
                {/* Vibrant Animated Background Glows */}
                <motion.div
                    className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/25 dark:bg-primary/30 rounded-full blur-[180px] pointer-events-none"
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 0.9, 0.6],
                        x: [-100, 100, -100],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/20 dark:bg-primary/25 rounded-full blur-[180px] pointer-events-none"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.8, 0.5],
                        x: [100, -100, 100],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-primary/15 dark:bg-primary/20 rounded-full blur-[150px] pointer-events-none"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Enhanced Tech Grid Background */}
                <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.12] pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(220,38,38,0.3) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(220,38,38,0.3) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }} />
                </div>
                
                {/* Vibrant Animated Lines */}
                <motion.div 
                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Enhanced Header */}
                    <div className="text-center mb-20 relative">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 border border-primary/30 dark:border-primary/40 rounded-sm mb-8 backdrop-blur-sm shadow-lg"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </motion.div>
                            <span className="text-primary font-bold tracking-widest uppercase text-xs font-heading">
                                Elite Challenges
                            </span>
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold uppercase tracking-tighter mb-6 relative"
                        >
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">Featured</span>
                                <motion.span
                                    className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-primary via-red-600 to-primary shadow-[0_0_20px_rgba(220,38,38,0.6)]"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                />
                            </span>{' '}
                            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">Competitions</span>
                        </motion.h2>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mt-6 max-w-3xl text-lg md:text-xl text-gray-600 dark:text-gray-400 mx-auto font-sans leading-relaxed"
                        >
                            Explore our diverse range of challenges designed to test your skills and creativity. 
                            <span className="text-primary font-bold"> Join the elite league of innovators.</span>
                        </motion.p>

                        {/* Enhanced Decorative Elements */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="flex items-center justify-center gap-4 mt-10"
                        >
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
                        </motion.div>
                    </div>

                    {/* Enhanced Grid with Stagger Animation */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {competitions.slice(0, 6).map((comp, index) => (
                            <motion.div
                                key={comp._id}
                                initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: -15 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ 
                                    duration: 0.7, 
                                    delay: index * 0.12,
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 15
                                }}
                                whileHover={{ y: -12, scale: 1.03 }}
                            >
                                <CompetitionCard competition={comp} />
                            </motion.div>
                        ))}
                    </div>

                    {/* Enhanced View All Link */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="text-center mt-20"
                    >
                        <Link
                            to="/competitions"
                            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 border-2 border-primary/40 dark:border-primary/50 hover:border-primary rounded-sm text-gray-900 dark:text-white font-bold uppercase tracking-widest text-sm transition-all hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] relative overflow-hidden backdrop-blur-sm"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View All Competitions
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.4 }}
                            />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Statistics Section */}
            <Stats />
        </div>
    );
};

export default Home;
