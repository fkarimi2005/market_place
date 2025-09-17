import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProfile } from '../../store/slices/authSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (token && !user) {
            dispatch(getProfile());
        }
    }, [token, user, dispatch]);

    // If we have a token but haven't loaded the user yet, attempt to load and avoid redirect flicker
    if (token && !user) {
        return <></>;
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;