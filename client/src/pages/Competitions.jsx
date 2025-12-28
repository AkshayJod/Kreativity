import { useState, useEffect } from 'react';
import api from '../utils/api';
import CompetitionCard from '../components/CompetitionCard';
import { mockCompetitions } from '../data/mockCompetitions';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, SlidersHorizontal, Trophy } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const Competitions = () => {
    const [competitions, setCompetitions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const { data } = await api.get('/competitions');
                if (data && data.length > 0) {
                    setCompetitions(data);
                } else {
                    setCompetitions(mockCompetitions);
                }
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch competitions", error);
                setCompetitions(mockCompetitions);
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);

    const categories = ['All', 'Coding', 'Robotics', 'Innovation', 'Space Tech', 'Sustainability'];

    const filteredCompetitions = competitions.filter(comp => {
        const matchesCategory = filter === 'All' || comp.category === filter;
        const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comp.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-gray-50 dark:bg-black min-h-screen pt-20 pb-20 relative overflow-hidden transition-colors duration-300">
            {/* Animated Background Effects */}
            <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <Breadcrumbs />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Enhanced Header Section */}
                <div className="relative py-16 mb-16 overflow-hidden rounded-sm border border-white/20 bg-black">
                    {/* Animated Glow */}
                    <motion.div
                        className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-30"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    
                    {/* Tech Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="relative z-10 px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/20 rounded-sm mb-6"
                        >
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Trophy className="w-5 h-5 text-white" />
                            </motion.div>
                            <span className="text-white font-bold tracking-widest uppercase text-sm font-heading">Battle Arena</span>
                        </motion.div>
                        
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-heading font-bold text-white uppercase tracking-tighter mb-6"
                        >
                            Our{' '}
                            <span className="text-white">
                                Competitions
                            </span>
                        </motion.h1>
                        
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-4 max-w-3xl text-lg md:text-xl text-gray-300 font-sans leading-relaxed"
                        >
                            Discover world-class challenges designed to push your limits. Filter by category, search for specific events, and{' '}
                            <span className="text-white font-bold">join the elite league of innovators.</span>
                        </motion.p>

                        {/* Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/20"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                <span className="text-sm text-gray-300 font-sans">
                                    <span className="text-white font-bold">{competitions.length}</span> Active Competitions
                                </span>
                            </div>
                            <div className="w-px h-6 bg-white/20" />
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                <span className="text-sm text-gray-300 font-sans">
                                    <span className="text-white font-bold">{competitions.reduce((sum, c) => sum + (c.registrationCount || 0), 0)}</span> Total Participants
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Enhanced Filters and Search Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 p-6 bg-gradient-to-br from-white dark:from-gray-900 to-gray-50 dark:to-black border border-gray-300 dark:border-white/10 rounded-sm relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(45deg, rgba(220,38,38,0.1) 25%, transparent 25%),
                                            linear-gradient(-45deg, rgba(220,38,38,0.1) 25%, transparent 25%),
                                            linear-gradient(45deg, transparent 75%, rgba(220,38,38,0.1) 75%),
                                            linear-gradient(-45deg, transparent 75%, rgba(220,38,38,0.1) 75%)`,
                            backgroundSize: '20px 20px'
                        }} />
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        <div className="flex items-center text-gray-700 dark:text-gray-400 mr-2">
                            <Filter className="w-4 h-4 mr-2 text-primary" />
                            <span className="text-xs uppercase font-bold tracking-wider font-heading">Filter:</span>
                        </div>
                        {categories.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all font-heading ${
                                    filter === cat
                                        ? 'bg-gradient-to-r from-primary to-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-primary/50'
                                        : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white border border-gray-300 dark:border-white/10 hover:border-primary/50 hover:bg-gray-200 dark:hover:bg-white/5'
                                }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96 z-10">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <input
                            type="text"
                            placeholder="SEARCH COMPETITIONS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all uppercase font-heading tracking-wider"
                        />
                        {searchQuery && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                            >
                                ×
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Enhanced Grid Results */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        <motion.div
                            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.p
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-gray-400 font-heading tracking-widest uppercase text-sm"
                        >
                            Initializing Battlefield...
                        </motion.p>
                    </div>
                ) : (
                    <>
                        {/* Results Count */}
                        {filteredCompetitions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
                                    <span className="text-gray-600 dark:text-gray-400 font-sans">
                                        Showing <span className="text-black dark:text-white font-bold">{filteredCompetitions.length}</span> of{' '}
                                        <span className="text-black dark:text-white font-bold">{competitions.length}</span> competitions
                                    </span>
                                </div>
                            </motion.div>
                        )}

                        <motion.div
                            layout
                            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                        >
                            <AnimatePresence mode='popLayout'>
                                {filteredCompetitions.length > 0 ? (
                                    filteredCompetitions.map((comp, index) => (
                                        <motion.div
                                            key={comp._id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                            transition={{ 
                                                duration: 0.4,
                                                delay: index * 0.05,
                                                type: "spring",
                                                stiffness: 100
                                            }}
                                        >
                                            <CompetitionCard competition={comp} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="col-span-full py-32 text-center bg-gradient-to-br from-dark-800 to-dark-900 border border-dashed border-white/10 rounded-sm relative overflow-hidden"
                                    >
                                        {/* Background Effect */}
                                        <div className="absolute inset-0 bg-primary/5 opacity-50" />
                                        
                                        <div className="relative z-10">
                                            <motion.div
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6 border border-primary/20"
                                            >
                                                <Search className="w-10 h-10 text-gray-600" />
                                            </motion.div>
                                            <h3 className="text-2xl font-heading font-bold text-white uppercase mb-3">
                                                No Competitions Found
                                            </h3>
                                            <p className="text-gray-400 font-sans mb-6 max-w-md mx-auto">
                                                Try adjusting your filters or search query to find what you're looking for.
                                            </p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => { setFilter('All'); setSearchQuery(''); }}
                                                className="px-6 py-3 bg-gradient-to-r from-primary to-red-700 text-white font-bold uppercase tracking-widest text-sm rounded-sm shadow-lg hover:shadow-[0_0_25px_rgba(220,38,38,0.5)] transition-all"
                                            >
                                                Clear All Filters
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Competitions;
