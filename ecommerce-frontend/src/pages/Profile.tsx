import React from 'react';
import { useAppSelector } from '../store/hooks';

const Profile: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Профиль</h1>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Имя
                                </label>
                                <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Роль
                                </label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {user.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
                                </p>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Дата регистрации
                                </label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

