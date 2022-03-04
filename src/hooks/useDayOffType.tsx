import i18n from 'utils/i18n'

export const useDayOffType = (type: number) => {
    if (type === 1) return i18n.t('DAYOFF_TYPE_HOLIDAYS')
    if (type === 2) return i18n.t('DAYOFF_TYPE_DAYOFF')
    if (type === 3) return i18n.t('DAYOFF_TYPE_FORMATION')
    if (type === 4) return i18n.t('DAYOFF_TYPE_EXAM')
    if (type === 5) return i18n.t('DAYOFF_TYPE_SICK')
    if (type === 6) return i18n.t('DAYOFF_TYPE_OTHER')
}
