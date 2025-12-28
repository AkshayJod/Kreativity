import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Competitions from './pages/Competitions';
import CompetitionDetail from './pages/CompetitionDetail';
import CompetitionRegister from './pages/CompetitionRegister';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AdminCompetitionEdit from './pages/AdminCompetitionEdit';
import AdminProductEdit from './pages/AdminProductEdit';
import ErrorBoundary from './components/ErrorBoundary';

const Layout = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* key={location.pathname} ensures proper re-rendering of animations if needed, but not strictly necessary here */}
            <main className={`flex-grow bg-gray-50 ${!isHome ? 'pt-20' : ''}`}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* User Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    {/* Competition Routes */}
                    <Route path="/competitions" element={<Competitions />} />
                    <Route path="/competitions/:id" element={<CompetitionDetail />} />
                    <Route
                        path="/competitions/:id/register"
                        element={
                            <PrivateRoute>
                                <CompetitionRegister />
                            </PrivateRoute>
                        }
                    />

                    {/* Shop Routes */}
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route
                        path="/checkout"
                        element={
                            <PrivateRoute>
                                <Checkout />
                            </PrivateRoute>
                        }
                    />

                    {/* Admin Routes */}
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/competitions/new"
                        element={
                            <AdminRoute>
                                <AdminCompetitionEdit />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/competitions/:id/edit"
                        element={
                            <AdminRoute>
                                <AdminCompetitionEdit />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/products/new"
                        element={
                            <AdminRoute>
                                <AdminProductEdit />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/admin/products/:id/edit"
                        element={
                            <AdminRoute>
                                <AdminProductEdit />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </main>
            <Footer />
            <Toaster position="top-center" />
        </div>
    );
};

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <CartProvider>
                    <Router>
                        <Layout />
                    </Router>
                </CartProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
