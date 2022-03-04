import i18n from 'utils/i18n'

export const useStatusRequest = (type: number) => {
    if (type === 1) return i18n.t('REQUEST_STATUS_APPROVED')
    if (type === 2) return i18n.t('REQUEST_STATUS_DENNIED')
    if (type === 3) return i18n.t('REQUEST_STATUS_WAITING')
}
