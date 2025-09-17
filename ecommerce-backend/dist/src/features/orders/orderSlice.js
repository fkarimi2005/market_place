"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSelectedOrder = exports.fetchUserOrders = exports.createOrder = exports.updateOrderStatus = exports.fetchAllOrders = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = require("../../api/axios");
const initialState = {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null,
};
exports.fetchAllOrders = (0, toolkit_1.createAsyncThunk)('orders/fetchAllOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await axios_1.default.get('/orders/admin/all');
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки заказов');
    }
});
exports.updateOrderStatus = (0, toolkit_1.createAsyncThunk)('orders/updateOrderStatus', async ({ orderId, status }, { rejectWithValue, dispatch }) => {
    try {
        const response = await axios_1.default.patch(`/orders/admin/${orderId}/status`, { status });
        dispatch((0, exports.fetchAllOrders)());
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка обновления статуса заказа');
    }
});
exports.createOrder = (0, toolkit_1.createAsyncThunk)('orders/createOrder', async (_, { rejectWithValue }) => {
    try {
        const response = await axios_1.default.post('/orders');
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка создания заказа');
    }
});
exports.fetchUserOrders = (0, toolkit_1.createAsyncThunk)('orders/fetchUserOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await axios_1.default.get('/orders');
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки заказов');
    }
});
const orderSlice = (0, toolkit_1.createSlice)({
    name: 'orders',
    initialState,
    reducers: {
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(exports.fetchAllOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(exports.fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        })
            .addCase(exports.fetchAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
            .addCase(exports.updateOrderStatus.rejected, (state, action) => {
            state.error = action.payload;
        })
            .addCase(exports.createOrder.fulfilled, (state, action) => {
            state.orders.unshift(action.payload);
        })
            .addCase(exports.fetchUserOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
        });
    },
});
exports.clearSelectedOrder = orderSlice.actions.clearSelectedOrder;
exports.default = orderSlice.reducer;
//# sourceMappingURL=orderSlice.js.map