import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../context/hooks'
import ProtectedRoute, { ProtectedRouteProps } from '../hooks/requireAuth'
import { FourOFour } from '../pages/404/404'
import { Home } from '../pages/home/home'
import { Login } from '../pages/login/login'

export const App: FC = () => {
    const auth = useAppSelector((state) => state.auth)

    const defaultProtectedRouteProps: ProtectedRouteProps = {
        isAuthenticated: auth.logged,
        authenticationPath: '/login',
    }

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <ProtectedRoute {...defaultProtectedRouteProps} path='/'>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<FourOFour />} />
        </Routes>
    )
}
