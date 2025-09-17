import React from 'react';
import AdminProducts from '../../components/admin/AdminProducts';

const AdminProductsPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AdminProducts />
            </div>
        </div>
    );
};

export default AdminProductsPage;
