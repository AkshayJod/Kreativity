import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { School, Globe, UserCheck, Users, Linkedin, Mail, ExternalLink, Award } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

const Partners = () => {
    const [activeTab, setActiveTab] = useState('schools');

    const tabs = [
        { id: 'schools', label: 'Participating Schools', icon: School },
        { id: 'zonal', label: 'Zonal Partners', icon: Globe },
        { id: 'advisors', label: 'Board of Advisors', icon: UserCheck },
        { id: 'mentors', label: 'Mentors & Judges', icon: Users },
    ];

    const advisors = [
        {
            name: "Dr. B Singh",
            role: "Educationist & Advisor",
            image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", // Placeholder
            bio: "A well-known name in the Education field having held various important positions. Recipient of CBSE Best Teacher National Award 2000 and Dr S Radha Krishnan Memorial Award 2003. Contributed to National Policy of Education 1986 and National Curriculum Framework 2000.",
            designation: "Former Principal DPS & Disney Education Director"
        },
        {
            name: "Dr. Kavita (Lohiya) Bajpai",
            role: "Director & Co-Founder",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", // Placeholder
            bio: "Progressive leader and passionate educationist with over 20 years of experience. Director of The International School of Thrissur and SPROUTZ. Deeply involved in heritage conservation and community initiatives.",
            designation: "Director, International School of Thrissur"
        }
    ];

    const schools = [
        { name: "Delhi Public School", location: "R.K. Puram", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80" },
        { name: "The Heritage School", location: "Gurgaon", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&q=80" },
        { name: "Ryan International", location: "Mumbai", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&q=80" },
        { name: "Lotus Valley", location: "Noida", image: "https://images.unsplash.com/photo-1592280771800-bcf291d0336e?w=500&q=80" },
        { name: "Amity International", location: "Delhi", image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=500&q=80" },
        { name: "Sanskriti School", location: "Pune", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80" },
    ];

    const zonalPartners = [
        { region: "North Zone", partner: "TechEd India", contact: "north@kreativityleague.com" },
        { region: "South Zone", partner: "Future Minds", contact: "south@kreativityleague.com" },
        { region: "East Zone", partner: "Innovate East", contact: "east@kreativityleague.com" },
        { region: "West Zone", partner: "STEM West", contact: "west@kreativityleague.com" },
        { region: "Central Zone", partner: "Core Education", contact: "central@kreativityleague.com" },
    ];

    return (
        <div className="bg-dark-900 min-h-screen pt-20 pb-20">
            <Breadcrumbs />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-heading font-bold text-white uppercase tracking-tighter"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">Ecosystem</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-gray-400 max-w-2xl mx-auto font-sans text-lg"
                    >
                        Collaborating with visionaries, institutions, and industry leaders to reshape the future of education.
                    </motion.p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                                : 'bg-dark-800 text-gray-400 hover:text-white border border-white/10 hover:border-primary/30'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Schools Tab */}
                        {activeTab === 'schools' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {schools.map((school, index) => (
                                    <div key={index} className="group relative overflow-hidden rounded-sm bg-dark-800 border border-white/10 hover:border-primary/50 transition-all duration-500">
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={school.image}
                                                alt={school.name}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-90"></div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 p-6 w-full">
                                            <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-primary transition-colors">{school.name}</h3>
                                            <p className="text-sm text-gray-400 font-sans flex items-center">
                                                <Globe className="w-3 h-3 mr-2" /> {school.location}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Zonal Partners Tab */}
                        {activeTab === 'zonal' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {zonalPartners.map((zone, index) => (
                                    <div key={index} className="p-8 bg-dark-800 border border-white/10 rounded-sm hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-[50px] -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>
                                        <h3 className="text-2xl font-heading font-bold text-white mb-2">{zone.region}</h3>
                                        <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{zone.partner}</p>
                                        <a href={`mailto:${zone.contact}`} className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm">
                                            <Mail className="w-4 h-4 mr-2" /> {zone.contact}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Advisors Tab */}
                        {activeTab === 'advisors' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                {advisors.map((advisor, index) => (
                                    <div key={index} className="flex flex-col md:flex-row bg-dark-800 border border-white/10 rounded-sm overflow-hidden hover:border-primary/30 transition-colors">
                                        <div className="md:w-1/3 relative">
                                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
                                            <img src={advisor.image} alt={advisor.name} className="w-full h-full object-cover min-h-[300px]" />
                                        </div>
                                        <div className="md:w-2/3 p-8 flex flex-col justify-center">
                                            <h3 className="text-2xl font-heading font-bold text-white mb-1">{advisor.name}</h3>
                                            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">{advisor.designation}</p>
                                            <p className="text-gray-400 font-sans leading-relaxed text-sm mb-6 border-l-2 border-white/10 pl-4">{advisor.bio}</p>
                                            <div className="flex items-center space-x-4">
                                                <button className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white text-gray-400 transition-colors">
                                                    <Linkedin className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-white text-gray-400 transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Mentors Tab */}
                        {activeTab === 'mentors' && (
                            <div className="text-center py-16 bg-dark-800 border border-white/5 rounded-sm">
                                <Users className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
                                <h2 className="text-3xl font-heading font-bold text-white uppercase tracking-wide mb-4">Join Our Mentor Network</h2>
                                <p className="text-gray-400 max-w-2xl mx-auto mb-8 font-sans">
                                    Are you an industry expert, academician, or tech enthusiast? Help shape the next generation of innovators by becoming a mentor or judge at Kreativity League.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <button className="px-8 py-3 bg-primary hover:bg-orange-600 text-white font-bold uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
                                        Apply as Mentor
                                    </button>
                                    <button className="px-8 py-3 border border-white/10 hover:border-primary text-white font-bold uppercase tracking-widest rounded-sm transition-all hover:bg-white/5">
                                        View Guidelines
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Partners;
