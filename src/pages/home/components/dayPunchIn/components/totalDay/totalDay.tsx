import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PunchIn } from '../../../../../../models/punchIn'
import moment from 'moment'

interface props {
    punchIns: Array<PunchIn>
}

export const TotalDay: FC<props> = (props) => {
    const { t } = useTranslation()

    const formatHour = (date: Date) => {
        const d = moment(date)
        return d.format('HH:mm')
    }

    const elapsedTime = (punchIn: PunchIn) => {
        const start = moment(punchIn.start)
        const end = moment(punchIn.end)

        const diff = end.diff(start)
        return moment(diff).format('HH:mm')
    }

    return (
        <div className='total-day'>
            <span>
                {t('HOME_TOTAL_DAY')} {}
            </span>
        </div>
    )
}
