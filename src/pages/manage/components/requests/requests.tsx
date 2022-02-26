import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { DayOff } from '../../../../models/dayOff'
import { User } from '../../../../models/user'
import { Pendings } from './components/pendings/pendings'

interface props {
    requests: Array<DayOff>
    users: Array<User>
    updateRequest: () => void
}

export const Requests: FC<props> = (props) => {
    const { t } = useTranslation()

    const filterPendings = () => {
        return props.requests.filter((request) => {
            return request.statusRequestId === 3
        })
    }

    return (
        <div className='requests'>
            <Pendings
                pendings={filterPendings()}
                users={props.users}
                updateRequest={props.updateRequest}
            />
        </div>
    )
}
