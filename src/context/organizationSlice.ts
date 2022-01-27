import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialOrganization, Organization } from '../models/organization'
import { initialSettings, Settings } from '../models/settings'

const initialState = {
    organization: initialOrganization,
    settings: initialSettings,
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
    },
})

export const { setOrganization, setSettings } = organizationSlice.actions

export default organizationSlice.reducer
