import { ROLES } from '@/utils/roles'

export function useRoleNavigation() {
    const rolePathMap = {
        [ROLES.ADMIN]: '/admin/dashboard',
        [ROLES.CUSTOMER]: '/customer/profile',
    }

    const getPageByRole = (roleId) => {
        return rolePathMap[roleId] || '/'
    }

    return {
        getPageByRole,
        rolePathMap
    }
}