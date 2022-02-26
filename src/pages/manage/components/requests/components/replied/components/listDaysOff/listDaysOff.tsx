import { FC, useState } from 'react'
import { DayOff } from '../../../../../../../../models/dayOff'
import { initialUser, User } from '../../../../../../../../models/user'
import { LineContracted } from '../lines/lineContracted'
import { LineExpanded } from '../lines/lineExpanded'

interface props {
    replied: Array<DayOff>
    users: Array<User>
}

export const ListDaysOff: FC<props> = (props) => {
    const [expanded, setExpanded] = useState(0)

    return (
        <div className='list-historic'>
            {props.replied.map((p) => {
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
