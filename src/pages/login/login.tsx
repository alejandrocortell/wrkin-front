import { FC } from 'react'
import { ColumnLogin } from './components/columnLogin/columnLogin'

export const Login: FC = () => {
    return (
        <section className='login-page'>
            <div className='background'></div>
            <ColumnLogin />
        </section>
    )
}
