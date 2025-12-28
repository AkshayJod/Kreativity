import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }

        timerComponents.push(
            <motion.div
                key={interval}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center mx-3 mb-4 sm:mb-0"
            >
                <div className="relative bg-white dark:bg-gray-900 backdrop-blur-md rounded-sm p-4 sm:p-6 shadow-xl border border-white/20 dark:border-white/10 min-w-[90px] sm:min-w-[110px] text-center group hover:bg-gray-100 dark:hover:bg-white/5 hover:border-primary/50 transition-all duration-300">
                    <span className="text-4xl sm:text-6xl font-bold font-heading text-black dark:text-white tracking-tighter drop-shadow-md group-hover:text-primary transition-colors">
                        {timeLeft[interval]}
                    </span>
                    <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400 mt-2 uppercase tracking-[0.2em] font-sans">
                        {interval}
                    </div>
                    {/* Decorative glow */}
                    <div className="absolute inset-0 rounded-sm bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                </div>
            </motion.div>
        );
    });

    return (
        <section className="relative py-20 overflow-hidden bg-black dark:bg-black transition-colors duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black to-black"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 font-heading">Don't Miss Out</h2>
                    <p className="text-4xl md:text-5xl font-heading font-bold text-white mb-12 tracking-tight uppercase">
                        Next Major Event <span className="text-primary">Begins In</span>
                    </p>
                </motion.div>

                <div className="flex justify-center flex-wrap items-center">
                    {timerComponents.length ? timerComponents : <span className="text-4xl font-bold text-primary animate-pulse font-heading">Event Started!</span>}
                </div>
            </div>
        </section>
    );
};

export default Countdown;
