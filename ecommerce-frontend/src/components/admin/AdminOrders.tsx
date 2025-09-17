import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllOrders, updateOrderStatus } from '../../store/slices/ordersSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminOrders: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orders, loading } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            await (dispatch as any)(updateOrderStatus({ id: orderId, status: newStatus })).unwrap();
            // eslint-disable-next-line no-alert
            alert('Статус обновлен');
        } catch (error: any) {
            // eslint-disable-next-line no-alert
            alert(error?.normalizedMessage || 'Не удалось обновить статус');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'CONFIRMED':
                return 'bg-blue-100 text-blue-800';
            case 'SHIPPED':
                return 'bg-purple-100 text-purple-800';
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'Ожидает подтверждения';
            case 'CONFIRMED':
                return 'Подтвержден';
            case 'SHIPPED':
                return 'Отправлен';
            case 'DELIVERED':
                return 'Доставлен';
            case 'CANCELLED':
                return 'Отменен';
            default:
                return status;
        }
    };

    // Функция для получения имени клиента
    const getCustomerDisplay = (order: any): string => {
        // Проверяем разные возможные поля для имени пользователя
        if (order.user?.name) {
            return order.user.name;
        }
        if (order.user?.firstName && order.user?.lastName) {
            return `${order.user.firstName} ${order.user.lastName}`;
        }
        if (order.user?.firstName) {
            return order.user.firstName;
        }
        if (order.user?.email) {
            return order.user.email;
        }
        if (order.customerName) {
            return order.customerName;
        }
        if (order.customerEmail) {
            return order.customerEmail;
        }
        // Если ничего не найдено, показываем ID заказа
        return `Заказ #${order.id}`;
    };
    const formatCurrency = (value: any): string => {
        const numValue = Number(value);
        if (typeof numValue !== 'number' || isNaN(numValue)) {
            return '0.00';
        }
        return numValue.toFixed(2);
    };

    // Безопасная проверка массива orders
    const safeOrders = Array.isArray(orders) ? orders : [];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Управление заказами</h2>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Клиент
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Дата
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Сумма
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Статус
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Действия
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {safeOrders.map((order) => (
                        <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <div>
                                    <div className="font-medium">{getCustomerDisplay(order)}</div>
                                    <div className="text-xs text-gray-500">#{order.id}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(order.total)} ₽
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                        {getStatusText(order.status)}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="PENDING">Ожидает подтверждения</option>
                                    <option value="CONFIRMED">Подтвержден</option>
                                    <option value="SHIPPED">Отправлен</option>
                                    <option value="DELIVERED">Доставлен</option>
                                    <option value="CANCELLED">Отменен</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {safeOrders.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Заказы не найдены</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;