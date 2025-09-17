import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User, LoginData, RegisterData } from '../../types'
import { authService } from '../../services/auth'

interface AuthState {
    user: User | null
    token: string | null
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginData, { rejectWithValue }) => {
        try {
            return await authService.login(credentials)
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed')
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (userData: RegisterData, { rejectWithValue }) => {
        try {
            return await authService.register(userData)
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed')
        }
    }
)

export const getProfile = createAsyncThunk(
    'auth/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            return await authService.getProfile()
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to get profile')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('user', JSON.stringify(action.payload.user))
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Get Profile
            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(getProfile.rejected, (state) => {
                state.user = null
                state.token = null
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            })
    },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer