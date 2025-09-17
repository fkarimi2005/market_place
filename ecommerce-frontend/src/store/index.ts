import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import ordersReducer from './slices/ordersSlice'
import categoriesReducer from './slices/categoriesSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer,
        orders: ordersReducer,
        categories: categoriesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch