import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import { LinkButton } from '../linkButton/linkButton'
import circle from '../../assets/img/account_circle.svg'
import arrow from '../../assets/img/arrow.svg'
import { logout } from '../../context/authSlice'
import { logoutUser } from '../../context/userSlice'

interface Props {}

export const MenuHeader: FC<Props> = (props) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)
    const [visibleSubMenu, setVisibleSubMenu] = useState(false)

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(logout())
    }

    return (
        <nav className='nav-header'>
            <ul>
                <li>
                    <LinkButton label={t('NAV_PUNCHINS')} path={'/'} />
                </li>
                <li>
                    <LinkButton label={t('NAV_CALENDAR')} path={'/calendar'} />
                </li>
                <li>
                    <LinkButton
                        label={t('NAV_DOCUMENTS')}
                        path={'/documents'}
                    />
                </li>
                {user.roleId === 4 && (
                    <li>
                        <LinkButton
                            label={t('NAV_MANAGE_ORG')}
                            path={'/manage/request'}
                        />
                    </li>
                )}
                <li
                    className={`container-user ${visibleSubMenu && 'visible'}`}
                    onMouseEnter={() => setVisibleSubMenu(true)}
                    onMouseLeave={() => setVisibleSubMenu(false)}
                    onClick={() => setVisibleSubMenu(!visibleSubMenu)}
                >
                    <div className='dropdown-user'>
                        <img src={circle} alt='User account' />
                        {user.user}
                        <img
                            src={arrow}
                            alt='expand menu'
                            className='arrow-expand'
                        />
                    </div>
                    <div className={'submenu'}>
                        <ul>
                            <li>
                                <LinkButton
                                    label={t('NAV_MY_ACCOUNT')}
                                    path={'/my-account'}
                                />
                            </li>
                            <li>
                                <LinkButton
                                    label={t('NAV_LOGOUT')}
                                    onClick={handleLogout}
                                />
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    )
}
