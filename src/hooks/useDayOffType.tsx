import { useTranslation } from 'react-i18next'

export const useDayOffType = (type: number) => {
    console.log(type)
    const { t } = useTranslation()
    if (type === 1) return t('DAYOFF_TYPE_HOLIDAYS')
    if (type === 2) return t('DAYOFF_TYPE_DAYOFF')
    if (type === 3) return t('DAYOFF_TYPE_FORMATION')
    if (type === 4) return t('DAYOFF_TYPE_EXAM')
    if (type === 5) return t('DAYOFF_TYPE_SICK')
    if (type === 6) return t('DAYOFF_TYPE_OTHER')
}
