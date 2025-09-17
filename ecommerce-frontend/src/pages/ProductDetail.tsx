import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProduct } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.products);
    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(Number(id))).then((action) => {
                if (fetchProduct.fulfilled.match(action)) {
                    setProduct(action.payload);
                }
            });
        }
    }, [dispatch, id]);

    const handleAddToCart = async () => {
        if (product) {
            try {
                await (dispatch as any)(addToCart({ productId: product.id, quantity })).unwrap();
                // eslint-disable-next-line no-alert
                alert('Товар добавлен в корзину');
            } catch (error: any) {
                // eslint-disable-next-line no-alert
                alert(error?.normalizedMessage || 'Не удалось добавить в корзину');
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
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Вернуться к товарам
                    </button>
                </div>
            </div>
        );
    }

    // Преобразуем цену в число, чтобы безопасно использовать toFixed
    const price = Number(product.price) || 0;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="aspect-w-16 aspect-h-9">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-96 object-cover rounded-lg"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            {product.category && (
                                <p className="text-lg text-gray-600 mt-2">{product.category.name}</p>
                            )}
                        </div>

                        <div>
                            <p className="text-3xl font-bold text-indigo-600">
                                {price.toFixed(2)} ₽
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Описание</h3>
                            <p className="text-gray-600">{product.description}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                                Количество:
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Добавить в корзину
                            </button>
                            <button
                                onClick={() => navigate('/products')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Назад к товарам
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
