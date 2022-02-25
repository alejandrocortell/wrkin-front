import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { DayOff } from '../../../../../../models/dayOff'
import { User } from '../../../../../../models/user'
import DateUtilities from '../../../../../../utils/date'

const dateUtilities = new DateUtilities()

interface props {
    request: DayOff
    user: User
    changeExpanded: () => void
}

export const LineExpanded: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <div className='expanded line' onClick={props.changeExpanded}>
            <p className='user'>{`${props.user.firstName} ${props.user.lastName}`}</p>
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
            <div>
                <p className='title'>{t('MANAGE_PENDINGS_MESSAGE')}</p>
                <p className='message'>{props.request.message}</p>
            </div>
        </div>
    )
}
