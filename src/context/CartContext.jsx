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
    const [seletedTab, setSelectedTab] = useState()

    const saveCartToSessionStorage = (cartData) => {
        sessionStorage.setItem(CART_SESSION_KEY, JSON.stringify(cartData));
    };

    const addToCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
        if (existingItemIndex !== -1) {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity += 1; // Assuming item.quantity is the quantity being added
            setCart(newCart);
            saveCartToSessionStorage(newCart);
        } else {
            const newCart = [...cart, item];
            setCart(newCart);
            saveCartToSessionStorage(newCart);
        }
    };

    const removeFromCart = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);
        if (existingItemIndex !== -1) {
            const newCart = [...cart];
            if (newCart[existingItemIndex].quantity > 1) {
                newCart[existingItemIndex].quantity -= 1;
            } else {
                newCart.splice(existingItemIndex, 1);
            }
            setCart(newCart);
            saveCartToSessionStorage(newCart);
        }
        setSelectedTab('')
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
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, sliderValue, setSliderValue, setCartValue, updateCart, size, updateSize, seletedTab, setSelectedTab }}>
            {children}
        </CartContext.Provider>
    );
}
