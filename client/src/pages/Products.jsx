import { motion } from 'framer-motion';
import { ExternalLink, ShoppingBag, ArrowRight } from 'lucide-react';

// Product data with real images
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: "CodeQuest Starter Kit",
        price: 2499,
        category: "Competition Kits",
        description: "Complete Arduino kit for coding competitions",
        link: "https://ablkart.com/product/codequest-kit",
        image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=800" // Circuit board/Tech
    },
    {
        id: 2,
        name: "RoboQuest Building Kit",
        price: 3999,
        category: "Robotics",
        description: "Robot chassis with motors and controller",
        link: "https://ablkart.com/product/roboquest-kit",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" // Robot
    },
    {
        id: 3,
        name: "Arduino Uno R3 Board",
        price: 599,
        category: "Microcontrollers",
        description: "Official Arduino Uno board with USB cable",
        link: "https://ablkart.com/product/arduino-uno",
        image: "https://images.unsplash.com/photo-1608564697071-ddf911d81370?auto=format&fit=crop&q=80&w=800" // Arduino-like
    },
    {
        id: 4,
        name: "Ultrasonic Sensor HC-SR04",
        price: 149,
        category: "Sensors",
        description: "Distance sensor for robotics projects",
        link: "https://ablkart.com/product/ultrasonic-sensor",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" // Tech sensor vibe
    },
    {
        id: 5,
        name: "BO Motor with Wheels (4pcs)",
        price: 349,
        category: "Motors",
        description: "DC motors with rubber wheels",
        link: "https://ablkart.com/product/bo-motor-wheels",
        image: "https://images.unsplash.com/photo-1537754311517-2875d04af0bd?auto=format&fit=crop&q=80&w=800" // Technology parts
    },
    {
        id: 6,
        name: "IoT Starter Kit",
        price: 4499,
        category: "IoT",
        description: "ESP32 based IoT kit with sensors",
        link: "https://ablkart.com/product/iot-starter-kit",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" // Chip/IoT
    },
    {
        id: 7,
        name: "Breadboard with Jumper Wires",
        price: 199,
        category: "Components",
        description: "830 point breadboard with wire set",
        link: "https://ablkart.com/product/breadboard-set",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800" // Wires/Tech
    },
    {
        id: 8,
        name: "Raspberry Pi 4 (4GB)",
        price: 5999,
        category: "Microcontrollers",
        description: "Latest Raspberry Pi single board computer",
        link: "https://ablkart.com/product/raspberry-pi-4",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800" // Electronics
    }
];

const Products = () => {
    const handleBuyClick = (link) => {
        window.open(link, '_blank');
    };

    return (
        <div className="min-h-screen bg-dark-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
                {/* SHOWCASE HEADER */}
                <div className="text-center mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-heading font-bold text-white tracking-wide uppercase mb-6">
                            Recommended <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">STEM Products</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Professional tools and kits curated for your competition success.
                            <br className="hidden sm:block" />
                            Build faster, smarter, and better.
                        </p>

                        <div className="mt-8 inline-flex items-center px-6 py-2.5 rounded-full bg-dark-800/80 border border-white/10 shadow-[0_0_15px_rgba(249,115,22,0.1)] text-gray-300 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300">
                            <ShoppingBag className="w-5 h-5 mr-3 text-primary" />
                            <span className="font-medium">Official Partner:</span>
                            <span className="ml-1.5 font-bold text-white">ABL Kart</span>
                        </div>
                    </motion.div>
                </div>

                {/* PRODUCT GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
                    {SAMPLE_PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="bg-dark-800/50 backdrop-blur-md rounded-sm shadow-xl border border-white/5 overflow-hidden flex flex-col transition-all duration-300 group hover:border-primary/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]"
                        >
                            {/* Product Image */}
                            <div className="aspect-[4/3] bg-dark-900 relative overflow-hidden border-b border-white/5">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 will-change-transform opacity-90 group-hover:opacity-100"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-xs font-bold tracking-wide text-white uppercase bg-black/70 backdrop-blur-md rounded-sm border border-white/10 shadow-sm">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors font-heading uppercase tracking-wide">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 font-medium uppercase">Price</span>
                                        <span className="text-xl font-bold text-primary">
                                            ₹{product.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleBuyClick(product.link)}
                                        className="inline-flex items-center px-4 py-2 rounded-sm bg-white/5 text-white text-sm font-semibold border border-white/10 hover:bg-primary hover:border-primary hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg"
                                    >
                                        Buy Now
                                        <ExternalLink className="ml-2 w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* BOTTOM CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 relative rounded-sm overflow-hidden bg-dark-800 border border-white/10 text-white shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-transparent"></div>

                    <div className="relative p-10 sm:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl text-center md:text-left">
                            <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4 uppercase tracking-wide">
                                Ready to build something <span className="text-primary">extraordinary?</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-light">
                                Explore over 500+ premium components, sensors, and robotics kits on our official partner store.
                            </p>
                        </div>
                        <div className="flex-shrink-0">
                            <a
                                href="https://ablkart.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-bold rounded-sm hover:bg-orange-600 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] uppercase tracking-widest"
                            >
                                Visit ABL Kart
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Products;
