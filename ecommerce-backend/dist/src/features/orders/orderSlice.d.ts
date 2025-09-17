interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: string;
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        imageUrl: string | null;
    };
}
interface Order {
    id: number;
    userId: number;
    status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    total: number;
    createdAt: string;
    updatedAt: string;
    orderItems: OrderItem[];
    user?: {
        id: number;
        name: string;
        email: string;
    };
}
interface OrderState {
    orders: Order[];
    selectedOrder: Order | null;
    loading: boolean;
    error: string | null;
}
export declare const fetchAllOrders: import("@reduxjs/toolkit").AsyncThunk<any, void, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const updateOrderStatus: import("@reduxjs/toolkit").AsyncThunk<any, {
    orderId: number;
    status: string;
}, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const createOrder: import("@reduxjs/toolkit").AsyncThunk<any, void, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const fetchUserOrders: import("@reduxjs/toolkit").AsyncThunk<any, void, import("@reduxjs/toolkit").AsyncThunkConfig>;
export declare const clearSelectedOrder: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"orders/clearSelectedOrder">;
declare const _default: import("redux").Reducer<import("immer").WritableDraft<OrderState>>;
export default _default;
