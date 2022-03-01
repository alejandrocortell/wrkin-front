import { useTranslation } from 'react-i18next'

export const useRoleType = (type: number) => {
    const { t } = useTranslation()
    if (type === 1) return t('ROLE_ADMIN')
    if (type === 2) return t('ROLE_MANAGER')
    if (type === 3) return t('ROLE_RRHH')
    if (type === 4) return t('ROLE_COORDINATOR')
    if (type === 5) return t('ROLE_EMPLOYEE')
}
