import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCart, addToCart, removeFromCart, updateCartItem, clearCart } from '../store/slices/cartSlice';

export const useCart = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((state) => state.cart);

    const loadCart = () => {
        dispatch(fetchCart());
    };

    const addItem = (productId: number, quantity: number = 1) => {
        dispatch(addToCart({ productId, quantity }));
    };

    const removeItem = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        dispatch(updateCartItem({ productId, quantity }));
    };

    const clear = () => {
        dispatch(clearCart());
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    return {
        items,
        loading,
        error,
        loadCart,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        getTotalPrice,
        getTotalItems,
    };
};
