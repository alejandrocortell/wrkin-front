import { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Cookie from 'utils/cookies'
import { useAppDispatch } from 'context/hooks'
import { login } from 'context/authSlice'
import { RequireAuth } from 'hooks/requireAuth'
import { FourOFour } from 'pages/404/404'
import { Load } from 'pages/load/load'
import { Home } from 'pages/home/home'
import { Login } from 'pages/login/login'
import { Calendar } from 'pages/calendar/calendar'
import { Documents } from 'pages/documents/documents'
import { MyAccount } from 'pages/myAccount/myAccount'
import { ManageUsers } from 'pages/manage/manageUsers'
import { ManageRequests } from 'pages/manage/manageRequests'
import { ManageSingleUser } from 'pages/manage/manageSingleUser'
import { ManageCreateUser } from 'pages/manage/manageCreateUser'
import { ManageDocuments } from 'pages/manage/manageDocuments'
import i18next from 'i18next'

const cookie = new Cookie()

export const App: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const token = cookie.getCookie('token')
        const remember = cookie.getCookie('remember')
        const language = cookie.getCookie('language')

        if (token) {
            dispatch(
                login({
                    token: token,
                    remember: remember === 'true' ? true : false,
                })
            )
        }

        if (language) {
            i18next.changeLanguage(language)
            cookie.setCookie('language', language, 2700)
        }
    }, [])

    return (
        <Routes>
            <Route element={<RequireAuth roles={[5, 4, 3, 2, 1]} />}>
                <Route path='/' element={<Home />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/documents' element={<Documents />} />
                <Route path='/my-account' element={<MyAccount />} />
            </Route>
            <Route element={<RequireAuth roles={[1, 2, 3, 4]} />}>
                <Route path='/manage/employees' element={<ManageUsers />} />
                <Route path='/manage/request' element={<ManageRequests />} />
                <Route path='/manage/documents' element={<ManageDocuments />} />
                <Route
                    path='/manage/employees/:idUser'
                    element={<ManageSingleUser />}
                />
            </Route>
            <Route element={<RequireAuth roles={[1, 2, 3]} />}>
                <Route
                    path='/manage/create-user'
                    element={<ManageCreateUser />}
                />
            </Route>
            <Route path='/loading' element={<Load />} />
            <Route path='/loading/:route' element={<Load />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<FourOFour />} />
        </Routes>
    )
}
