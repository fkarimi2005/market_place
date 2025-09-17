import React from 'react';
import { Product } from '../../types';

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                {product.name}
            </h3>
            <div className="space-y-2">
                <p><strong>Цена:</strong> {product.price.toFixed(2)} ₽</p>
                <p><strong>Описание:</strong> {product.description}</p>
                {product.category && (
                    <p><strong>Категория:</strong> {product.category.name}</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
