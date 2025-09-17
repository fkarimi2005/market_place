import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/slices/productsSlice';
import { fetchCategories } from '../store/slices/categoriesSlice';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading } = useAppSelector((state) => state.products);
    const { categories } = useAppSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchProducts({ limit: 8 }));
        dispatch(fetchCategories());
    }, [dispatch]);

    const featuredProducts = products.slice(0, 8);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-indigo-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                            Добро пожаловать в наш магазин
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-indigo-200 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Найдите лучшие товары по выгодным ценам
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <div className="rounded-md shadow">
                                <Link
                                    to="/products"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
                                >
                                    Перейти к товарам
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            {categories.length > 0 && (
                <div className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                            Категории
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categories.slice(0, 8).map((category) => (
                                <Link
                                    key={category.id}
                                    to={`/products?categoryId=${category.id}`}
                                    className="bg-gray-100 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors duration-200"
                                >
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {category.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Featured Products Section */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Рекомендуемые товары
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Популярные товары, которые могут вас заинтересовать
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-8">
                        <Link
                            to="/products"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Посмотреть все товары
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

