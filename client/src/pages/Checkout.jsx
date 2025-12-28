import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { Shield, CreditCard, MapPin, Truck } from 'lucide-react';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
        paymentMethod: 'Stripe'
    });

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const shippingPrice = subtotal > 100 ? 0 : 10; // Simple logic: Free shipping over $100
    const taxPrice = Number((0.15 * subtotal).toFixed(2));
    const totalPrice = (subtotal + shippingPrice + taxPrice).toFixed(2);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            const orderData = {
                orderItems: cartItems,
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    country: formData.country,
                },
                paymentMethod: formData.paymentMethod,
                itemsPrice: subtotal,
                taxPrice,
                shippingPrice,
                totalPrice: Number(totalPrice),
            };

            await api.post('/orders', orderData);
            toast.success("Order placed successfully! Redirecting...");
            clearCart();
            navigate('/dashboard');
        } catch (error) {
            console.error("Order failed", error);
            const message = error.response && error.response.data.message
                ? error.response.data.message
                : "Failed to place order";
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8 font-sans text-white">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-heading font-bold text-white mb-8 flex items-center">
                    <Shield className="mr-3 text-primary h-10 w-10" />
                    SECURE CHECKOUT
                </h1>

                <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                    {/* Checkout Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Shipping Information */}
                            <div className="bg-dark-800 border border-white/10 rounded-lg p-6 shadow-xl backdrop-blur-sm">
                                <h2 className="text-xl font-heading font-bold text-white mb-4 flex items-center">
                                    <MapPin className="mr-2 text-secondary" />
                                    Shipping Details
                                </h2>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div className="sm:col-span-6">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-400">Address</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                required
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="block w-full rounded-sm border-gray-700 bg-dark-900/50 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-400">City</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                required
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="block w-full rounded-sm border-gray-700 bg-dark-900/50 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-400">Postal Code</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="postalCode"
                                                id="postalCode"
                                                required
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                className="block w-full rounded-sm border-gray-700 bg-dark-900/50 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-400">Country</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="country"
                                                id="country"
                                                required
                                                value={formData.country}
                                                onChange={handleChange}
                                                className="block w-full rounded-sm border-gray-700 bg-dark-900/50 text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2.5"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-dark-800 border border-white/10 rounded-lg p-6 shadow-xl backdrop-blur-sm">
                                <h2 className="text-xl font-heading font-bold text-white mb-4 flex items-center">
                                    <CreditCard className="mr-2 text-primary" />
                                    Payment Method
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="stripe"
                                            name="paymentMethod"
                                            type="radio"
                                            value="Stripe"
                                            checked={formData.paymentMethod === 'Stripe'}
                                            onChange={handleChange}
                                            className="focus:ring-primary h-4 w-4 text-primary border-gray-600 bg-dark-900"
                                        />
                                        <label htmlFor="stripe" className="ml-3 block text-sm font-medium text-gray-300">
                                            Stripe / Credit Card
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="paypal"
                                            name="paymentMethod"
                                            type="radio"
                                            value="PayPal"
                                            checked={formData.paymentMethod === 'PayPal'}
                                            onChange={handleChange}
                                            className="focus:ring-primary h-4 w-4 text-primary border-gray-600 bg-dark-900"
                                        />
                                        <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-300">
                                            PayPal
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="mt-16 lg:mt-0 lg:col-span-5">
                        <div className="bg-dark-800 border border-white/10 rounded-lg p-6 shadow-xl backdrop-blur-sm sticky top-24">
                            <h2 className="text-xl font-heading font-bold text-white mb-6 flex items-center">
                                <Truck className="mr-2 text-green-400" />
                                Order Summary
                            </h2>

                            <ul className="divide-y divide-white/10 mb-6">
                                {cartItems.map((item) => (
                                    <li key={item.product} className="py-4 flex items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-16 w-16 rounded border border-white/10 object-cover"
                                        />
                                        <div className="ml-4 flex-1">
                                            <h3 className="text-sm font-bold text-white">{item.name}</h3>
                                            <p className="text-gray-400 text-xs mt-1">{item.qty} x ${item.price}</p>
                                        </div>
                                        <p className="text-sm font-bold text-primary">${(item.qty * item.price).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>

                            <dl className="space-y-3 border-t border-white/10 pt-6 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <dt>Subtotal</dt>
                                    <dd className="text-white">${subtotal.toFixed(2)}</dd>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <dt>Shipping</dt>
                                    <dd className="text-white">${shippingPrice.toFixed(2)}</dd>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <dt>Tax (15%)</dt>
                                    <dd className="text-white">${taxPrice.toFixed(2)}</dd>
                                </div>
                                <div className="flex justify-between border-t border-white/10 pt-4 items-center">
                                    <dt className="text-base font-bold text-white">Total</dt>
                                    <dd className="text-2xl font-heading font-bold text-primary">${totalPrice}</dd>
                                </div>
                            </dl>

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="mt-8 w-full bg-primary hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-sm shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all uppercase tracking-wider text-sm flex justify-center items-center"
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
