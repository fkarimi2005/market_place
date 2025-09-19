import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts, deleteProduct } from '../../store/slices/productsSlice';
import { fetchOrders } from '../../store/slices/ordersSlice';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import ProductForm from './ProductForm';
import LoadingSpinner from '../common/LoadingSpinner';

const AdminProducts: React.FC = () => {
    const dispatch = useAppDispatch();
    const { products, loading: productsLoading } = useAppSelector((state) => state.products);
    const { categories } = useAppSelector((state) => state.categories);
    const { orders, loading: ordersLoading } = useAppSelector((state) => state.orders);

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        dispatch(fetchProducts({ page: 1, limit: 500 } as any));
        dispatch(fetchCategories());
        dispatch(fetchOrders()); // загружаем все заказы для проверки
    }, [dispatch]);

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    const handleDelete = async (productId: number) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) return;

        try {
            await dispatch(deleteProduct(productId));
            alert('Товар удален');
        } catch (error: any) {
            alert(error?.message || 'Не удалось удалить товар');
        }
    };



    const handleImageError = (productId: number) => {
        setImageErrors(prev => ({ ...prev, [productId]: true }));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    };

    const getStockStatus = (stock: number) => {
        if (stock > 10) return { bg: 'bg-green-100', text: 'text-green-800', label: 'В наличии' };
        if (stock > 0) return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Мало' };
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Нет в наличии' };
    };

    if (productsLoading || ordersLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Управление товарами</h2>
                <button
                    onClick={handleCreate}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                    Добавить товар
                </button>
            </div>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    categories={categories}
                    onClose={handleCloseForm}
                />
            )}

            <div className="bg-white shadow rounded-lg overflow-hidden">
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-500 text-lg mb-4">
                            Товары не найдены
                        </div>
                        <button
                            onClick={handleCreate}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Добавить первый товар
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Товар
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Категория
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Цена
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    На складе
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Действия
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => {
                                const stockStatus = getStockStatus(product.stock);
                                return (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    {imageErrors[product.id] ? (
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            className="h-10 w-10 rounded-full object-cover border border-gray-200"
                                                            src={product.imageUrl || '/placeholder-image.png'}
                                                            alt={product.name}
                                                            onError={() => handleImageError(product.id)}
                                                        />
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={product.name}>
                                                        {product.name}
                                                    </div>
                                                    {product.description && (
                                                        <div className="text-sm text-gray-500 max-w-xs truncate" title={product.description}>
                                                            {product.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                                    {product.category?.name || 'Без категории'}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {formatPrice(product.price)} $
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${stockStatus.bg} ${stockStatus.text}`}>
                                                    {product.stock} шт.
                                                </span>
                                            <div className={`text-xs mt-1 ${stockStatus.text}`}>
                                                {stockStatus.label}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors duration-200"
                                                >
                                                    Редактировать
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md bg-red-50 hover:bg-red-100 transition-colors duration-200"
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminProducts;
