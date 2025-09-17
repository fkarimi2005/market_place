import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, register, logout, getProfile, clearError } from '../store/slices/authSlice';
import { LoginData, RegisterData } from '../types';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, token, loading, error } = useAppSelector((state) => state.auth);

    const loginUser = (credentials: LoginData) => {
        dispatch(login(credentials));
    };

    const registerUser = (userData: RegisterData) => {
        dispatch(register(userData));
    };

    const logoutUser = () => {
        dispatch(logout());
    };

    const loadProfile = () => {
        dispatch(getProfile());
    };

    const clearAuthError = () => {
        dispatch(clearError());
    };

    const isAuthenticated = !!token && !!user;
    const isAdmin = user?.role === 'ADMIN';

    return {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        isAdmin,
        loginUser,
        registerUser,
        logoutUser,
        loadProfile,
        clearAuthError,
    };
};
