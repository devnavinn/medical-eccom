// CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const CART_SESSION_KEY = 'cart';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const storedCart = sessionStorage.getItem(CART_SESSION_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [sliderValue, setSliderValue] = useState(0);
    const [size, updateSize] = useState('M');

    const saveCartToSessionStorage = (cartData) => {
        sessionStorage.setItem(CART_SESSION_KEY, JSON.stringify(cartData));
    };

    const addToCart = (item) => {
        const newCart = [...cart, item];
        setCart(newCart);
        saveCartToSessionStorage(newCart);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        saveCartToSessionStorage(newCart);
    };

    const updateCart = (index, item) => {
        const newCart = [...cart];
        newCart[index] = item;
        setCart(newCart);
        saveCartToSessionStorage(newCart);
    };

    const setCartValue = (newCart) => {
        setCart(newCart);
        saveCartToSessionStorage(newCart);
    };

    useEffect(() => {
        saveCartToSessionStorage(cart);
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, sliderValue, setSliderValue, setCartValue, updateCart, size, updateSize }}>
            {children}
        </CartContext.Provider>
    );
}
