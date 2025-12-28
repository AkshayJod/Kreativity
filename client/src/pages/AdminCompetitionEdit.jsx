import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const AdminCompetitionEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchCompetition();
        }
    }, [id]);

    const fetchCompetition = async () => {
        try {
            const { data } = await api.get(`/competitions/${id}`);
            setValue('name', data.name);
            setValue('category', data.category);
            setValue('description', data.description);
            setValue('startDate', data.startDate.split('T')[0]); // Format for date input
            setValue('registrationFee', data.registrationFee);
            setValue('image', data.image);
            setValue('maxParticipants', data.maxParticipants);
        } catch (error) {
            toast.error('Failed to load competition details');
            navigate('/admin');
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (isEditMode) {
                await api.put(`/competitions/${id}`, data);
                toast.success('Competition updated');
            } else {
                await api.post('/competitions', data);
                toast.success('Competition created');
            }
            navigate('/admin');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <button onClick={() => navigate('/admin')} className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </button>
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Competition' : 'Create Competition'}</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            placeholder="e.g. Robotics, Coding"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('category', { required: 'Category is required' })}
                        />
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('description', { required: 'Description is required' })}
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register('startDate', { required: 'Date is required' })}
                            />
                            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Registration Fee ($)</label>
                            <input
                                type="number"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register('registrationFee', { required: 'Fee is required', min: 0 })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="text"
                            placeholder="https://..."
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            {...register('image')}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update Competition' : 'Create Competition')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminCompetitionEdit;
