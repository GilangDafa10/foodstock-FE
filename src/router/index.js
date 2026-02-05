import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { ROLES } from '@/utils/roles'

// Layouts
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

// Pages
import Home from '@/pages/Home.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Customer from '@/layouts/CustomerLayout.vue'
import CustomerPage from '@/pages/Customer.vue'

// Customer Pages
import CustomerOrder from '@/views/customer/CustOrders.vue'
import CustomerAddress from '@/views/customer/address/CustAddress.vue'

// Admin Pages
import Dashboard from '@/views/dashboard/Dashboard.vue'
import Product from '@/views/dashboard/product/Product.vue'
import Category from '@/views/dashboard/category/Category.vue'
import Stock from '@/views/dashboard/stock/Stock.vue'
import Order from '@/views/dashboard/order/Order.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // ================= PUBLIC =================
        {
            path: '/',
            component: Home,
            meta: { public: true }
        },

        // ================= AUTH =================
        {
            path: '/auth',
            component: AuthLayout,
            meta: { public: true },
            children: [
                { path: 'login', component: Login },
                { path: 'register', component: Register }
            ]
        },

        // ================= ADMIN =================
        {
            path: '/admin',
            component: DashboardLayout,
            meta: {
                requiresAuth: true,
                role: ROLES.ADMIN
            },
            children: [
                { path: 'dashboard', component: Dashboard },
                { path: 'products', component: Product },
                { path: 'categories', component: Category },
                { path: 'stocks', component: Stock },
                { path: 'orders', component: Order }
            ]
        },

        // ================= CUSTOMER =================
        {
            path: '/customer',
            component: Customer,
            meta: {
                requiresAuth: true,
                role: ROLES.CUSTOMER
            },
            children: [
                { path: 'profile', component: CustomerPage },
                { path: 'orders', component: CustomerOrder },
                { path: 'address', component: CustomerAddress }
            ]
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()

    const hasToken = localStorage.getItem('token')
    const requiredRole = to.meta.role

    // Fetch user hanya sekali saat ada token dan belum pernah dicoba
    if (hasToken && !auth.fetchUserAttempted) {
        await auth.fetchUser()
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return next('/auth/login')
    }

    if (requiredRole) {
        const userRoleId = auth.user?.role_id

        if (Array.isArray(requiredRole)) {
            if (!requiredRole.includes(userRoleId)) {
                return next('/')
            }
        } else {
            if (userRoleId !== requiredRole) {
                return next('/')
            }
        }
    }

    next()
})

export default router
