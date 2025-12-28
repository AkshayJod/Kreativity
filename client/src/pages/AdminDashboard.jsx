import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Edit, Trash2, Plus } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('competitions');
    const [competitions, setCompetitions] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        try {
            if (activeTab === 'competitions') {
                const { data } = await api.get('/competitions');
                setCompetitions(data);
            } else if (activeTab === 'products') {
                const { data } = await api.get('/products');
                setProducts(data);
            } else if (activeTab === 'orders') {
                const { data } = await api.get('/orders');
                setOrders(data);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch data');
        }
    };

    const deleteCompetition = async (id) => {
        if (!window.confirm('Are you sure you want to delete this competition?')) return;
        try {
            await api.delete(`/competitions/${id}`);
            toast.success('Competition deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete competition');
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            toast.success('Product deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 px-4">Admin Dashboard</h1>

            <div className="border-b border-gray-200 px-4">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('competitions')}
                        className={`${activeTab === 'competitions' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Competitions
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`${activeTab === 'products' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`${activeTab === 'orders' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Orders
                    </button>
                </nav>
            </div>

            <div className="mt-8 px-4">
                {activeTab === 'competitions' && (
                    <div>
                        <div className="flex justify-end mb-4">
                            <Link to="/admin/competitions/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center">
                                <Plus className="h-4 w-4 mr-2" />
                                Create New Competition
                            </Link>
                        </div>
                        <ul className="divide-y divide-gray-200 bg-white shadow rounded-lg">
                            {competitions.length === 0 ? <li className="p-4 text-gray-500 text-center">No competitions found.</li> : competitions.map((comp) => (
                                <li key={comp._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                    <div>
                                        <h3 className="text-lg font-medium text-indigo-600">{comp.name}</h3>
                                        <p className="text-sm text-gray-500">{comp.category} • {new Date(comp.startDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-500 hidden sm:inline">
                                            {comp.registrationCount || 0} Registered
                                        </span>
                                        <Link to={`/admin/competitions/${comp._id}/edit`} className="text-gray-400 hover:text-indigo-600">
                                            <Edit className="h-5 w-5" />
                                        </Link>
                                        <button onClick={() => deleteCompetition(comp._id)} className="text-gray-400 hover:text-red-600">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div>
                        <div className="flex justify-end mb-4">
                            <Link to="/admin/products/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center">
                                <Plus className="h-4 w-4 mr-2" />
                                Create New Product
                            </Link>
                        </div>
                        <ul className="divide-y divide-gray-200 bg-white shadow rounded-lg">
                            {products.length === 0 ? <li className="p-4 text-gray-500 text-center">No products found.</li> : products.map((prod) => (
                                <li key={prod._id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                    <div className="flex items-center">
                                        <img src={prod.images && prod.images[0] ? prod.images[0] : 'https://via.placeholder.com/40'} alt="" className="h-10 w-10 rounded-full mr-3 object-cover" />
                                        <div>
                                            <h3 className="text-lg font-medium text-indigo-600">{prod.name}</h3>
                                            <p className="text-sm text-gray-500">${prod.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-500 hidden sm:inline">
                                            Stock: {prod.countInStock}
                                        </span>
                                        <Link to={`/admin/products/${prod._id}/edit`} className="text-gray-400 hover:text-indigo-600">
                                            <Edit className="h-5 w-5" />
                                        </Link>
                                        <button onClick={() => deleteProduct(prod._id)} className="text-gray-400 hover:text-red-600">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div>
                        <ul className="divide-y divide-gray-200 bg-white shadow rounded-lg">
                            {orders.length === 0 ? <li className="p-4 text-gray-500 text-center">No orders found.</li> : orders.map((order) => (
                                <li key={order._id} className="p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-medium">Order #{order._id.substring(0, 10)}</h3>
                                        <p className="text-sm text-gray-500">{order.user?.name || order.user} • {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {order.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {order.isDelivered ? 'Delivered' : 'Pending'}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
