import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';

interface ProductCardProps {
    product: Product;
}

interface ToastMessage {
    id: number;
    message: string;
    type: 'success' | 'error';
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = (message: string, type: 'success' | 'error') => {
        const newToast: ToastMessage = { id: Date.now(), message, type };
        setToasts(prev => [...prev, newToast]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== newToast.id));
        }, 3000);
    };

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            await dispatch(addToCart({ productId: product.id, quantity: 1 })).unwrap();
            showToast(`Товар "${product.name}" добавлен в корзину`, 'success');
        } catch (error: any) {
            console.error('Failed to add product to cart:', error);
            showToast(error?.message || 'Не удалось добавить в корзину', 'error');
        }
    };

    const formattedPrice =
        product.price !== undefined && product.price !== null
            ? Number(product.price).toFixed(2)
            : '0.00';

    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 w-full w-166">

            <Link to={`/products/${product.id}`} className="block">
                    <div className="aspect-w-16 aspect-h-9">
                        <img
                           // src={product.imageUrl}
                            src={`http://localhost:3001${product.imageUrl}`}

                            alt={product.name}
                            className="w-full h-48 object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {product.name}
                        </h3>
                        {product.category && (
                            <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
                        )}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-indigo-600">{formattedPrice} $</span>
                            <button
                                onClick={handleAddToCart}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium"
                            >
                                В корзину
                            </button>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Toast уведомления */}
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 space-y-2 w-full max-w-md">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`
                            w-full bg-white shadow-lg rounded-lg border-l-8 overflow-hidden
                            transform transition-all duration-500 ease-in-out animate-slideDown
                            ${toast.type === 'success' ? 'border-green-500' : 'border-red-500'}
                        `}
                    >
                        <div className="flex items-center p-4">
                            <div className="flex-shrink-0 mr-3">
                                {toast.type === 'success' ? (
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className={`font-bold ${toast.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                                    {toast.type === 'success' ? 'Успешно!' : 'Ошибка!'}
                                </p>
                                <p className="text-gray-800 text-sm mt-1">{toast.message}</p>
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

            <style>{


                `
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
            `}
            </style>
        </>
    );
};

export default ProductCard;
