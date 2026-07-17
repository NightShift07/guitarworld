import React, { useState, useContext, createContext, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(()=>{
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart):[];
    });

    const addToCart = (art, cant) => {
        const itemInCart = cart.find(item => item.id === art.id);
        if (itemInCart) {
            const updCart = cart.map(item =>
                item.id === art.id
                    ? (item.cant + cant <= item.stock)
                        ? { ...item, cant: item.cant + cant }
                        : item
                    : item
            );
            setCart(updCart);
        } else {
            setCart(prevCart => [...prevCart, { ...art, cant }]);
        }
    };

    const delFromCart = (art, cant) => {
        const itemInCart = cart.find(item => item.id === art.id);
        if (itemInCart) {
            const updCart = cart.map(item =>
                item.id === art.id
                    ? (item.cant - cant > 0)
                        ? { ...item, cant: item.cant - cant }
                        : { ...item, cant: 0 }
                    : item
            ).filter(item => item.cant > 0);
            setCart(updCart);
        } else {
            setCart(prevCart => [...prevCart, { ...art, cant }]);
        }
    };

    const delArt = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };
    const getCartCant = () => {
        return cart.reduce((acc, cartItem) => acc + cartItem.cant, 0);
    };

    const getItemCant = (id) => {
        const item = cart.find(item => item.id === id);
        return item ? item.cant : 0;
    };

    const getCartTot = () => {
        return cart.reduce((acc, cartItem) => acc + cartItem.precio * cartItem.cant, 0);
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, delFromCart, delArt, clearCart, getCartCant, getItemCant, getCartTot }}>
            {children}
        </CartContext.Provider>
    );
};