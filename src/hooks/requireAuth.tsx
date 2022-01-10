import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../context/hooks'

export const RequireAuth = () => {
    const auth = useAppSelector((state) => state.auth)
    let location = useLocation()

    if (!auth.logged) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    return <Outlet />
}
