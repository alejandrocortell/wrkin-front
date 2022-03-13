import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'context/hooks'
import { useTranslation } from 'react-i18next'
import { LinkButton } from 'components/linkButton/linkButton'
import { logout } from 'context/authSlice'
import { logoutUser } from 'context/userSlice'
import disableScroll from 'disable-scroll'

interface Props {}

export const MenuHeaderMobile: FC<Props> = (props) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false)

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(logout())
    }

    useEffect(() => {
        hamburgerIsOpen ? disableScroll.on() : disableScroll.off()
    }, [hamburgerIsOpen])

    return (
        <div className='container-nav-mobile'>
            <div
                className={`hamburger ${hamburgerIsOpen && 'open'}`}
                onClick={() => setHamburgerIsOpen(!hamburgerIsOpen)}
            >
                <span className='line-hamburger line1'></span>
                <span className='line-hamburger line2'></span>
            </div>
            <nav className={`menu-header-mobile ${hamburgerIsOpen && 'open'}`}>
                <ul>
                    <li>
                        <LinkButton label={t('NAV_PUNCHINS')} path={'/'} />
                    </li>
                    <li>
                        <LinkButton
                            label={t('NAV_CALENDAR')}
                            path={'/calendar'}
                        />
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
        </div>
    )
}
