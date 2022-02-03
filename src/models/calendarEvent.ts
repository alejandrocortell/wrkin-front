export interface calendarEvent {
    title: string
    type: 'work' | 'sick' | 'bank' | 'holyday'
    start: Date
    end: Date
    allDay?: boolean
}
