import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../types';
import { cartService } from '../services/cart';
import { useAuth } from './AuthContext';

interface CartContextType {
    cartItems: CartItem[];
    loading: boolean;
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
    updateQuantity: (productId: number, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    getTotal: () => number;
    getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            loadCart();
        } else {
            setCartItems([]);
        }
    }, [user]);

    const loadCart = async () => {
        setLoading(true);
        try {
            const items = await cartService.getCart();
            setCartItems(items);
        } catch (error) {
            console.error('Failed to load cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId: number, quantity: number = 1) => {
        try {
            const item = await cartService.addToCart(productId, quantity);
            setCartItems(prev => {
                const existing = prev.find(i => i.productId === productId);
                if (existing) {
                    return prev.map(i =>
                        i.productId === productId
                            ? { ...i, quantity: i.quantity + quantity }
                            : i
                    );
                }
                return [...prev, item];
            });
        } catch (error) {
            console.error('Failed to add to cart:', error);
            throw error;
        }
    };

    const removeFromCart = async (productId: number) => {
        try {
            await cartService.removeFromCart(productId);
            setCartItems(prev => prev.filter(item => item.productId !== productId));
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            throw error;
        }
    };

    const updateQuantity = async (productId: number, quantity: number) => {
        if (quantity <= 0) {
            await removeFromCart(productId);
            return;
        }

        try {
            await cartService.updateCartItem(productId, quantity);
            setCartItems(prev =>
                prev.map(item =>
                    item.productId === productId
                        ? { ...item, quantity }
                        : item
                )
            );
        } catch (error) {
            console.error('Failed to update quantity:', error);
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clearCart();
            setCartItems([]);
        } catch (error) {
            console.error('Failed to clear cart:', error);
            throw error;
        }
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) =>
            total + (item.product.price * item.quantity), 0
        );
    };

    const getItemCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            loading,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotal,
            getItemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};