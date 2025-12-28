import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight, Zap, Trophy } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import placeholderImage from '../assets/competition-placeholder.png';

// Function to get clear, high-quality default images based on category
const getDefaultImage = (category, competitionName) => {
    const categoryLower = category?.toLowerCase() || '';
    const nameLower = competitionName?.toLowerCase() || '';
    
    // High-quality, clear Unsplash images for different categories (q=100 for maximum quality)
    const imageMap = {
        'coding': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        'codequest': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        'robotics': 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        'roboquest': 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        'stem': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        'stempreneur': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        'astropreneur': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        'innovation': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100',
        'default': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=100'
    };
    
    // Check category first
    if (categoryLower.includes('code') || categoryLower.includes('coding')) {
        return imageMap.coding;
    } else if (categoryLower.includes('robot') || categoryLower.includes('robo')) {
        return imageMap.robotics;
    } else if (categoryLower.includes('stem') || categoryLower.includes('entrepreneur')) {
        return imageMap.stem;
    } else if (categoryLower.includes('astro') || categoryLower.includes('space')) {
        return imageMap.astropreneur;
    } else if (categoryLower.includes('innovation') || categoryLower.includes('challenge')) {
        return imageMap.innovation;
    }
    
    // Check name as fallback
    if (nameLower.includes('code')) {
        return imageMap.coding;
    } else if (nameLower.includes('robot') || nameLower.includes('robo')) {
        return imageMap.robotics;
    } else if (nameLower.includes('stem') || nameLower.includes('entrepreneur')) {
        return imageMap.stem;
    } else if (nameLower.includes('astro') || nameLower.includes('space')) {
        return imageMap.astropreneur;
    }
    
    return imageMap.default;
};

const CompetitionCard = ({ competition }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group flex flex-col rounded-lg overflow-hidden bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-white/20 hover:border-primary dark:hover:border-primary transition-all duration-500 relative shadow-xl hover:shadow-[0_20px_60px_rgba(220,38,38,0.3)] dark:hover:shadow-[0_20px_60px_rgba(220,38,38,0.5)] backdrop-blur-sm"
        >
            {/* Vibrant Animated Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 dark:from-primary/30 via-primary/10 dark:via-primary/20 to-primary/15 dark:to-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
            <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 pointer-events-none"
            />
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            />

            {/* Hexagonal Tech Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="hexPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M20 0 L35 10 L35 30 L20 40 L5 30 L5 10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#hexPattern)" />
                </svg>
            </div>

            <div
                style={{ transform: "translateZ(50px)" }}
                className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900"
            >
                <motion.img
                    className="w-full h-full object-cover brightness-105 contrast-110 saturate-110 group-hover:brightness-110 group-hover:contrast-115 group-hover:saturate-115 transition-all duration-500"
                    src={competition.image || getDefaultImage(competition.category, competition.name)}
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = getDefaultImage(competition.category, competition.name);
                    }}
                    alt={competition.name}
                    loading="eager"
                    fetchPriority="high"
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {/* Dynamic Gradient Overlay - Reduced for better image visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-white/60 dark:via-black/60 to-transparent" />
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 dark:from-primary/30 via-transparent to-primary/15 dark:to-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                {/* Subtle vignette effect */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10 dark:to-black/20 pointer-events-none" />
                
                {/* Vibrant Category Badge with Strong Glow */}
                <motion.div
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-primary via-red-600 to-red-700 backdrop-blur-md px-6 py-2.5 rounded-md text-xs font-bold text-white shadow-[0_0_30px_rgba(220,38,38,1)] uppercase tracking-wider border-2 border-white/40 z-20"
                >
                    <div className="flex items-center gap-2">
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        >
                            <Zap className="w-4 h-4 drop-shadow-lg" />
                        </motion.div>
                        {competition.category}
                    </div>
                </motion.div>

                {/* Enhanced Corner Accent Lines */}
                <motion.div 
                    className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/30 dark:border-primary/50 group-hover:border-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                />
                <motion.div 
                    className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/30 dark:border-primary/50 group-hover:border-primary transition-colors"
                    whileHover={{ scale: 1.1 }}
                />
            </div>

            <div
                style={{ transform: "translateZ(30px)" }}
                className="flex-1 p-6 flex flex-col justify-between relative z-10"
            >
                <div>
                    <motion.h3
                        whileHover={{ x: 4 }}
                        className="text-xl font-heading font-bold text-gray-900 dark:text-white group-hover:text-primary transition-all duration-300 uppercase tracking-tight mb-3 relative"
                    >
                        <span className="relative z-10">{competition.name}</span>
                        <motion.span
                            className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"
                        />
                    </motion.h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed font-sans group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
                        {competition.description}
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    {/* Stats with Icons */}
                    <div className="flex items-center justify-between text-sm">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-sm border border-gray-300 dark:border-white/10 group-hover:border-black dark:group-hover:border-primary/30 group-hover:bg-gray-200 dark:group-hover:bg-primary/10 transition-all"
                        >
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium font-sans">
                                {new Date(competition.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-white/5 rounded-sm border border-gray-300 dark:border-white/10 group-hover:border-black dark:group-hover:border-primary/30 group-hover:bg-gray-200 dark:group-hover:bg-primary/10 transition-all"
                        >
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-gray-700 dark:text-gray-300 font-bold font-heading">
                                {competition.registrationCount || 0}
                            </span>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-white/10 group-hover:border-black dark:group-hover:border-primary/30 transition-colors">
                        <Link
                            to={`/competitions/${competition._id}`}
                            className="group/btn flex items-center justify-center px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 hover:border-black dark:hover:border-primary/50 rounded-sm transition-all relative overflow-hidden"
                        >
                            <span className="relative z-10">Details</span>
                            <motion.div
                                className="absolute inset-0 bg-gray-200 dark:bg-primary/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                        <Link
                            to={`/competitions/${competition._id}/register`}
                            className="group/btn flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-primary to-red-700 hover:from-red-700 hover:to-primary rounded-sm shadow-lg hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] transition-all relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-1.5">
                                Register
                                <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Vibrant Bottom Glow Line */}
            <motion.div
                className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-primary via-red-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_25px_rgba(220,38,38,0.8)]"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
        </motion.div>
    );
};

export default CompetitionCard;
