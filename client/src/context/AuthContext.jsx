import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            if (userInfo) {
                try {
                    setUser(JSON.parse(userInfo));
                } catch (error) {
                    console.error("Failed to parse user info from local storage", error);
                    localStorage.removeItem('userInfo');
                }
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Login successful!');
            return data;
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            toast.error(message);
            throw error;
        }
    };

    const register = async (name, email, password, phone) => {
        try {
            const { data } = await api.post('/auth/register', {
                name,
                email,
                password,
                phone,
            });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Registration successful!');
            return data;
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            toast.error(message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        toast.success('Logged out successfully');
    };

    const updateProfile = async (userData) => {
        try {
            const { data } = await api.put('/auth/profile', userData);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Profile updated!');
            return data;
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            toast.error(message);
            throw error;
        }
    };



    const googleLogin = async (credential) => {
        try {
            const { data } = await api.post('/auth/google', { tokenId: credential });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('Google Login successful!');
            return data;
        } catch (error) {
            const message = error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message || 'Google login failed. Please try again.';
            toast.error(message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading, googleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
