import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target } from 'lucide-react';
import { SplineScene } from './ui/splite';


const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-black pt-20 pb-20 transition-colors duration-300">
            {/* 3D CyberGrid Background */}


            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent dark:from-black dark:via-black/40 dark:to-transparent pointer-events-none z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50 dark:from-black dark:via-transparent dark:to-black/50 pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6"
                        >
                            <div className="inline-flex items-center px-3 py-1 rounded-sm border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/10 backdrop-blur-md">
                                <Zap className="w-4 h-4 text-black dark:text-white mr-2" />
                                <span className="text-xs font-bold text-black dark:text-white tracking-widest uppercase font-heading">The Future of Combat Robotics</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase font-sans border-l border-gray-300 dark:border-gray-600 pl-4 py-1">
                                Powered by <span className="text-gray-900 dark:text-white">ABL Education</span>
                            </span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter leading-none mb-6 text-gray-900 dark:text-white">
                            IGNITE YOUR <br />
                            <span className="text-gray-900 dark:text-white">PASSION</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg font-sans leading-relaxed border-l-2 border-black dark:border-white pl-6">
                            Join the elite league. Design, build, and battle in world-class robotics and innovation challenges.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/register"
                                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-sm bg-primary px-10 font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-red-700 hover:skew-x-[-10deg] shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                            >
                                <span className="mr-2 group-hover:skew-x-[10deg] transition-transform">Start Battling</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:skew-x-[10deg] transition-transform" />
                            </Link>
                            <Link
                                to="/competitions"
                                className="inline-flex h-14 items-center justify-center rounded-sm border border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 px-10 font-bold uppercase tracking-wider text-gray-900 dark:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-primary/50 backdrop-blur-sm"
                            >
                                <Target className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
                                Tournaments
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center space-x-8 text-gray-500 dark:text-gray-400 font-heading text-sm tracking-widest">
                            <div className="flex items-center"><span className="text-gray-900 dark:text-white text-xl font-bold mr-2">50+</span> COUNTRIES</div>
                            <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
                            <div className="flex items-center"><span className="text-gray-900 dark:text-white text-xl font-bold mr-2">$50K</span> PRIZES</div>
                        </div>
                    </motion.div>

                    {/* Right 3D Spline Scene */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block h-[600px] w-full"
                    >
                        <div className="relative w-full h-full overflow-visible">
                            <SplineScene 
                                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                                className="w-full h-full"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-black to-transparent z-20 pointer-events-none"></div>
        </div>
    );
};

export default Hero;
