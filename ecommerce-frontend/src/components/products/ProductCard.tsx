import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/cartSlice';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            // Правильный типизированный dispatch
            await dispatch(addToCart({ productId: product.id, quantity: 1 })).unwrap();
            alert('Товар добавлен в корзину');
        } catch (error: any) {
            console.error('Failed to add product to cart:', error);
            alert(error?.message || 'Не удалось добавить в корзину');
        }
    };

    // Безопасное форматирование цены
    const formattedPrice =
        product.price !== undefined && product.price !== null
            ? Number(product.price).toFixed(2)
            : '0.00';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-w-16 aspect-h-9">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                    </h3>
                    {product.category && (
                        <p className="text-sm text-gray-500 mb-2">
                            {product.category.name}
                        </p>
                    )}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-indigo-600">
                            {formattedPrice} ₽
                        </span>
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
    );
};

export default ProductCard;
