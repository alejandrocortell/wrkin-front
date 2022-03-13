import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'context/hooks'
import { useTranslation } from 'react-i18next'
import { LinkButton } from 'components/linkButton/linkButton'
import circle from 'assets/img/account_circle.svg'
import arrow from 'assets/img/arrow.svg'
import { logout } from 'context/authSlice'
import { logoutUser } from 'context/userSlice'

interface Props {}

export const MenuHeaderMobile: FC<Props> = (props) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(logout())
    }

    return (
        <nav className='menu-header-mobile'>
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
                {[1, 2, 3, 4].includes(user.roleId) && (
                    <li>
                        <LinkButton
                            label={t('NAV_MANAGE_ORG')}
                            path={'/manage/request'}
                        />
                    </li>
                )}
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
        </nav>
    )
}
