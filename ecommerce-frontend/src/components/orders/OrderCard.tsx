import React from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../../types';

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
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

    // Безопасное преобразование total
    const total = Number(order.total) || 0;

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900">
                            Заказ #{order.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                            {total.toFixed(2)} ₽
                        </span>
                    </div>
                </div>
            </div>

            <div className="px-6 py-4">
                <div className="space-y-2">
                    {order.orderItems.map((orderItem) => {
                        const price = Number(orderItem.price) || 0; // безопасное число
                        return (
                            <div key={orderItem.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-600">{orderItem.quantity}x</span>
                                    <span className="text-sm font-medium text-gray-900">{orderItem.product.name}</span>
                                </div>
                                <span className="text-sm text-gray-600">{price.toFixed(2)} ₽</span>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                            Итого: {order.orderItems.length} товар(ов)
                        </span>
                        <Link
                            to={`/orders/${order.id}`}
                            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                        >
                            Подробнее
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
