import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from 'context/hooks'

interface props {
    roles: Array<number>
}

export const RequireAuth: FC<props> = (props) => {
    const location = useLocation()
    const auth = useAppSelector((state) => state.auth)
    const { user } = useAppSelector((state) => state.user)

    if (user.user === '') {
        const route = location.pathname === '/' ? '/' : location.pathname
        const path = route.substring(1)
        return <Navigate to={`/loading/${path.replaceAll('/', '-')}`} />
    } else if (!auth.logged) {
        return <Navigate to='/login' />
    } else if (!props.roles.includes(user.roleId)) {
        return <Navigate to='/' />
    } else {
        return <Outlet />
    }
}
