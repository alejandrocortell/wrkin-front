import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cookie from '../utils/cookies'
import { useAppDispatch } from '../context/hooks'
import { login } from '../context/authSlice'
import { RequireAuth } from '../hooks/requireAuth'
import { FourOFour } from '../pages/404/404'
import { Home } from '../pages/home/home'
import { Login } from '../pages/login/login'

const cookie = new Cookie()

export const App: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = cookie.getCookie('token')
        if (token) {
            dispatch(login(token))
        }
    }, [])

    return (
        <Routes>
            <Route element={<RequireAuth />}>
                <Route path='/' element={<Home />} />
                {/* <Route path='/dashboard' element={<Dashboard />} /> */}
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<FourOFour />} />
        </Routes>
    )
}
