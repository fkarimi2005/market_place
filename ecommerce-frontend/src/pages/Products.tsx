import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductFilters } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts, setFilters } from '../store/slices/productsSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';
import ProductList from '../components/products/ProductList';
import ProductFilter from '../components/products/ProductFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Products: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const { products, loading, error, total } = useAppSelector((state) => state.products);
    const { categories } = useAppSelector((state) => state.categories);

    const [localFilters, setLocalFilters] = useState<ProductFilters>({
        search: searchParams.get('search') || '',
        categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
        minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
        maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
        limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 12,
    });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProducts(localFilters));
    }, [dispatch, localFilters]);

    const handleFilterChange = useCallback((newFilters: ProductFilters) => {
        const mergedFilters = { ...localFilters, ...newFilters, page: 1 };
        setLocalFilters(mergedFilters);
        dispatch(setFilters(mergedFilters));

        // Update URL search params
        const params = new URLSearchParams();
        Object.entries(mergedFilters).forEach(([key, value]) => {
            if (value !== undefined && value !== '' && value !== null) {
                params.set(key, value.toString());
            }
        });
        setSearchParams(params);
    }, [localFilters, setSearchParams, dispatch]);

    const handlePageChange = (page: number) => {
        const newFilters = { ...localFilters, page };
        setLocalFilters(newFilters);
        dispatch(setFilters(newFilters));
        
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        setSearchParams(params);
    };

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
                    <h1 className="text-3xl font-bold text-gray-900">Товары</h1>
                    <p className="mt-2 text-gray-600">Найдите то, что вам нужно</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Фильтры */}
                    <div className="lg:col-span-1">
                        <ProductFilter
                            filters={localFilters}
                            onFilterChange={handleFilterChange}
                            categories={categories}
                        />
                    </div>

                    {/* Список товаров */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 flex justify-between items-center">
                                    <p className="text-gray-600">
                                        Найдено товаров: {total}
                                    </p>
                                </div>
                                
                                <ProductList products={products} />

                                {/* Пагинация */}
                                {total > 0 && (
                                    <div className="mt-8 flex justify-center">
                                        <nav className="flex space-x-2">
                                            {Array.from(
                                                { length: Math.ceil(total / (localFilters.limit || 12)) }, 
                                                (_, i) => i + 1
                                            ).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                                        localFilters.page === page
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;