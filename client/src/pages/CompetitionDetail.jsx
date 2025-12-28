import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import {
    Calendar, Users, Trophy, CheckCircle, Clock, ArrowRight,
    Share2, Info, FileText, HelpCircle, ChevronDown, ChevronUp,
    ShieldCheck, GraduationCap, IndianRupee
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockCompetitions } from '../data/mockCompetitions';
import Breadcrumbs from '../components/Breadcrumbs';
import placeholderImage from '../assets/competition-placeholder.png';

const CompetitionDetail = () => {
    const { id } = useParams();
    const [competition, setCompetition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openAccordion, setOpenAccordion] = useState(null);

    useEffect(() => {
        const fetchCompetition = async () => {
            try {
                const mockComp = mockCompetitions.find(c => c._id === id);
                if (mockComp) {
                    setCompetition(mockComp);
                    setLoading(false);
                    return;
                }

                const { data } = await api.get(`/competitions/${id}`);
                setCompetition(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch competition", error);
                const mockComp = mockCompetitions.find(c => c._id === id);
                if (mockComp) setCompetition(mockComp);
                setLoading(false);
            }
        };

        fetchCompetition();
    }, [id]);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 uppercase tracking-widest font-heading">Transmitting Data...</p>
        </div>
    );

    if (!competition) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900">
            <h2 className="text-2xl font-heading font-bold text-white mb-4 uppercase">Target Object Missing</h2>
            <Link to="/competitions" className="text-primary hover:underline font-bold uppercase tracking-wider">Return to Base</Link>
        </div>
    );

    return (
        <div className="bg-dark-900 min-h-screen pb-20 pt-20">
            <Breadcrumbs />

            {/* Large Banner Image */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden border-b border-white/10">
                <img
                    src={competition.bannerImage || competition.image || placeholderImage}
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                    alt={competition.name}
                    className="w-full h-full object-cover grayscale-[30%] contrast-125 hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-8 sm:p-16 max-w-7xl mx-auto left-1/2 -translate-x-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center px-4 py-1 rounded-sm border border-primary/30 bg-primary/10 mb-6 backdrop-blur-md">
                            <span className="text-xs font-bold text-primary tracking-widest uppercase font-heading">{competition.category}</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-heading font-bold text-white uppercase tracking-tighter leading-none mb-6">
                            {competition.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-8 text-gray-300">
                            <div className="flex items-center"><Calendar className="h-5 w-5 mr-3 text-primary" /> {new Date(competition.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                            <div className="flex items-center"><Users className="h-5 w-5 mr-3 text-primary" /> {competition.registrationCount || 0} Battlers Registered</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Left: Main Content */}
                    <div className="lg:col-span-2 space-y-16">

                        {/* Description */}
                        <section>
                            <div className="flex items-center space-x-3 mb-6">
                                <Info className="w-6 h-6 text-primary" />
                                <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">Mission Intelligence</h3>
                            </div>
                            <div className="p-8 bg-dark-800 border border-white/5 rounded-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                                <p className="text-xl text-gray-300 font-sans leading-relaxed border-l-4 border-primary pl-8 italic">
                                    {competition.description}
                                </p>
                            </div>
                        </section>

                        {/* Rules - Accordion */}
                        <section>
                            <div className="flex items-center space-x-3 mb-6">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                                <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">Protocol & Rules</h3>
                            </div>
                            <div className="space-y-4">
                                {competition.rules?.map((rule, index) => (
                                    <div key={index} className="border border-white/10 rounded-sm overflow-hidden bg-dark-800">
                                        <button
                                            onClick={() => toggleAccordion(index)}
                                            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                        >
                                            <span className="text-lg font-bold text-white uppercase tracking-wide font-heading">{rule.title}</span>
                                            {openAccordion === index ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                                        </button>
                                        <AnimatePresence>
                                            {openAccordion === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="px-6 pb-6"
                                                >
                                                    <p className="text-gray-400 font-sans leading-relaxed pt-2 border-t border-white/5">
                                                        {rule.content}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Prizes */}
                        <section>
                            <div className="flex items-center space-x-3 mb-6">
                                <Trophy className="w-6 h-6 text-primary" />
                                <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">Victory Rewards</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {competition.prizes?.map((prize, index) => (
                                    <div key={index} className={`p-8 rounded-sm bg-dark-800 border ${index === 0 ? 'border-primary/50 shadow-[0_0_20px_rgba(249,115,22,0.15)]' : 'border-white/5'} hover:border-primary/50 transition-all group`}>
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${index === 0 ? 'bg-primary text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-white/5 text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_0_15px_rgba(249,115,22,0.5)] transition-all'}`}>
                                            <Trophy className="w-7 h-7" />
                                        </div>
                                        <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{prize.position}</div>
                                        <div className="text-3xl font-heading font-bold text-white mb-2">{prize.amount}</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider">{prize.reward}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQs */}
                        <section>
                            <div className="flex items-center space-x-3 mb-6">
                                <HelpCircle className="w-6 h-6 text-primary" />
                                <h3 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">Intel Briefing (FAQ)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {competition.faqs?.map((faq, index) => (
                                    <div key={index} className="space-y-3">
                                        <h4 className="text-white font-bold uppercase tracking-wide flex items-start">
                                            <span className="text-primary mr-2">Q.</span> {faq.question}
                                        </h4>
                                        <p className="text-gray-400 font-sans border-l border-white/10 pl-4">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right: Sidebar */}
                    <div className="space-y-8">
                        {/* Registration Card */}
                        <div className="bg-dark-800 rounded-sm border border-white/10 p-8 sticky top-28 shadow-2xl">
                            <h3 className="text-xl font-heading font-bold text-white mb-8 uppercase tracking-widest border-b border-white/5 pb-4">Mission Parameters</h3>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                                        <GraduationCap className="h-5 w-5 mr-4 text-primary" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Eligibility</span>
                                    </div>
                                    <span className="text-sm font-bold text-white">{competition.eligibility}</span>
                                </div>

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                                        <Clock className="h-5 w-5 mr-4 text-primary" />
                                        <span className="text-xs font-bold uppercase tracking-widest">End Date</span>
                                    </div>
                                    <span className="text-sm font-bold text-white">{new Date(competition.endDate).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                                        <IndianRupee className="h-5 w-5 mr-4 text-primary" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Entry Fee</span>
                                    </div>
                                    <span className="text-2xl font-heading font-bold text-primary">₹{competition.registrationFee}</span>
                                </div>

                                <div className="pt-8 border-t border-white/5">
                                    <Link
                                        to={`/competitions/${id}/register`}
                                        className="w-full flex items-center justify-center py-5 px-6 rounded-sm text-sm font-bold text-white bg-primary hover:bg-orange-600 shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all transform hover:skew-x-[-10deg] uppercase tracking-widest group"
                                    >
                                        <span className="group-hover:skew-x-[10deg] transition-transform">Register Now</span>
                                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:skew-x-[10deg] transition-transform" />
                                    </Link>
                                    <button className="w-full mt-4 flex items-center justify-center py-3 px-6 border border-white/10 rounded-sm text-xs font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest">
                                        <Share2 className="mr-3 h-4 w-4" /> Share Intel
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info / Contact */}
                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-sm">
                            <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Support Channel</h4>
                            <p className="text-xs text-gray-400 font-sans leading-relaxed mb-4">
                                Need technical assistance or have questions about the mission?
                            </p>
                            <Link to="/contact" className="text-xs font-bold text-white hover:text-primary transition-colors uppercase tracking-widest">Contact Command Center →</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CompetitionDetail;
