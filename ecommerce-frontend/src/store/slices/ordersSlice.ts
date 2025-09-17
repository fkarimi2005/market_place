import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Order } from '../../types'
import { orderService } from '../../services/orders'

interface OrdersState {
    orders: Order[]
    currentOrder: Order | null
    loading: boolean
    error: string | null
}

const initialState: OrdersState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
}

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            return await orderService.getOrders()
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to fetch orders'
            )
        }
    }
)

export const fetchOrder = createAsyncThunk(
    'orders/fetchOrder',
    async (id: number, { rejectWithValue }) => {
        try {
            return await orderService.getOrder(id)
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to fetch order'
            )
        }
    }
)

export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (_, { rejectWithValue }) => {
        try {
            return await orderService.createOrder()
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to create order'
            )
        }
    }
)

// Admin methods
export const fetchAllOrders = createAsyncThunk(
    'orders/fetchAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            return await orderService.getAllOrders()
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to fetch all orders'
            )
        }
    }
)

export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async ({ id, status }: { id: number; status: string }, { rejectWithValue }) => {
        try {
            return await orderService.updateOrderStatus(id, status)
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to update order status'
            )
        }
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearCurrentOrder: (state) => {
            state.currentOrder = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Orders
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload.map((order: any) => ({
                    ...order,
                    total: Number(order.total) || 0,
                }))
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Fetch Order
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.currentOrder = {
                    ...action.payload,
                    total: Number(action.payload.total) || 0,
                }
            })
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.orders.unshift({
                    ...action.payload,
                    total: Number(action.payload.total) || 0,
                })
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Fetch All Orders (Admin)
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.orders = action.payload.map((order: any) => ({
                    ...order,
                    total: Number(order.total) || 0,
                }))
            })
            // Update Order Status (Admin)
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updatedOrder = {
                    ...action.payload,
                    total: Number(action.payload.total) || 0,
                }

                const index = state.orders.findIndex(
                    (order) => order.id === updatedOrder.id
                )
                if (index !== -1) {
                    state.orders[index] = updatedOrder
                }
                if (state.currentOrder?.id === updatedOrder.id) {
                    state.currentOrder = updatedOrder
                }
            })
            // Error handling
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: any) => {
                    state.error = action.payload as string
                }
            )
    },
})

export const { clearError, clearCurrentOrder } = ordersSlice.actions
export default ordersSlice.reducer
