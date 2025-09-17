import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CartItem } from '../../types'
import { cartService } from '../../services/cart'

interface CartState {
    items: CartItem[]
    loading: boolean
    error: string | null
}

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            return await cartService.getCart()
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart')
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }: { productId: number; quantity?: number }, { rejectWithValue }) => {
        try {
            return await cartService.addToCart(productId, quantity)
        } catch (error: any) {
            return rejectWithValue(error.normalizedMessage || error.response?.data?.message || 'Failed to add to cart')
        }
    }
)

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId: number, { rejectWithValue }) => {
        try {
            await cartService.removeFromCart(productId)
            return productId
        } catch (error: any) {
            return rejectWithValue(error.normalizedMessage || error.response?.data?.message || 'Failed to remove from cart')
        }
    }
)

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, quantity }: { productId: number; quantity: number }, { rejectWithValue }) => {
        try {
            return await cartService.updateCartItem(productId, quantity)
        } catch (error: any) {
            return rejectWithValue(error.normalizedMessage || error.response?.data?.message || 'Failed to update cart item')
        }
    }
)

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue }) => {
        try {
            await cartService.clearCart()
        } catch (error: any) {
            return rejectWithValue(error.normalizedMessage || error.response?.data?.message || 'Failed to clear cart')
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false
                const existingItem = state.items.find(item => item.productId === action.payload.productId)
                if (existingItem) {
                    existingItem.quantity += action.payload.quantity
                } else {
                    state.items.push(action.payload)
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Remove from Cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false
                state.items = state.items.filter(item => item.productId !== action.payload)
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Update Cart Item
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false
                const item = state.items.find(item => item.productId === action.payload.productId)
                if (item) {
                    item.quantity = action.payload.quantity
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Clear Cart
            .addCase(clearCart.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false
                state.items = []
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
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

export const { clearError } = cartSlice.actions
export default cartSlice.reducer