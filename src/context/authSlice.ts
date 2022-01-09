import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookie from '../utils/cookies'

const cookie = new Cookie()

const initialState = {
    logged: false,
    token: '',
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            cookie.setCookie('token', action.payload, 30)
            state.logged = true
            state.token = action.payload
        },
        logout: (state) => {
            state.logged = false
            state.token = ''
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
