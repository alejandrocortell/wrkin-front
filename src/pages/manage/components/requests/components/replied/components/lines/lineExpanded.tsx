import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDayOffType } from 'hooks/useDayOffType'
import { DayOff } from 'models/dayOff'
import { User } from 'models/user'
import DateUtilities from 'utils/date'
import arrow from 'assets/img/arrow.svg'
import { useStatusRequest } from 'hooks/useStatusRequest'

const dateUtilities = new DateUtilities()
interface props {
    request: DayOff
    user: User
    changeExpanded: () => void
}

export const LineExpanded: FC<props> = (props) => {
    const { t } = useTranslation()
    const dayOffType = useDayOffType(props.request.dayOffTypeId)
    const status = useStatusRequest(props.request.statusRequestId)

    return (
        <div className='expanded line'>
            <div className='line-user'>
                <p className='user'>{`${props.user.firstName} ${props.user.lastName}`}</p>
                <span onClick={props.changeExpanded}>
                    <img src={arrow} alt='Contract line' />
                </span>
            </div>
            <div className='times'>
                <div>
                    <p className='title'>{t('FORM_DATE_START')}</p>
                    <p className='message'>
                        {dateUtilities.format(
                            new Date(props.request.start),
                            'DD-MM-YYYY HH:mm'
                        )}
                    </p>
                </div>
                <div>
                    <p className='title'>{t('FORM_DATE_END')}</p>
                    <p className='message'>
                        {dateUtilities.format(
                            new Date(props.request.end),
                            'DD-MM-YYYY HH:mm'
                        )}
                    </p>
                </div>
            </div>
            <div>
                <p className='title'>{t('MANAGE_TYPE_DAY_OFF')}</p>
                <p className='message'>{dayOffType}</p>
            </div>
            <div>
                <p className='title'>{t('MANAGE_STATUS')}</p>
                <p className='message'>{status}</p>
            </div>
            <div>
                <p className='title'>{t('MANAGE_PENDINGS_MESSAGE')}</p>
                <p className='message'>{props.request.message}</p>
            </div>
        </div>
    )
}
