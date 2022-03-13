import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookie from 'utils/cookies'

const cookie = new Cookie()

const initialState = {
    logged: false,
    token: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<{ token: string; remember: boolean }>
        ) => {
            const timeRemember = action.payload.remember ? 2700 : 1
            cookie.setCookie('token', action.payload.token, timeRemember)
            cookie.setCookie(
                'remember',
                action.payload.remember ? 'true' : 'false',
                2700
            )
            state.logged = true
            state.token = action.payload.token
        },
        logout: (state) => {
            cookie.deleteCookie('token')
            cookie.deleteCookie('remember')
            cookie.deleteCookie('language')
            state.logged = false
            state.token = ''
        },
    },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
