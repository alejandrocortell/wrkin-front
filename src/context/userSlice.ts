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
        logoutUser: (state) => {
            state.user = initialUser
        },
    },
})

export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer
