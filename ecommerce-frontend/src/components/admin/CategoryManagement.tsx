import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
    createCategory,
    fetchCategories,
    deleteCategory,
} from '../../store/slices/categoriesSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const CategoryManagement: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, loading } = useAppSelector((state) => state.categories);
    const { products } = useAppSelector((state) => state.products);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const [submitLoading, setSubmitLoading] = useState(false);

    // Загружаем категории при монтировании
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name.trim()) {
            setSubmitLoading(true);
            try {
                await dispatch(createCategory(formData)).unwrap();
                setFormData({ name: '', description: '' });
                setShowForm(false);
                dispatch(fetchCategories());
            } catch (error: any) {
                console.error('Ошибка создания категории:', error);
                alert(error?.message || 'Не удалось создать категорию');
            } finally {
                setSubmitLoading(false);
            }
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setFormData({ name: '', description: '' });
    };

    // Функция для подсчета товаров в категории
    const getProductCount = (categoryId: number): number => {
        if (!Array.isArray(products)) return 0;
        return products.filter((product) => product.categoryId === categoryId).length;
    };

    // Удаление категории
    const handleDelete = async (id: number) => {
        if (window.confirm('Вы уверены, что хотите удалить категорию?')) {
            try {
                await dispatch(deleteCategory(id)).unwrap();
            } catch (error: any) {
                alert(error?.message || 'Не удалось удалить категорию');
            }
        }
    };

    const safeCategories = Array.isArray(categories) ? categories : [];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Управление категориями</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Добавить категорию
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
                    <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white mx-4">
                        <div className="mt-3">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Добавить категорию
                                </h3>
                                <button
                                    onClick={handleCloseForm}
                                    className="text-gray-400 hover:text-gray-600"
                                    disabled={submitLoading}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Название категории{' '}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={submitLoading}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                                        placeholder="Введите название категории"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Описание (необязательно)
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        disabled={submitLoading}
                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                                        placeholder="Введите описание категории"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseForm}
                                        disabled={submitLoading}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 transition-colors"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitLoading || !formData.name.trim()}
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                                    >
                                        {submitLoading && (
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                        )}
                                        {submitLoading ? 'Создание...' : 'Создать'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Название
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Описание
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Товаров
                        </th>

                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {safeCategories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {category.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {category.name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <div
                                    className="max-w-xs truncate"
                                    title={category.description || ''}
                                >
                                    {category.description || '—'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {getProductCount(category.id)}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {safeCategories.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14-4H3m16 8H1m18 4H3"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Нет категорий</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Начните с создания первой категории товаров
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Добавить категорию
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryManagement;
