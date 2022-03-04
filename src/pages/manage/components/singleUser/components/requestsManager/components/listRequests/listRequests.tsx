import { DayOff } from 'models/dayOff'
import { FC } from 'react'
import { LineRequest } from '../lineRequest/lineRequest'

interface props {
    daysOff: Array<DayOff>
}

export const ListRequests: FC<props> = (props) => {
    return (
        <div className='list-day-off'>
            {props.daysOff.map((d) => {
                return <LineRequest dayOff={d} />
            })}
        </div>
    )
}
