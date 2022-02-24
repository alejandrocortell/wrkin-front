import { FC } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../context/hooks'

interface props {
    roles: Array<number>
}

export const RequireAuth: FC<props> = (props) => {
    const auth = useAppSelector((state) => state.auth)
    const { user } = useAppSelector((state) => state.user)

    if (!auth.logged) {
        return <Navigate to='/login' />
    } else if (user.user === '') {
        return <Navigate to='/loading' />
    } else if (!props.roles.includes(user.roleId)) {
        return <Navigate to='/' />
    } else {
        return <Outlet />
    }
}
