import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

// Halaman Utama
import Home from '@/pages/Home.vue'

import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import Product from '@/views/dashboard/product/Product.vue'
import Category from '@/views/dashboard/category/Category.vue'
import { me } from '../services/auth.service'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            children: [
                { path: '', component: Home }
            ]
        },
        {
            path: '/auth',
            component: AuthLayout,
            children: [
                { path: 'login', component: Login },
                { path: 'register', component: Register }
            ]
        },
        {
            path: '/admin',
            component: DashboardLayout,
            meta: { auth: true },
            children: [
                { path: 'dashboard', component: Dashboard },
                { path: 'products', component: Product },
                { path: 'categories', component: Category },
            ]
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()

    // Cek apakah punya token tapi data user belum ada
    const hasToken = localStorage.getItem('token') || auth.token
    const isUserMissing = !auth.user
    const isNotLoading = !auth.loading // Ini sekarang akan bekerja karena store sudah diperbaiki

    // Logika Fetching
    if (hasToken && isUserMissing && isNotLoading) {
        await auth.fetchUser()
    }

    // Logika Proteksi Halaman (Redirect jika gagal auth)
    if (to.meta.auth && !auth.isAuthenticated) {
        return next('/auth/login')
    }

    // Lanjut
    next()
})

export default router;
