import { FC } from 'react'
import DateUtilities from 'utils/date'
import { useTranslation } from 'react-i18next'
import { DayOff } from 'models/dayOff'
import { useStatusRequest } from 'hooks/useStatusRequest'
import { useDayOffType } from 'hooks/useDayOffType'

const dateUtilities = new DateUtilities()

interface props {
    dayOff: DayOff
}

export const LineRequest: FC<props> = (props) => {
    const { t } = useTranslation()
    const status = useStatusRequest(props.dayOff.statusRequestId)
    const type = useDayOffType(props.dayOff.dayOffTypeId)

    return (
        <div className='card-day-off' key={props.dayOff.id}>
            <div className='cols'>
                <div className='group-info'>
                    <span className='title'>{t('COMMON_START')}</span>
                    <span>
                        {dateUtilities.format(
                            new Date(props.dayOff.start),
                            'DD-MM-YYYY hh:mm'
                        )}
                    </span>
                </div>
                <div className='group-info'>
                    <span className='title'>{t('COMMON_STOP')}</span>
                    <span>
                        {dateUtilities.format(
                            new Date(props.dayOff.end),
                            'DD-MM-YYYY hh:mm'
                        )}
                    </span>
                </div>
            </div>

            <div className='cols'>
                <div className='group-info'>
                    <span className='title'>
                        {t('CALENDAR_STATUS_REQUEST')}
                    </span>
                    <span>{status}</span>
                </div>
                <div className='group-info'>
                    <span className='title'>{t('COMMON_TYPE')}</span>
                    <span>{type}</span>
                </div>
            </div>

            <div className='group-info group-message'>
                <span className='title'>{t('FORM_MESSAGE')}</span>
                <span>{props.dayOff.message}</span>
            </div>
        </div>
    )
}
