import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DocumentType } from '../models/documentType'
import { initialOrganization, Organization } from '../models/organization'
import { initialSettings, Settings } from '../models/settings'
import { DayOffType } from '../models/typeDayOff'

const initialState = {
    organization: initialOrganization,
    settings: initialSettings,
    dayOffTypes: [] as Array<DayOffType>,
    documentsTypes: [] as Array<DocumentType>,
}

export const organizationSlice = createSlice({
    name: 'organization',
    initialState: initialState,
    reducers: {
        setOrganization: (state, action: PayloadAction<Organization>) => {
            state.organization = action.payload
        },
        setSettings: (state, action: PayloadAction<Settings>) => {
            state.settings = action.payload
        },
        setTypesDayOff: (state, action: PayloadAction<Array<DayOffType>>) => {
            state.dayOffTypes = action.payload
        },
        setDocumentTypes: (
            state,
            action: PayloadAction<Array<DocumentType>>
        ) => {
            state.documentsTypes = action.payload
        },
    },
})

export const {
    setOrganization,
    setSettings,
    setTypesDayOff,
    setDocumentTypes,
} = organizationSlice.actions

export default organizationSlice.reducer
