import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    logged: false,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state) => {
            state.logged = true
        },
        logout: (state) => {
            state.logged = false
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
