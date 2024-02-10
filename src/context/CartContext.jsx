// CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [sliderValue, setSliderValue] = useState(0);
    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };
    const updateCart = (index, item) => {
        const newCart = [...cart];
        newCart[index] = item;
        setCart(newCart);
    };

    const setCartValue = (newCart) => {
        setCart(newCart);
    };
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, sliderValue, setSliderValue, setCartValue, updateCart }}>
            {children}
        </CartContext.Provider>
    );
}
