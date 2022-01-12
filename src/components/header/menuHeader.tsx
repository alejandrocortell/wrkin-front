import React, { FC } from 'react'
import { useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import { LinkButton } from '../linkButton/linkButton'
import circle from '../../assets/img/account_circle.svg'
import arrow from '../../assets/img/arrow.svg'

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
                    <div className='dropdown-user'>
                        <img src={circle} alt='User account' />
                        {user.user}
                        <img
                            src={arrow}
                            alt='expand menu'
                            className='arrow-expand'
                        />
                    </div>
                    <ul className='submenu'>
                        <li>
                            <LinkButton label={t('NAV_MY_ACCOUNT')} path={''} />
                        </li>
                        <li>
                            <LinkButton
                                label={t('NAV_LOGOUT')}
                                onClick={() => console.log('logout')}
                            />
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}
function user(user: any) {
    throw new Error('Function not implemented.')
}
