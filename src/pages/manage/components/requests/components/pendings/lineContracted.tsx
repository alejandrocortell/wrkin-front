import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { DayOff } from '../../../../../../models/dayOff'
import { User } from '../../../../../../models/user'

interface props {
    request: DayOff
    user: User
    changeExpanded: () => void
}

export const LineContracted: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <div className='contracted line' onClick={props.changeExpanded}>
            <p className='user'>{`${props.user.firstName} ${props.user.lastName}`}</p>
        </div>
    )
}
