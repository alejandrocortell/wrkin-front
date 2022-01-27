import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import authReducer from './authSlice'
import organizationReducer from './organizationSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        organization: organizationReducer,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
