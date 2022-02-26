import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from 'context/hooks'
import { ColumnLogin } from './components/columnLogin/columnLogin'

export const Login: FC = () => {
    const auth = useAppSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.logged) {
            navigate('/loading')
        }
    }, [auth])

    return (
        <section className='login-page'>
            <div className='background'></div>
            <ColumnLogin />
        </section>
    )
}
