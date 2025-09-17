import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
    fetchOrders, 
    fetchOrder, 
    createOrder, 
    fetchAllOrders, 
    updateOrderStatus 
} from '../store/slices/ordersSlice';

export const useOrders = () => {
    const dispatch = useAppDispatch();
    const { orders, currentOrder, loading, error } = useAppSelector((state) => state.orders);

    const loadOrders = () => {
        dispatch(fetchOrders());
    };

    const loadOrder = (id: number) => {
        dispatch(fetchOrder(id));
    };

    const createNewOrder = () => {
        return dispatch(createOrder());
    };

    const loadAllOrders = () => {
        dispatch(fetchAllOrders());
    };

    const updateStatus = (id: number, status: string) => {
        dispatch(updateOrderStatus({ id, status }));
    };

    return {
        orders,
        currentOrder,
        loading,
        error,
        loadOrders,
        loadOrder,
        createNewOrder,
        loadAllOrders,
        updateStatus,
    };
};
