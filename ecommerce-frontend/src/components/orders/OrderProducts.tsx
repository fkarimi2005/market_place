import React, { useState } from "react";

interface OrderProductsProps {
    items: any[];
}

const OrderProducts: React.FC<OrderProductsProps> = ({ items }) => {
    const [open, setOpen] = useState(false);

    if (!items || items.length === 0) {
        return <span className="text-gray-500">Нет товаров</span>;
    }

    return (
        <div>
            {/* Кнопка для открытия */}
            <button
                onClick={() => setOpen(!open)}
                className="text-blue-600 hover:underline text-sm"
            >
                {open ? "Скрыть товары" : `Товары (${items.length})`}
            </button>

            {/* Список товаров */}
            {open && (
                <ul className="mt-2 space-y-1 text-sm text-gray-800 list-disc list-inside">
                    {items.map((item, idx) => (
                        <li key={idx}>
                            {item.product?.name} <span className="text-gray-500">(x{item.quantity})</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderProducts;
