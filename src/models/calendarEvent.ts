export interface CalendarEvent {
    title: string
    type: 'work' | 'sick' | 'bank' | 'holyday'
    start: Date
    end: Date
    allDay?: boolean
    status: number | undefined
}
