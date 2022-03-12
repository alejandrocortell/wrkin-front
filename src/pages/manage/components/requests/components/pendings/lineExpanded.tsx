import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDayOffType } from 'hooks/useDayOffType'
import { DayOff } from 'models/dayOff'
import { User } from 'models/user'
import DateUtilities from 'utils/date'
import arrow from 'assets/img/arrow.svg'
import { Button } from 'components/button/button'
import DaysOffService from 'services/daysOffService'
import { useAppSelector } from 'context/hooks'

const dateUtilities = new DateUtilities()
const daysOffService = new DaysOffService()
interface props {
    request: DayOff
    user: User
    changeExpanded: () => void
    updateRequest: () => void
}

export const LineExpanded: FC<props> = (props) => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const dayOffType = useDayOffType(props.request.dayOffTypeId)
    const [loadReject, setLoadReject] = useState(false)
    const [loadAccept, setLoadAccept] = useState(false)

    const accept = () => {
        setLoadAccept(true)

        daysOffService
            .updateRequest(props.request.id, 1)
            .then((res) => props.updateRequest())
            .catch((res) => console.log(res))
            .finally(() => setLoadAccept(false))
    }

    const reject = () => {
        setLoadReject(true)

        daysOffService
            .updateRequest(props.request.id, 2)
            .then((res) => props.updateRequest())
            .catch((res) => console.log(res))
            .finally(() => setLoadReject(false))
    }

    return (
        <div className='expanded line'>
            <div className='line-user' onClick={props.changeExpanded}>
                <p className='user'>{`${props.user.firstName} ${props.user.lastName}`}</p>
                <span>
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
                <p className='title'>{t('MANAGE_PENDINGS_MESSAGE')}</p>
                <p className='message'>{props.request.message}</p>
            </div>
            {[1, 2, 4].includes(user.roleId) &&
                props.user.managerId === user.id && (
                    <div className='container-buttons'>
                        <Button
                            onClick={reject}
                            label={t('MANAGE_REJECT')}
                            style={'delete'}
                            loading={loadReject}
                        />
                        <Button
                            onClick={accept}
                            label={t('MANAGE_ACCEPT')}
                            style={'accept'}
                            loading={loadAccept}
                        />
                    </div>
                )}
        </div>
    )
}
