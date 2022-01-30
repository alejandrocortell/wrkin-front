export interface Settings {
    id: number
    marginHours: number
    allowModifyPunchIn: boolean
    allowInsertPastPunchIn: boolean
    organizationId: number
    createdAt: String
    updatedAt: String
}

export const initialSettings: Settings = {
    id: 0,
    marginHours: 0,
    allowModifyPunchIn: false,
    allowInsertPastPunchIn: false,
    organizationId: 0,
    createdAt: '',
    updatedAt: '',
}
