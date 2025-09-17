"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const hooks_1 = require("../app/hooks");
const cartSlice_1 = require("../features/cart/cartSlice");
const orderSlice_1 = require("../features/orders/orderSlice");
const Cart = () => {
    const dispatch = (0, hooks_1.useAppDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { items, total, loading, error } = (0, hooks_1.useAppSelector)((state) => state.cart);
    const orderLoading = (0, hooks_1.useAppSelector)((state) => state.orders.loading);
    react_1.default.useEffect(() => {
        dispatch((0, cartSlice_1.fetchCart)());
    }, [dispatch]);
    const handleRemoveItem = (productId) => {
        dispatch((0, cartSlice_1.removeFromCart)(productId));
    };
    const handleClearCart = () => {
        if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
            dispatch((0, cartSlice_1.clearCart)());
        }
    };
    const handleCheckout = () => {
        dispatch((0, orderSlice_1.createOrder)())
            .unwrap()
            .then(() => {
            alert('Заказ успешно оформлен! Ожидайте подтверждения от администратора.');
            navigate('/orders');
        })
            .catch((error) => {
            alert(`Ошибка оформления заказа: ${error}`);
        });
    };
    if (loading) {
        return <div className="text-center py-10">Загрузка...</div>;
    }
    if (error) {
        return <div className="text-center py-10 text-red-500">Ошибка: {error}</div>;
    }
    if (items.length === 0) {
        return (<div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
        <button onClick={() => navigate('/')} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
            Перейти к покупкам
        </button>
        </div>);
    }
    return (<div>
            <h1 className="text-3xl font-bold mb-6">Корзина</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="divide-y">
        {items.map((item) => (<div key={item.id} className="p-4 flex items-center">
                {item.product.imageUrl ? (<img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded mr-4"/>) : (<div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20 mr-4 flex items-center justify-center">
        <span className="text-gray-500 text-xs">Нет изображения</span>
    </div>)}

    <div className="flex-1">
    <h3 className="font-medium">{item.product.name}</h3>
        <p className="text-gray-600">{item.product.price.toFixed(2)} ₽ x {item.quantity}</p>
    <p className="font-bold">{(item.product.price * item.quantity).toFixed(2)} ₽</p>
    </div>

    <button onClick={() => handleRemoveItem(item.productId)} className="text-red-500 hover:text-red-700">
        Удалить
        </button>
        </div>))}
    </div>

    <div className="p-4 border-t">
    <div className="flex justify-between items-center mb-4">
    <span className="text-lg font-bold">Итого: {total.toFixed(2)} ₽</span>
    <div>
    <button onClick={handleClearCart} className="mr-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">
        Очистить корзину
    </button>
    <button onClick={handleCheckout} disabled={orderLoading} className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50">
        {orderLoading ? 'Оформление...' : 'Оформить заказ'}
        </button>
        </div>
        </div>
        </div>
        </div>
        </div>);
};
exports.default = Cart;
//# sourceMappingURL=Cart.js.map