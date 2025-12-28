import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Plus, Shield } from 'lucide-react';
import api from '../utils/api';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const { data } = await api.get('/teams');
                setTeams(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch teams", error);
                setLoading(false);
            }
        };
        fetchTeams();
    }, []);

    return (
        <div className="min-h-screen bg-dark-900 relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-white uppercase tracking-wider mb-2">
                            Registered <span className="text-primary">Teams</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl">
                            Join the elite squads competing for glory. Find your alliance or forge a new legacy.
                        </p>
                    </div>
                    <Link
                        to="/create-team"
                        className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-primary text-white font-bold uppercase tracking-wide text-sm rounded-sm hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] group"
                    >
                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform" />
                        Create Team
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-gray-400">Loading Rosters...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teams.map((team, index) => (
                            <motion.div
                                key={team._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-dark-800/50 backdrop-blur-md border border-white/5 rounded-sm p-6 hover:border-primary/30 transition-all group hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Shield className="w-16 h-16 text-white/5 group-hover:text-primary/10 transition-colors" />
                                </div>

                                <div className="flex items-center mb-6 relative z-10">
                                    <div className="w-16 h-16 rounded-full bg-dark-900 border-2 border-primary/20 flex items-center justify-center overflow-hidden mr-4">
                                        {team.logo ? (
                                            <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <Users className="w-8 h-8 text-primary" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white uppercase tracking-wide">{team.name}</h3>
                                        <p className="text-xs text-gray-500 font-mono mt-1">Captain: {team.captain?.name || 'Unknown'}</p>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10 relative z-10">
                                    {team.description}
                                </p>

                                <div className="flex items-center justify-between border-t border-white/5 pt-4 relative z-10">
                                    <span className="text-xs font-mono text-gray-500 uppercase">
                                        Members: {team.members?.length || 0}
                                    </span>
                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-sm ${team.isRecruiting ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {team.isRecruiting ? 'Recruiting' : 'Full'}
                                    </span>
                                </div>
                            </motion.div>
                        ))}

                        {teams.length === 0 && (
                            <div className="col-span-full text-center py-20 bg-dark-800/30 rounded-sm border border-white/5 border-dashed">
                                <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <h3 className="text-xl text-gray-300 font-bold mb-2">No Teams Found</h3>
                                <p className="text-gray-500">Be the first to establish a team!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Teams;
