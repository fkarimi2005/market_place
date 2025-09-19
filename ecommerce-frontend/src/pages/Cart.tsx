import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCart, removeFromCart, updateCartItem, clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/ordersSlice';
import CartItem from '../components/cart/CartItem';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items, loading, error } = useAppSelector((state) => state.cart);
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(fetchCart());
        }
    }, [dispatch, user]);

    const handleRemoveItem = async (productId: number) => {
        try {
            await (dispatch as any)(removeFromCart(productId)).unwrap();
        } catch (error: any) {
            // eslint-disable-next-line no-alert
            alert(error?.normalizedMessage || 'Не удалось удалить товар из корзины');
        }
    };

    const handleUpdateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveItem(productId);
        } else {
            (dispatch as any)(updateCartItem({ productId, quantity })).unwrap().catch((error: any) => {
                // eslint-disable-next-line no-alert
                alert(error?.normalizedMessage || 'Не удалось обновить количество');
            });
        }
    };

    const handleClearCart = () => {
        if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
            dispatch(clearCart()); // просто диспатчим
            alert('Корзина успешно очищена'); // уведомление пользователю
        }
    };


    const handleCheckout = () => {
        if (items.length === 0) {
            alert('Корзина пуста');
            return;
        }

        (dispatch as any)(createOrder()).unwrap()
            .then(() => navigate('/orders'))
            .catch((error: any) => {
                // eslint-disable-next-line no-alert
                alert(error?.normalizedMessage || 'Не удалось оформить заказ');
            });
    };

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Ошибка загрузки</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
                    <p className="mt-2 text-gray-600">Ваши выбранные товары</p>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto h-24 w-24 text-gray-400">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">Корзина пуста</h3>
                        <p className="mt-2 text-gray-500">Начните добавлять товары в корзину</p>
                        <div className="mt-6">
                            <Link
                                to="/products"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Перейти к товарам
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Список товаров */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                onRemove={handleRemoveItem}
                                                onUpdateQuantity={handleUpdateQuantity}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Итоги заказа */}
                        <div className="lg:col-span-1">
                            <div className="bg-white shadow rounded-lg">
                                <div className="px-4 py-5 sm:p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Итоги заказа
                                    </h3>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Товары ({items.length})</span>
                                            <span className="font-medium">{total.toFixed(2)} $</span>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Доставка</span>
                                            <span className="font-medium">Бесплатно</span>
                                        </div>

                                        <div className="border-t pt-3">
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Итого</span>
                                                <span>{total.toFixed(2)} $</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3">
                                        <button
                                            onClick={handleCheckout}
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Оформить заказ
                                        </button>

                                        <button
                                            onClick={handleClearCart}
                                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Очистить корзину
                                        </button>

                                        <Link
                                            to="/products"
                                            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Продолжить покупки
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;

