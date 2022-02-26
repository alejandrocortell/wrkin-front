import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialUser, User } from 'models/user'

const initialState = {
    user: initialUser,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        changeOrganization: (state, action: PayloadAction<number>) => {
            state.user.currentOrganization = action.payload
        },
        logoutUser: (state) => {
            state.user = initialUser
        },
    },
})

export const { setUser, changeOrganization, logoutUser } = userSlice.actions

export default userSlice.reducer
