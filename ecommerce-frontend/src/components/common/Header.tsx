import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, token } = useAppSelector((state) => state.auth);
    const { items } = useAppSelector((state) => state.cart);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            Store
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            to="/products"
                            className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                        >
                            Товары
                        </Link>
                        {user && (
                            <>
                                <Link
                                    to="/orders"
                                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                                >
                                    Заказы
                                </Link>
                                {user.role === 'ADMIN' && (
                                    <Link
                                        to="/admin/dashboard"
                                        className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                                    >
                                        Админ панель
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-2 text-gray-700 hover:text-indigo-600"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {/* User menu */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
                                >
                                    <span className="mr-2">{user.name}</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Профиль
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Выйти
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : token ? (
                            // Token есть, но профиль ещё не подгружен
                            <div className="flex items-center text-sm text-gray-500">
                                Загрузка...
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                                >
                                    Войти
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                                >
                                    Регистрация
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-700 hover:text-indigo-600"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                            <Link
                                to="/products"
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Товары
                            </Link>
                            {user && (
                                <>
                                    <Link
                                        to="/orders"
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Заказы
                                    </Link>
                                    {user.role === 'ADMIN' && (
                                        <Link
                                            to="/admin/dashboard"
                                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Админ панель
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;