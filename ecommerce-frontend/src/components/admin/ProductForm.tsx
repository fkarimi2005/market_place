import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { createProduct, updateProduct } from '../../store/slices/productsSlice';
import { Category } from '../../types';
import Notification from '../common/Notification';

interface ProductFormProps {
    product?: any;
    categories: Category[];
    onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, categories, onClose }) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        categoryId: product?.categoryId || '',
        imageUrl: product?.imageUrl || '',
        stock: product?.stock || '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl || null);

    const [notification, setNotification] = useState<{ message: string; type?: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('description', formData.description);
        productData.append('price', String(Number(formData.price)));
        productData.append('stock', String(Number(formData.stock)));
        productData.append('categoryId', String(Number(formData.categoryId)));

        if (imageFile) {
            productData.append('image', imageFile);
        } else if (formData.imageUrl) {
            productData.append('imageUrl', formData.imageUrl);
        }

        try {
            if (product) {
                await (dispatch as any)(updateProduct({ id: product.id, data: productData })).unwrap();
                setNotification({ message: 'Товар обновлен', type: 'success' });
            } else {
                await (dispatch as any)(createProduct(productData)).unwrap();
                setNotification({ message: 'Товар создан', type: 'success' });
            }
            onClose();
        } catch (error: any) {
            setNotification({ message: error?.message || 'Ошибка при сохранении товара', type: 'error' });
        }
    };

    return (
        <>
            {/* Уведомления */}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            {/* Модальное окно */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-40">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        {product ? 'Редактировать товар' : 'Добавить товар'}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Название */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Название</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Описание */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Описание</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Цена */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Цена</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Категория */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Категория</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">Выберите категорию</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Количество на складе */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Количество на складе</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Изображение */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Изображение товара</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-20 w-20 object-cover rounded-md"
                                    />
                                </div>
                            )}
                        </div>

                        {/* URL изображения */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                URL изображения (альтернатива)
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Или введите URL изображения"
                            />
                        </div>

                        {/* Кнопки */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Отмена
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                            >
                                {product ? 'Обновить' : 'Создать'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductForm;
