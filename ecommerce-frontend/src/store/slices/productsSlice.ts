import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Product, ProductFilters } from '../../types'
import { productService } from '../../services/products'

interface ProductsState {
    products: Product[]
    total: number
    filters: ProductFilters
    loading: boolean
    error: string | null
}

const initialState: ProductsState = {
    products: [],
    total: 0,
    filters: {
        page: 1,
        limit: 12,
    },
    loading: false,
    error: null,
}

// ==================== Async Thunks ====================
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (filters: ProductFilters, { rejectWithValue }) => {
        try {
            return await productService.getProducts(filters)
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to fetch products'
            )
        }
    }
)

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async (id: number, { rejectWithValue }) => {
        try {
            return await productService.getProduct(id)
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to fetch product'
            )
        }
    }
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData: any, { rejectWithValue }) => {
        try {
            return await productService.createProduct(productData)
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to create product'
            )
        }
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, data }: { id: number; data: FormData }, { rejectWithValue }) => {
        try {
            return await productService.updateProduct(id, data)
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to update product'
            )
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: number, { rejectWithValue }) => {
        try {
            await productService.deleteProduct(id)
            return id
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to delete product'
            )
        }
    }
)

// ==================== Helper ====================
const normalizeProduct = (product: any): Product => ({
    ...product,
    price: Number(product.price) || 0,
    oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
})

// ==================== Slice ====================
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload.data.map((p: any) => normalizeProduct(p))
                state.total = action.payload.meta.total
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Fetch Product
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false
                const normalized = normalizeProduct(action.payload)
                const index = state.products.findIndex(p => p.id === normalized.id)
                if (index !== -1) {
                    state.products[index] = normalized
                }
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Create Product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.unshift(normalizeProduct(action.payload))
            })
            // Update Product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const normalized = normalizeProduct(action.payload)
                const index = state.products.findIndex(p => p.id === normalized.id)
                if (index !== -1) {
                    state.products[index] = normalized
                }
            })
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload)
            })
    },
})

export const { setFilters, clearError } = productsSlice.actions
export default productsSlice.reducer
