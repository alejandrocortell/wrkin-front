import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Logo } from 'components/logo/logo'
import { FormLogin } from '../formLogin/formLogin'

export const ColumnLogin: FC = () => {
    const { t } = useTranslation()

    return (
        <div className='column-login'>
            <div className='container-column'>
                <div className='container-logo'>
                    <Logo />
                </div>
                <FormLogin />
            </div>
            <div className='container-links'>Liinks</div>
        </div>
    )
}
