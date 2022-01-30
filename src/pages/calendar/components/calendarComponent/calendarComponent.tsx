import { FC, useEffect, useState } from 'react'

interface props {
    year: number
    month: number
}

export const CalendarComponent: FC<props> = (props) => {
    const [year, setYear] = useState(props.year)
    const [month, setMonth] = useState(props.month)

    const date = new Date(year, month - 1, 1, 0, 0, 0, 0)
    const firstDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
    ).getDay()
    const daysInMonth = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate()

    const days = [
        ...Array(firstDayOfMonth).fill(null),
        ...[...Array(daysInMonth).keys()].map((e, i) => ({ day: i + 1 })),
    ]
    const events = [
        {
            title: 'This here is the first event of the month',
            date: {
                datetime: 'UTC DATE STRING',
                month: 1,
                day: 15,
            },
        },
        {
            title: "Here's one for February",
            date: {
                datetime: 'UTC DATE STRING',
                month: 2,
                day: 8,
            },
        },
        {
            title: 'A new event',
            date: {
                datetime: 'UTC DATE STRING',
                month: 1,
                day: 31,
            },
        },
        {
            title: 'Another event',
            date: {
                datetime: 'UTC DATE STRING',
                month: 1,
                day: 31,
            },
        },
    ]

    for (let i = 0; i < events.length; i++) {
        const event = events[i]
        const eventDay = days[event.date.day + firstDayOfMonth - 1]
        console.log(event.date.month, month)
        if (event.date.month !== month) {
            continue
        }

        if (!Array.isArray(eventDay.events)) {
            eventDay.events = []
        }

        eventDay.events.push(event)
    }

    console.log(days)

    return (
        <>
            <button onClick={() => setMonth(month - 1)}>‹‹</button>
            <button onClick={() => setMonth(month + 1)}>››</button>
            <div className='calendar-component'>
                <div className='calendar-component__header'>
                    <div>Sunday</div>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                    <div>Saturday</div>
                </div>
                <div className='calendar-component__body'>
                    {days.map((day, i) => {
                        const events =
                            day && day.events
                                ? day.events.map((e: any) => (
                                      <div className='event'>{e.title}</div>
                                  ))
                                : null

                        return (
                            <div>
                                {day ? day.day : ''}
                                {events}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
