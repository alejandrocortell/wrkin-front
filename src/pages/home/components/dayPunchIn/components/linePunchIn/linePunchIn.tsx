import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PunchIn } from '../../../../../../models/punchIn'
import moment from 'moment'

interface props {
    punchIn: PunchIn
}

export const LinePunchIn: FC<props> = (props) => {
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
        <div key={props.punchIn.id} className='line-punchIn'>
            <div className='space-between'>
                <span>{t('COMMON_START')} </span>
                <span>{formatHour(props.punchIn.start)}h</span>
            </div>
            <span>-</span>
            <div className='space-between'>
                <span>{t('COMMON_STOP')} </span>
                <span>{formatHour(props.punchIn.end)}h</span>
            </div>
            <div className='end'>
                <span>{t('COMMON_TOTAL')} </span>
                <span>{elapsedTime(props.punchIn)}h</span>
            </div>
        </div>
    )
}
