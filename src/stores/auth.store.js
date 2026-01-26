// src/stores/auth.store.js

import { defineStore } from 'pinia'
import * as authServices from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: false,
        error: null,
        validationErrors: null, // ✅ Tambahkan untuk validasi errors
    }),

    getters: {
        isAuthenticated: (state) => !!state.user,
        hasError: (state) => !!state.error,
        getValidationError: (state) => (field) => {
            return state.validationErrors?.[field]?.[0] || null
        }
    },

    actions: {
        clearErrors() {
            this.error = null
            this.validationErrors = null
        },

        async login(form) {
            this.clearErrors()
            this.loading = true

            try {
                await authServices.csrf()
                const res = await authServices.login(form)
                this.user = res.data.user || res.data
            } catch (error) {
                this.handleError(error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async register(form) {
            this.clearErrors()
            this.loading = true

            try {
                await authServices.csrf()
                const res = await authServices.register(form)
                this.user = res.data.user || res.data
            } catch (error) {
                this.handleError(error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                await authServices.logout()
            } catch (error) {
                console.error('Logout error:', error)
            } finally {
                this.user = null
                this.clearErrors()
            }
        },

        // ✅ Handle error dengan baik
        handleError(error) {
            console.error('API Error:', error)

            if (error.response) {
                const { status, data } = error.response

                // 422 = Validation error
                if (status === 422) {
                    this.validationErrors = data.errors
                    this.error = 'Validation failed'
                }
                // 401 = Unauthorized
                else if (status === 401) {
                    this.error = data.message || 'Unauthorized'
                }
                // 409 = Conflict (email already exists)
                else if (status === 409) {
                    this.error = data.message || 'Email already exists'
                }
                // 500 = Server error
                else if (status === 500) {
                    this.error = 'Server error. Please try again later.'
                }
                // Other errors
                else {
                    this.error = data.message || 'An error occurred'
                }
            } else if (error.request) {
                this.error = 'Network error. Please check your connection.'
            } else {
                this.error = error.message || 'An unknown error occurred'
            }
        }
    }
})