import { FC, useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import { localizer } from '../../../../utils/dayjsLocalizer '
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from '../../../../models/calendarEvent'
import 'dayjs/locale/es'
import i18next from 'i18next'
import RBCToolbar from './customToolbar'
interface props {
    punchIns: Array<CalendarEvent>
    daysOff: Array<CalendarEvent>
}

export const CalendarComponent: FC<props> = (props) => {
    const [events, setEvents] = useState<Array<CalendarEvent>>([])

    useEffect(() => {
        const insert = [...props.punchIns, ...props.daysOff]
        setEvents(insert)
    }, [props.punchIns, props.daysOff])

    const messages = {
        allDay: 'Dia Inteiro',
        previous: '<',
        next: '>',
        today: 'Hoy',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        agenda: 'Agenda',
        date: 'Data',
        time: 'Hora',
        event: 'Evento',
    }

    const doRequest = () => {
        console.log('aaa')
    }

    return (
        <>
            <Calendar
                localizer={localizer}
                messages={messages}
                culture={i18next.language}
                events={events}
                startAccessor='start'
                style={{ height: 500 }}
                views={['month']}
                selectable={false}
                eventPropGetter={(event) => ({
                    className: 'category-' + event.type,
                })}
                components={{
                    toolbar: (props) => (
                        <RBCToolbar {...props} doRequest={doRequest} />
                    ),
                }}
            />
        </>
    )
}
