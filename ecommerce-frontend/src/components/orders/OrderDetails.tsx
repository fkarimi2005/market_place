import React from 'react';
import { Order } from '../../types';

interface OrderDetailsProps {
    order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                Детали заказа #{order.id}
            </h3>
            <div className="space-y-2">
                <p><strong>Статус:</strong> {order.status}</p>
                <p><strong>Сумма:</strong> {order.total.toFixed(2)} ₽</p>
                <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString('ru-RU')}</p>
            </div>
        </div>
    );
};

export default OrderDetails;
