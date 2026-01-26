import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

// Halaman Utama
import Home from '@/pages/Home.vue'

import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'
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
                { path: '', component: Dashboard }
            ]
        }
    ]
})

router.beforeEach(async (to) => {
    const auth = useAuthStore()

    // if (!auth.user) {
    //     await auth.fetchUser()
    // }

    if (to.meta.auth && !auth.isAuthenticated) {
        return '/auth/login'
    }
})

export default router;
