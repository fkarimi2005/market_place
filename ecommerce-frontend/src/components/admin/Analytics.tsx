import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllOrders } from '../../store/slices/ordersSlice';
import { fetchProducts } from '../../store/slices/productsSlice';

const Analytics: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state) => state.orders);
    const { products } = useAppSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchAllOrders());
        dispatch(fetchProducts({}));
    }, [dispatch]);

    // Безопасная проверка массивов
    const safeOrders = Array.isArray(orders) ? orders : [];
    const safeProducts = Array.isArray(products) ? products : [];

    // Безопасное вычисление с проверкой типов
    const totalRevenue = safeOrders.reduce((sum, order) => {
        const value = Number(order.total);
        return sum + (isNaN(value) ? 0 : value);
    }, 0);

    const totalOrders = safeOrders.length;
    const totalProducts = safeProducts.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const ordersByStatus = safeOrders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Функция безопасного форматирования
    const formatCurrency = (value: number): string => {
        if (typeof value !== 'number' || isNaN(value)) {
            return '0.00';
        }
        return value.toFixed(2);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Аналитика</h2>

            {/* Статистические карточки */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Общая выручка</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {formatCurrency(totalRevenue)} ₽
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Всего заказов</p>
                            <p className="text-2xl font-semibold text-gray-900">{totalOrders}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Товаров</p>
                            <p className="text-2xl font-semibold text-gray-900">{totalProducts}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Средний чек</p>
                            <p className="text-2xl font-semibold text-gray-900">
                                {formatCurrency(averageOrderValue)} ₽
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Статистика по статусам заказов */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Заказы по статусам</h3>
                <div className="space-y-3">
                    {Object.entries(ordersByStatus).map(([status, count]) => (
                        <div key={status} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">
                                {status === 'PENDING' && 'Ожидает подтверждения'}
                                {status === 'CONFIRMED' && 'Подтвержден'}
                                {status === 'SHIPPED' && 'Отправлен'}
                                {status === 'DELIVERED' && 'Доставлен'}
                                {status === 'CANCELLED' && 'Отменен'}
                            </span>
                            <span className="text-sm text-gray-500">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;