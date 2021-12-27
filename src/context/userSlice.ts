import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialUser } from '../models/user'

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        increment: (state) => {
            state.id += 1
        },
        decrement: (state) => {
            state.id -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.id += action.payload
        },
    },
})

export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer
