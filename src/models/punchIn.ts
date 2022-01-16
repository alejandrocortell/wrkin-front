export interface PunchIn {
    id: number
    userId: number
    createdAt: Date
    updatedAt: Date
    end: Date
    start: Date
}

export const initialPunchIn: PunchIn = {
    id: 0,
    userId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    end: new Date(),
    start: new Date(),
}
