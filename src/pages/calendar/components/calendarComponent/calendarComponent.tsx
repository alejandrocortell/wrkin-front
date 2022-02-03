import dayjs from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { localizer } from '../../../../utils/dayjsLocalizer '
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { calendarEvent } from '../../../../models/calendarEvent'
interface props {
    events: Array<calendarEvent>
}

const myEventsList = [
    {
        title: 'titleee',
        // start: new Date(2022, 1, 25, 10, 0),
        // end: new Date(2022, 1, 25, 10, 0),
        allDay: true,
        // resource?: any,
    },
]
export const CalendarComponent: FC<props> = (props) => {
    return (
        <>
            <Calendar
                localizer={localizer}
                events={props.events}
                startAccessor='start'
                // endAccessor='end'
                style={{ height: 500 }}
                views={['month']}
            />
        </>
    )
}
