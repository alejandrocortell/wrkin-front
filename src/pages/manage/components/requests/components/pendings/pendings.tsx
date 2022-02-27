import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DayOff } from 'models/dayOff'
import { initialUser, User } from 'models/user'
import { LineContracted } from './lineContracted'
import { LineExpanded } from './lineExpanded'

interface props {
    pendings: Array<DayOff>
    users: Array<User>
    updateRequest: () => void
}

export const Pendings: FC<props> = (props) => {
    const { t } = useTranslation()
    const [expanded, setExpanded] = useState(0)

    return (
        <div className='pendings'>
            <h2>{t('MANAGE_PENDINGS')}</h2>
            {props.pendings.map((p) => {
                return expanded === p.id ? (
                    <LineExpanded
                        key={p.id}
                        request={p}
                        user={
                            props.users.find((u) => u.id === p.userId) ||
                            initialUser
                        }
                        changeExpanded={() => setExpanded(0)}
                        updateRequest={props.updateRequest}
                    />
                ) : (
                    <LineContracted
                        key={p.id}
                        request={p}
                        user={
                            props.users.find((u) => u.id === p.userId) ||
                            initialUser
                        }
                        changeExpanded={() => setExpanded(p.id)}
                    />
                )
            })}
        </div>
    )
}
