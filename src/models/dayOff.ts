export interface DayOff {
    id: number
    message: string
    start: Date
    end: Date
    createdAt: Date
    updatedAt: Date
    dayOffTypeId: number
    userId: number
    statusRequestId: number
    organizationId: number
}
