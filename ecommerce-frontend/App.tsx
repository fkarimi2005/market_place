import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { getProfile } from './store/slices/authSlice'
import { fetchCart } from './store/slices/cartSlice'
import Layout from './components/common/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminProducts from './pages/Admin/Products'
import AdminOrders from './pages/Admin/Orders'
import Analytics from './pages/Admin/Analytics'
import AdminCategories from './pages/Admin/Categories'
import './index.css'

const AppContent: React.FC = () => {
    const dispatch = useAppDispatch()
    const { token, user } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (token) {
            dispatch(getProfile())
            dispatch(fetchCart())
        }
    }, [token, dispatch])

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />

                    <Route path="/cart" element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    } />


                    <Route path="/orders" element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    } />

                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />

                    <Route path="/admin/dashboard" element={
                        <ProtectedRoute adminOnly>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/products" element={
                        <ProtectedRoute adminOnly>
                            <AdminProducts />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/orders" element={
                        <ProtectedRoute adminOnly>
                            <AdminOrders />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/analytics" element={
                        <ProtectedRoute adminOnly>
                            <Analytics />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/categories" element={
                        <ProtectedRoute adminOnly>
                            <AdminCategories />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Layout>
        </Router>
    )
}

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    )
}

export default App;