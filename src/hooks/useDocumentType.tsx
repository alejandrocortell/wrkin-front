import i18n from 'utils/i18n'

export const useDocumentType = (type: number) => {
    if (type === 1) return i18n.t('DOCUMENTS_TYPE_PAYSLIP')
    if (type === 2) return i18n.t('DOCUMENTS_TYPE_SICK_LEAVE')
    if (type === 3) return i18n.t('DOCUMENTS_TYPE_IDENTIFYING')
    if (type === 4) return i18n.t('DOCUMENTS_TYPE_GENERIC')
}
