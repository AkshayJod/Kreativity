import { motion } from 'framer-motion';

const stats = [
    { id: 1, name: 'Participants', value: '5000+' },
    { id: 2, name: 'Schools', value: '200+' },
    { id: 3, name: 'Winners', value: '50+' },
];

const Stats = () => {
    return (
        <div className="bg-black dark:bg-black relative overflow-hidden transition-colors duration-300">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 dark:opacity-5 mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-heading font-bold text-white sm:text-4xl uppercase tracking-widest leading-normal"
                    >
                        Trusted by <span className="text-primary">Battlers</span> Worldwide
                    </motion.h2>
                </div>
                <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -5 }}
                            className="flex flex-col mt-10 sm:mt-0 p-8 bg-white dark:bg-gray-900 rounded-sm border border-white/20 dark:border-white/10 backdrop-blur-sm group hover:border-primary/50 transition-all"
                        >
                            <dt className="order-2 mt-2 text-sm leading-6 font-bold text-gray-600 dark:text-gray-500 uppercase tracking-widest group-hover:text-primary transition-colors">
                                {stat.name}
                            </dt>
                            <dd className="order-1 text-5xl font-heading font-bold text-black dark:text-white group-hover:text-primary transition-all">
                                {stat.value}
                            </dd>
                        </motion.div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default Stats;
