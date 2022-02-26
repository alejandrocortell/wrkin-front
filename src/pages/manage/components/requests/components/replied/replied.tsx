import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DayOff } from '../../../../../../models/dayOff'
import { initialUser, User } from '../../../../../../models/user'
import { LineContracted } from '../pendings/lineContracted'
import { LineExpanded } from './components/lines/lineExpanded'

interface props {
    pendings: Array<DayOff>
    users: Array<User>
    updateRequest: () => void
}

export const Replied: FC<props> = (props) => {
    const { t } = useTranslation()
    const [expanded, setExpanded] = useState(0)

    return (
        <div className='pendings'>
            <h2>{t('MANAGE_REPLIED')}</h2>
            {props.pendings.map((p) => {
                return expanded === p.id ? (
                    <LineExpanded
                        request={p}
                        user={
                            props.users.find((u) => u.id === p.userId) ||
                            initialUser
                        }
                        changeExpanded={() => setExpanded(0)}
                    />
                ) : (
                    <LineContracted
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
