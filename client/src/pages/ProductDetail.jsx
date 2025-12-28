import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, qty);
        toast.success(`${product.name} added to cart`);
        navigate('/cart');
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!product) return <div className="p-10 text-center">Product not found</div>;

    return (
        <div className="min-h-screen bg-dark-900 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
                    {/* Image gallery */}
                    <div className="flex flex-col-reverse">
                        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <div className="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className="relative h-24 bg-dark-800 rounded-sm flex items-center justify-center text-sm font-medium uppercase text-white cursor-pointer hover:bg-dark-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-dark-900 focus:ring-primary border border-white/10"
                                    >
                                        <span className="sr-only">Image {idx + 1}</span>
                                        <span className="absolute inset-0 rounded-sm overflow-hidden">
                                            <img src={img} alt="" className="w-full h-full object-center object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full aspect-[4/3] rounded-sm bg-dark-800 border border-white/10 overflow-hidden shadow-2xl relative group">
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent pointer-events-none z-10"></div>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-center object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <div className="mb-8">
                            <h1 className="text-4xl font-heading font-bold tracking-tight text-white mb-4 uppercase">{product.name}</h1>
                            <div className="flex items-center space-x-4">
                                <p className="text-3xl font-bold text-primary">${product.price}</p>
                                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-900/30 text-green-400 border border-green-500/20">
                                    In Stock
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="text-base text-gray-400 space-y-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>

                        <div className="mt-8 border-t border-white/10 pt-8">
                            <h3 className="text-sm font-bold text-gray-200 uppercase tracking-widest mb-4">Features</h3>
                            <ul className="pl-4 space-y-2">
                                {product.features && product.features.map((feature, i) => (
                                    <li key={i} className="flex items-start text-gray-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10 pt-6 border-t border-white/10">
                            <div className="flex items-center space-x-6">
                                {product.countInStock > 0 ? (
                                    <>
                                        <div className="w-32">
                                            <label htmlFor="quantity" className="sr-only">Quantity</label>
                                            <select
                                                id="quantity"
                                                name="quantity"
                                                value={qty}
                                                onChange={(e) => setQty(Number(e.target.value))}
                                                className="block w-full text-base bg-dark-800 border border-white/10 text-white focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-sm py-3 px-4"
                                            >
                                                {[...Array(product.countInStock).keys()].slice(0, 10).map((x) => (
                                                    <option key={x + 1} value={x + 1} className="bg-dark-800">
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleAddToCart}
                                            className="flex-1 bg-primary border border-transparent rounded-sm py-3 px-8 flex items-center justify-center text-base font-bold text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 focus:ring-primary transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] uppercase tracking-wider"
                                        >
                                            Add to Cart
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-red-500 font-bold text-lg bg-red-500/10 px-4 py-2 rounded-sm border border-red-500/20 text-center w-full">Out of Stock</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
