import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from '../../types'
import { productService } from '../../services/products'

interface CategoriesState {
    categories: Category[]
    loading: boolean
    error: string | null
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
}

// Получить список категорий
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            return await productService.getCategories()
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to fetch categories'
            )
        }
    }
)

// Создать категорию
export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (
        categoryData: { name: string; description?: string },
        { rejectWithValue }
    ) => {
        try {
            return await productService.createCategory(categoryData)
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to create category'
            )
        }
    }
)

// Удалить категорию
export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id: number, { rejectWithValue }) => {
        try {
            await productService.deleteCategory(id) // ✅ правильный вызов
            return id // вернём ID удалённой категории
        } catch (error: any) {
            return rejectWithValue(
                error.normalizedMessage ||
                error.response?.data?.message ||
                'Failed to delete category'
            )
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // --- fetchCategories ---
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

            // --- createCategory ---
            .addCase(createCategory.fulfilled, (state, action: any) => {
                const payload = action.payload
                const category = payload?.category ?? payload
                state.categories.push(category)
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.error = action.payload as string
            })

            // --- deleteCategory ---
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (cat) => cat.id !== action.payload
                )
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.payload as string
            })
    },
})

export const { clearError } = categoriesSlice.actions
export default categoriesSlice.reducer
