import React, { useState, useContext, createContext } from 'react';

export const CartContext = createContext();

export const useCart = () => {

    const context = useContext(CartContext);
    
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState ([]);

    const addToCart = (art, cant) => {
        const itemInCart = cart.find(item => item.id === art.id);
        if (itemInCart) {
            const updCart = cart.map(item =>
                item.id === art.id
                ? { ...item, cant: item.cant + cant }
                : item
            );
            setCart(updCart);
        } else {
            setCart(prevCart => [...prevCart, { ...art, cant }]);
        }
    };

    const clearCart = () => {
        setCart([]);
    };
    const getCartCant = () => {
        return cart.reduce((acc, cartItem) => acc + cartItem.cant, 0);
    };
    const getCartTot = () => {
        return cart.reduce((acc, cartItem) => acc + cartItem.precio * cartItem.cant, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, getCartCant, getCartTot }}>
            {children}
        </CartContext.Provider>
    );
};