import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Users, Upload, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateTeam = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await api.post('/teams', data);
            toast.success('Team created successfully!');
            navigate('/teams');
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to create team');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-dark-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-md w-full space-y-8 relative z-10">
                <div>
                    <Link to="/teams" className="inline-flex items-center text-sm text-gray-500 hover:text-white mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Roster
                    </Link>
                    <div className="mx-auto h-16 w-16 bg-dark-800 border border-primary/30 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                        <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-heading font-bold text-white uppercase tracking-wider">
                        Establish New Team
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Create your squad. Define your legacy.
                    </p>
                </div>

                <form className="mt-8 space-y-6 bg-dark-800/50 backdrop-blur-md p-8 rounded-sm border border-white/10 shadow-2xl" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">Team Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Team Name"
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-white/10 placeholder-gray-500 text-white bg-dark-900/50 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                {...register('name', { required: 'Team name is required' })}
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="sr-only">Description</label>
                            <textarea
                                id="description"
                                rows={3}
                                placeholder="Team Description / Mission"
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-white/10 placeholder-gray-500 text-white bg-dark-900/50 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                {...register('description', { required: 'Description is required' })}
                            />
                            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="logo" className="sr-only">Logo URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Upload className="h-4 w-4 text-gray-500" />
                                </div>
                                <input
                                    id="logo"
                                    type="text"
                                    placeholder="Logo URL (Optional)"
                                    className="appearance-none rounded-none relative block w-full pl-10 px-3 py-3 border border-white/10 placeholder-gray-500 text-white bg-dark-900/50 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    {...register('logo')}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-wider rounded-sm text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 focus:ring-primary disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
                        >
                            {loading ? 'Creating...' : 'Initialize Team'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTeam;
