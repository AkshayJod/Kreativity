import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Calendar, Package, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const [registrations, setRegistrations] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const regRes = await api.get('/registrations/user');
                setRegistrations(regRes.data);

                const orderRes = await api.get('/orders/myorders');
                setOrders(orderRes.data);
            } catch (error) {
                console.error("Error fetching dashboard data", error);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <h1 className="text-3xl font-heading font-bold text-white mb-8 tracking-wide uppercase">User <span className="text-primary">Dashboard</span></h1>

                <div className="md:flex md:space-x-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 mb-6 md:mb-0">
                        <div className="bg-dark-800/50 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden shadow-2xl">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center px-6 py-4 text-sm font-medium transition-all duration-300 border-l-2 ${activeTab === 'profile' ? 'bg-white/5 text-primary border-primary' : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200'}`}
                            >
                                <UserIcon className={`mr-3 h-5 w-5 transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />
                                My Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('registrations')}
                                className={`w-full flex items-center px-6 py-4 text-sm font-medium transition-all duration-300 border-l-2 ${activeTab === 'registrations' ? 'bg-white/5 text-primary border-primary' : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200'}`}
                            >
                                <Calendar className={`mr-3 h-5 w-5 transition-colors ${activeTab === 'registrations' ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />
                                My Registrations
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center px-6 py-4 text-sm font-medium transition-all duration-300 border-l-2 ${activeTab === 'orders' ? 'bg-white/5 text-primary border-primary' : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200'}`}
                            >
                                <Package className={`mr-3 h-5 w-5 transition-colors ${activeTab === 'orders' ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />
                                My Orders
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {activeTab === 'profile' && (
                            <div className="bg-dark-800/80 backdrop-blur-sm shadow-xl border border-white/10 sm:rounded-sm overflow-hidden">
                                <div className="px-4 py-5 sm:px-6 border-b border-white/10">
                                    <h3 className="text-lg leading-6 font-medium text-white font-heading tracking-wide">Profile Information</h3>
                                    <p className="mt-1 max-w-2xl text-sm text-gray-400">Personal details and application.</p>
                                </div>
                                <div className="">
                                    <dl>
                                        <div className="bg-white/5 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-white/5">
                                            <dt className="text-sm font-medium text-gray-400">Full name</dt>
                                            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{user?.name}</dd>
                                        </div>
                                        <div className="bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-b border-white/5">
                                            <dt className="text-sm font-medium text-gray-400">Email address</dt>
                                            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{user?.email}</dd>
                                        </div>
                                        <div className="bg-white/5 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-400">Role</dt>
                                            <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 uppercase tracking-wider text-xs font-bold bg-primary/20 px-2 py-1 rounded inline-block w-auto">{user?.role}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        )}

                        {activeTab === 'registrations' && (
                            <div className="bg-dark-800/80 backdrop-blur-sm shadow-xl border border-white/10 sm:rounded-sm overflow-hidden">
                                <div className="px-4 py-5 sm:px-6 border-b border-white/10">
                                    <h3 className="text-lg leading-6 font-medium text-white font-heading tracking-wide">My Registrations</h3>
                                </div>
                                <ul className="divide-y divide-white/10">
                                    {registrations.length > 0 ? (
                                        registrations.map((reg) => (
                                            <li key={reg._id} className="px-4 py-4 sm:px-6 hover:bg-white/5 transition-colors">
                                                <Link to={`/registrations/${reg._id}`} className="block">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-bold text-primary truncate font-heading">{reg.competition?.name}</p>
                                                        <div className="ml-2 flex-shrink-0 flex">
                                                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${reg.status === 'registered' ? 'bg-green-900/50 text-green-300 border border-green-500/30' : 'bg-gray-800 text-gray-300 border border-gray-600'}`}>
                                                                {reg.status}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 sm:flex sm:justify-between">
                                                        <div className="sm:flex">
                                                            <p className="flex items-center text-sm text-gray-400">
                                                                Team: <span className="text-white ml-1">{reg.teamName}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-10 text-center text-gray-500 italic">No registrations found.</li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="bg-dark-800/80 backdrop-blur-sm shadow-xl border border-white/10 sm:rounded-sm overflow-hidden">
                                <div className="px-4 py-5 sm:px-6 border-b border-white/10">
                                    <h3 className="text-lg leading-6 font-medium text-white font-heading tracking-wide">My Orders</h3>
                                </div>
                                <ul className="divide-y divide-white/10">
                                    {orders.length > 0 ? (
                                        orders.map((order) => (
                                            <li key={order._id} className="px-4 py-4 sm:px-6 hover:bg-white/5 transition-colors">
                                                <Link to={`/orders/${order._id}`} className="block">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium text-primary truncate font-heading">Order #{order._id.substring(0, 10)}</p>
                                                        <div className="ml-2 flex-shrink-0 flex">
                                                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.isPaid ? 'bg-green-900/50 text-green-300 border border-green-500/30' : 'bg-red-900/50 text-red-300 border border-red-500/30'}`}>
                                                                {order.isPaid ? 'Paid' : 'Unpaid'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 sm:flex sm:justify-between">
                                                        <div className="sm:flex">
                                                            <p className="text-sm text-gray-400">Total: <span className="text-white font-bold">${order.totalPrice}</span></p>
                                                        </div>
                                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                                            <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-10 text-center text-gray-500 italic">No orders found.</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
