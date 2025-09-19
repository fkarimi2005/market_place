import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../store/slices/productsSlice';
import { fetchAllOrders } from '../../store/slices/ordersSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import Analytics from '../../components/admin/Analytics';

const AdminDashboard: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.products);
    const { orders } = useAppSelector((state) => state.orders);
    const { categories } = useAppSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchProducts({ limit: 100 }));
        dispatch(fetchAllOrders());
        dispatch(fetchCategories());
    }, [dispatch]);

    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalCategories = categories.length;

    // Безопасное вычисление totalRevenue
    const totalRevenue = orders.reduce((sum, order) => {
        const orderTotal = Number(order.total) || 0; // Приводим к числу
        return sum + orderTotal;
    }, 0);
    const formattedRevenue = totalRevenue.toFixed(2);

    // Статусы заказов
    const pendingOrders = orders.filter(order => order.status === 'PENDING').length;
    const confirmedOrders = orders.filter(order => order.status === 'CONFIRMED').length;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Админ панель</h1>
                    <p className="mt-2 text-gray-600">Управление магазином</p>
                </div>

                {/* Статистика */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Товары</h3>
                                <p className="text-2xl font-bold text-blue-600">{totalProducts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Заказы</h3>
                                <p className="text-2xl font-bold text-green-600">{totalOrders}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Доход</h3>
                                <p className="text-2xl font-bold text-purple-600">{formattedRevenue} $</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Категории</h3>
                                <p className="text-2xl font-bold text-orange-600">{totalCategories}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Статусы заказов */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Статусы заказов</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Ожидают подтверждения:</span>
                                <span className="font-medium text-yellow-600">{pendingOrders}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Подтверждены:</span>
                                <span className="font-medium text-green-600">{confirmedOrders}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Быстрые действия</h3>
                        <div className="space-y-2">
                            <Link
                                to="/admin/products"
                                className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
                            >
                                Управление товарами
                            </Link>
                            <Link
                                to="/admin/orders"
                                className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
                            >
                                Управление заказами
                            </Link>
                            <Link
                                to="/admin/analytics"
                                className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
                            >
                                Аналитика и отчеты
                            </Link>
                            <Link
                                to="/admin/categories"
                                className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
                            >
                                Управление категориями
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Аналитика */}
                <Analytics />
            </div>
        </div>
    );
};

export default AdminDashboard;
