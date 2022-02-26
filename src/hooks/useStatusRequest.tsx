import { useTranslation } from 'react-i18next'

export const useStatusRequest = (type: number) => {
    const { t } = useTranslation()
    if (type === 1) return t('REQUEST_STATUS_APPROVED')
    if (type === 2) return t('REQUEST_STATUS_DENNIED')
    if (type === 3) return t('REQUEST_STATUS_WAITING')
}
