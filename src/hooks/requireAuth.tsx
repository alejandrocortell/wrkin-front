import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../context/hooks'

export const RequireAuth = () => {
    const auth = useAppSelector((state) => state.auth)
    const { user } = useAppSelector((state) => state.user)

    if (!auth.logged) {
        return <Navigate to='/login' />
    } else if (user.user === '') {
        return <Navigate to='/loading' />
    } else {
        return <Outlet />
    }
}
