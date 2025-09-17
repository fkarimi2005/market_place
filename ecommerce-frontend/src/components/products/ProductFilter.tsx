import React, { useState } from 'react';
import { ProductFilters, Category } from '../../types';

interface ProductFilterProps {
    filters: ProductFilters;
    onFilterChange: (filters: ProductFilters) => void;
    categories: Category[];
}

const ProductFilter: React.FC<ProductFilterProps> = ({ filters, onFilterChange, categories }) => {
    const [localFilters, setLocalFilters] = useState<ProductFilters>(filters);

    const handleFilterChange = (key: keyof ProductFilters, value: any) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const resetFilters: ProductFilters = {
            search: '',
            categoryId: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            page: 1,
            limit: 12,
        };
        setLocalFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Фильтры</h3>
                <button
                    onClick={handleReset}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                    Сбросить
                </button>
            </div>

            <div className="space-y-6">
                {/* Поиск */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Поиск
                    </label>
                    <input
                        type="text"
                        value={localFilters.search || ''}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        placeholder="Название товара..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Категория */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Категория
                    </label>
                    <select
                        value={localFilters.categoryId || ''}
                        onChange={(e) => handleFilterChange('categoryId', e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Все категории</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Цена */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Цена
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            value={localFilters.minPrice || ''}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                            placeholder="От"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="number"
                            value={localFilters.maxPrice || ''}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                            placeholder="До"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>

                {/* Количество на странице */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Товаров на странице
                    </label>
                    <select
                        value={localFilters.limit || 12}
                        onChange={(e) => handleFilterChange('limit', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;

