import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    const checkoutHandler = () => {
        if (!user) {
            navigate('/login?redirect=cart');
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 text-white pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-heading font-bold text-white mb-8 flex items-center">
                    <ShoppingBag className="mr-3 text-primary h-10 w-10" />
                    SHOPPING CART
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-dark-800/50 rounded-lg border border-white/5 backdrop-blur-sm">
                        <ShoppingBag className="mx-auto h-20 w-20 text-gray-600 mb-6" />
                        <p className="text-2xl text-gray-400 mb-8 font-heading">Your cart is empty.</p>
                        <Link to="/products" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-bold rounded-sm text-white bg-primary hover:bg-orange-600 transition-all uppercase tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]">
                            Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                        <section className="lg:col-span-7">
                            <ul className="divide-y divide-white/10 border-t border-b border-white/10">
                                {cartItems.map((item) => (
                                    <li key={item.product} className="flex py-6 sm:py-10">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 rounded-sm object-center object-cover sm:w-32 sm:h-32 border border-white/10"
                                            />
                                        </div>

                                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-lg font-bold font-heading">
                                                            <Link to={`/products/${item.product}`} className="text-white hover:text-primary transition-colors">
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <p className="mt-1 text-lg font-medium text-primary">${item.price}</p>
                                                </div>

                                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                                    <label htmlFor={`quantity-${item.product}`} className="sr-only">Quantity</label>
                                                    <select
                                                        id={`quantity-${item.product}`}
                                                        name={`quantity-${item.product}`}
                                                        value={item.qty}
                                                        onChange={(e) => updateQty(item.product, Number(e.target.value))}
                                                        className="max-w-full rounded-sm border border-white/20 bg-dark-800 py-1.5 text-base leading-5 font-medium text-white text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                                                    >
                                                        {[...Array(item.countInStock).keys()].slice(0, 10).map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <div className="absolute top-0 right-0">
                                                        <button type="button" onClick={() => removeFromCart(item.product)} className="-m-2 p-2 inline-flex text-gray-500 hover:text-red-500 transition-colors">
                                                            <span className="sr-only">Remove</span>
                                                            <Trash className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="mt-16 bg-dark-800 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 border border-white/10 shadow-xl backdrop-blur-sm sticky top-24">
                            <h2 id="summary-heading" className="text-xl font-heading font-bold text-white mb-6">Order Summary</h2>

                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                    <dt className="text-base font-bold text-white">Subtotal</dt>
                                    <dd className="text-base font-bold text-primary">${subtotal.toFixed(2)}</dd>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    Shipping and taxes calculated at checkout.
                                </div>
                            </dl>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={checkoutHandler}
                                    className="w-full bg-primary hover:bg-orange-600 border border-transparent rounded-sm shadow-[0_0_15px_rgba(249,115,22,0.3)] py-3 px-4 text-base font-bold text-white uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 focus:ring-primary transition-all"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
