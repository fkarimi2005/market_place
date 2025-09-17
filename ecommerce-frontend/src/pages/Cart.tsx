import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCart, removeFromCart, updateCartItem, clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/ordersSlice';
import CartItem from '../components/cart/CartItem';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface ToastMessage {
    id: number;
    message: string;
    type: 'success' | 'error';
}

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items, loading, error } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.auth);

    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        if (user) {
            dispatch(fetchCart());
        }
    }, [dispatch, user]);

    const showToast = (message: string, type: 'success' | 'error') => {
        const newToast: ToastMessage = { id: Date.now(), message, type };
        setToasts(prev => [...prev, newToast]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== newToast.id));
        }, 3000);
    };

    const handleRemoveItem = async (productId: number) => {
        try {
            await (dispatch as any)(removeFromCart(productId)).unwrap();
            showToast('Товар успешно удалён из корзины', 'success');
        } catch (err: any) {
            showToast(err?.normalizedMessage || 'Не удалось удалить товар', 'error');
        }
    };

    const handleUpdateQuantity = async (productId: number, quantity: number) => {
        if (quantity <= 0) {
            handleRemoveItem(productId);
        } else {
            try {
                await (dispatch as any)(updateCartItem({ productId, quantity })).unwrap();
                showToast('Количество товара обновлено', 'success');
            } catch (err: any) {
                showToast(err?.normalizedMessage || 'Не удалось обновить количество', 'error');
            }
        }
    };

    const handleClearCart = async () => {
        if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
            try {
                await (dispatch as any)(clearCart()).unwrap();
                showToast('Корзина успешно очищена', 'success');
            } catch (err: any) {
                showToast(err?.normalizedMessage || 'Не удалось очистить корзину', 'error');
            }
        }
    };

    const handleCheckout = async () => {
        if (items.length === 0) {
            showToast('Корзина пуста', 'error');
            return;
        }

        try {
            await (dispatch as any)(createOrder()).unwrap();
            showToast('Заказ успешно оформлен', 'success');
            navigate('/orders');
        } catch (err: any) {
            showToast(err?.normalizedMessage || 'Не удалось оформить заказ', 'error');
        }
    };

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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
        <>
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
                                            {items.map(item => (
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
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Итоги заказа</h3>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Товары ({items.length})</span>
                                                <span className="font-medium">{total.toFixed(2)} ₽</span>
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600">Доставка</span>
                                                <span className="font-medium">Бесплатно</span>
                                            </div>

                                            <div className="border-t pt-3">
                                                <div className="flex justify-between text-lg font-bold">
                                                    <span>Итого</span>
                                                    <span>{total.toFixed(2)} ₽</span>
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

            {/* Toast уведомления */}
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 space-y-4 w-full max-w-4xl">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            w-full bg-white shadow-xl rounded-lg border-l-8 overflow-hidden
                            transform transition-all duration-500 ease-in-out animate-slideDown
                            ${toast.type === 'success' ? 'border-green-500' : 'border-red-500'}
                        `}
                    >
                        <div className="flex items-center p-5">
                            <div className="flex-shrink-0 mr-4">
                                {toast.type === 'success' ? (
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`font-bold text-lg ${toast.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                    {toast.type === 'success' ? 'Успешно!' : 'Ошибка!'}
                                </p>
                                <p className="mt-1 text-base text-gray-800">{toast.message}</p>
                            </div>
                            <button
                                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                                className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                ✕
                            </button>
                        </div>
                        <div className={`h-1 ${toast.type === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
                            <div
                                className={`h-full ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} transition-all ease-linear`}
                                style={{ width: '100%', animation: 'shrink 3s linear forwards' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes shrink {
                    from { width: 100%; }
                    to { width: 0%; }
                }

                @keyframes slideDown {
                    0% { opacity: 0; transform: translateY(-50px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .animate-slideDown {
                    animation: slideDown 0.4s ease-out;
                }
            `}</style>
        </>
    );
};

export default Cart;
