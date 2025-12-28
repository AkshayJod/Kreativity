import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const AdminProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await api.get(`/products/${id}`);
            setValue('name', data.name);
            setValue('price', data.price);
            setValue('category', data.category);
            setValue('description', data.description);
            setValue('countInStock', data.countInStock);
            setValue('image', data.images && data.images[0] ? data.images[0] : '');
        } catch (error) {
            toast.error('Failed to load product details');
            navigate('/admin');
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        // Ensure image is an array for backend if it expects it, or just handle single string
        // The backend schema seems to expect an array of strings for images based on previous context, 
        // but simple string might work if controller handles it or if we wrap it.
        // Let's assume we send 'image' as a single string field and backend might need adjustment OR we adapt here.
        // Checking backend model memory... Product model has 'images: [String]'.
        // So we should format it.

        const payload = {
            ...data,
            images: [data.image] // Wrap single image URL in array
        };

        try {
            if (isEditMode) {
                await api.put(`/products/${id}`, payload);
                toast.success('Product updated');
            } else {
                await api.post('/products', payload);
                toast.success('Product created');
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
                <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Product' : 'Create Product'}</h1>
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
                            placeholder="e.g. Robotics Kit"
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
                            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register('price', { required: 'Price is required', min: 0 })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock Count</label>
                            <input
                                type="number"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                {...register('countInStock', { required: 'Stock is required', min: 0 })}
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
                        <p className="text-xs text-gray-500 mt-1">Enter a single image URL.</p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductEdit;
