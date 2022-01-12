import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialUser, User } from '../models/user'

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id
            state.user = action.payload.user
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.birthday = action.payload.birthday
            state.address = action.payload.address
            state.zipcode = action.payload.zipcode
            state.city = action.payload.city
            state.hoursToWork = action.payload.hoursToWork
            state.createdAt = action.payload.createdAt
            state.updatedAt = action.payload.updatedAt
            state.roleId = action.payload.roleId
            state.managerId = action.payload.managerId
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
