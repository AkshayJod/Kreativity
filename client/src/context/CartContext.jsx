import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        try {
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Failed to parse cart items", error);
            localStorage.removeItem('cartItems');
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty) => {
        setCartItems((prevItems) => {
            const existItem = prevItems.find((x) => x.product === product._id);

            if (existItem) {
                return prevItems.map((x) =>
                    x.product === product._id ? { ...x, qty: x.qty + qty } : x
                );
            } else {
                return [...prevItems, {
                    product: product._id,
                    name: product.name,
                    image: product.images[0],
                    price: product.price,
                    countInStock: product.countInStock,
                    qty
                }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((x) => x.product !== id));
    };

    const updateQty = (id,
        qty) => {
        setCartItems(prevItems => prevItems.map(x => x.product === id ? { ...x, qty: Number(qty) } : x));
    }

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
