import { motion } from 'framer-motion';


const About = () => {
    return (
        <div className="relative min-h-screen bg-dark-900 py-20 px-4 overflow-hidden sm:px-6 lg:px-8">


            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-heading font-bold tracking-wider text-white sm:text-5xl uppercase"
                    >
                        About Kreativity <span className="text-primary">League</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto font-sans"
                    >
                        We are dedicated to fostering the next generation of innovators, thinkers, and makers through engaging STEM competitions.
                    </motion.p>
                </div>

                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-dark-800/80 backdrop-blur-sm p-8 rounded-sm border border-white/10 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] group"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 font-heading uppercase tracking-wide group-hover:text-primary transition-colors">Our Mission</h3>
                            <p className="text-lg text-gray-400 border-l-2 border-primary pl-6 font-sans leading-relaxed">
                                To provide a platform for students from all backgrounds to explore their potential in Science, Technology, Engineering, and Mathematics.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-dark-800/80 backdrop-blur-sm p-8 rounded-sm border border-white/10 hover:border-primary/50 transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] group"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4 font-heading uppercase tracking-wide group-hover:text-primary transition-colors">Our Vision</h3>
                            <p className="text-lg text-gray-400 border-l-2 border-primary pl-6 font-sans leading-relaxed">
                                A world where every child has the opportunity to become a STEM leader and solve global challenges.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
