import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cookie from '../utils/cookies'
import { useAppDispatch } from '../context/hooks'
import { login } from '../context/authSlice'
import { RequireAuth } from '../hooks/requireAuth'
import { FourOFour } from '../pages/404/404'
import { Load } from '../pages/load/load'
import { Home } from '../pages/home/home'
import { Login } from '../pages/login/login'
import { Calendar } from '../pages/calendar/calendar'
import { SelectOrganization } from '../pages/selectOrganization/selectOrganization'
import { Documents } from '../pages/documents/documents'
import { MyAccount } from '../pages/myAccount/myAccount'

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
                <Route path='/calendar' element={<Calendar />} />
                <Route
                    path='/select-organization'
                    element={<SelectOrganization />}
                />
                <Route path='/documents' element={<Documents />} />
                <Route path='/my-account' element={<MyAccount />} />
            </Route>
            <Route path='/loading' element={<Load />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<FourOFour />} />
        </Routes>
    )
}
