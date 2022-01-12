import React, { FC } from 'react'
import { useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import { LinkButton } from '../linkButton/linkButton'
import circle from '../../assets/img/account_circle.svg'

interface Props {}

export const MenuHeader: FC<Props> = (props) => {
    const { t } = useTranslation()
    const user = useAppSelector((state) => state.user)

    return (
        <nav className='nav-header'>
            <ul>
                <li>
                    <LinkButton label={t('NAV_PUNCHINS')} path={''} />
                </li>
                <li>
                    <LinkButton label={t('NAV_CALENDAR')} path={''} />
                </li>
                <li>
                    <LinkButton label={t('NAV_DOCUMENTS')} path={''} />
                </li>
                <li className='container-user'>
                    <img src={circle} alt='User account' />
                    {user.user}
                </li>
            </ul>
        </nav>
    )
}
function user(user: any) {
    throw new Error('Function not implemented.')
}
