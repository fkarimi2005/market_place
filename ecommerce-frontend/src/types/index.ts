export interface User {
    id: number;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: number;
    stock: number;
    createdAt: string;
    category?: Category;
}

export interface CartItem {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    product: Product;
}

export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    product: {
        id: number;
        name: string;
    };
}

export interface Order {
    id: number;
    userId: number;
    status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    total: number;
    createdAt: string;
    orderItems: OrderItem[];
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

export interface ProductFilters {
    search?: string;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
}

export interface ForecastData {
    date: string;
    revenue: number;
}