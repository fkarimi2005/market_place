import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProduct } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface ToastMessage {
    id: number;
    message: string;
    type: 'success' | 'error';
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.products);
    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(Number(id))).then(action => {
                if (fetchProduct.fulfilled.match(action)) {
                    setProduct(action.payload);
                }
            });
        }
    }, [dispatch, id]);

    const showToast = (message: string, type: 'success' | 'error') => {
        const newToast: ToastMessage = { id: Date.now(), message, type };
        setToasts(prev => [...prev, newToast]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== newToast.id));
        }, 3000);
    };

    const handleAddToCart = async () => {
        if (product && !isAddingToCart) {
            setIsAddingToCart(true);
            try {
                await (dispatch as any)(addToCart({ productId: product.id, quantity })).unwrap();
                showToast(`Успешно добавлено ${quantity} шт. "${product.name}" в корзину!`, 'success');
                setQuantity(1);
            } catch (err: any) {
                showToast(err?.normalizedMessage || 'Не удалось добавить в корзину', 'error');
            } finally {
                setIsAddingToCart(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Товар не найден</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Вернуться к товарам
                    </button>
                </div>
            </div>
        );
    }

    const price = Number(product.price) || 0;

    return (
        <>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="aspect-w-16 aspect-h-9">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                {product.category && (
                                    <p className="text-lg text-gray-600 mt-2">{product.category.name}</p>
                                )}
                            </div>

                            <div>
                                <p className="text-3xl font-bold text-indigo-600">{price.toFixed(2)} ₽</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Описание</h3>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                    Количество:
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max="99"
                                    value={quantity}
                                    onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart}
                                    className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                                >
                                    {isAddingToCart ? 'Добавляем...' : 'Добавить в корзину'}
                                </button>
                                <button
                                    onClick={() => navigate('/products')}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                                >
                                    Назад к товарам
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Большие toast уведомления */}
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

export default ProductDetail;
