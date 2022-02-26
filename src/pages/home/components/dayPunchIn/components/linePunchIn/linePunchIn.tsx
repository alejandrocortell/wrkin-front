import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PunchIn } from 'models/punchIn'
import DateUtilities from 'utils/date'

const dateUtilities = new DateUtilities()

interface props {
    punchIn: PunchIn
}

export const LinePunchIn: FC<props> = (props) => {
    const { t } = useTranslation()

    const elapsedTime = (punchIn: PunchIn) => {
        if (punchIn.end === null) return
        const milliseconds = dateUtilities.diference(punchIn.start, punchIn.end)
        return dateUtilities.parseMillisecondsToHHmm(milliseconds)
    }

    return (
        <>
            {props.punchIn.end === null ? (
                <></>
            ) : (
                <div className='line-punchIn'>
                    <div className='space-between'>
                        <span>{t('COMMON_START')} </span>
                        <span>
                            {dateUtilities.format(props.punchIn.start, 'HH:mm')}
                            h
                        </span>
                    </div>
                    <span>-</span>
                    <div className='space-between'>
                        <span>{t('COMMON_STOP')} </span>
                        <span>
                            {dateUtilities.format(props.punchIn.end, 'HH:mm')}h
                        </span>
                    </div>
                    <div className='end'>
                        <span>{t('COMMON_TOTAL')} </span>
                        <span>{elapsedTime(props.punchIn)}h</span>
                    </div>
                </div>
            )}
        </>
    )
}
