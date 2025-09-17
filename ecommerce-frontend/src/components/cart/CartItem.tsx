import React from 'react';
import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
    item: CartItemType;
    onRemove: (productId: number) => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => {
    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 0) {
            onUpdateQuantity(item.productId, newQuantity);
        }
    };

    // Приводим цену к числу и используем 0 по умолчанию
    const price = Number(item.product.price) || 0;
    const totalPrice = price * item.quantity;

    return (
        <div className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
            <div className="flex-shrink-0">
                <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                    {item.product.name}
                </h3>
                <p className="text-sm text-gray-500">
                    {item.product.category?.name || ''}
                </p>
                <p className="text-lg font-semibold text-indigo-600">
                    {price.toFixed(2)} ₽
                </p>
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                    <span className="text-gray-600">-</span>
                </button>

                <span className="w-12 text-center font-medium">
                    {item.quantity}
                </span>

                <button
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                    <span className="text-gray-600">+</span>
                </button>
            </div>

            <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                    {totalPrice.toFixed(2)} ₽
                </p>
                <button
                    onClick={() => onRemove(item.productId)}
                    className="text-sm text-red-600 hover:text-red-500 mt-1"
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};

export default CartItem;
