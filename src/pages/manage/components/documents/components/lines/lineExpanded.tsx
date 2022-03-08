import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDayOffType } from 'hooks/useDayOffType'
import { DayOff } from 'models/dayOff'
import { User } from 'models/user'
import DateUtilities from 'utils/date'
import arrow from 'assets/img/arrow.svg'
import { useStatusRequest } from 'hooks/useStatusRequest'
import { DocumentUser } from 'models/documentUser'

const dateUtilities = new DateUtilities()
interface props {
    document: DocumentUser
    user: User
    changeExpanded: () => void
}

export const LineExpanded: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <div className='expanded line'>
            <div className='line-user'>
                <p className='user'>{`${props.user.firstName} ${props.user.lastName}`}</p>
                <span onClick={props.changeExpanded}>
                    <img src={arrow} alt='Contract line' />
                </span>
            </div>
            Expandeed
        </div>
    )
}
