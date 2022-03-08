import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { LinkButton } from 'components/linkButton/linkButton'

interface props {}

export const SelectorManage: FC<props> = (props) => {
    const location = useLocation()
    const { t } = useTranslation()

    return (
        <ul className='selector-documents'>
            <li
                className={`container-link ${
                    location.pathname === '/manage/request' && 'selected'
                }`}
            >
                <LinkButton
                    label={t('MANAGE_REQUESTS')}
                    path={'/manage/request'}
                />
            </li>
            <li
                className={`container-link ${
                    location.pathname === '/manage/documents' && 'selected'
                }`}
            >
                <LinkButton
                    label={t('MANAGE_DOCUMENTS')}
                    path={'/manage/documents'}
                />
            </li>
            <li
                className={`container-link ${
                    location.pathname === '/manage/employees' && 'selected'
                }`}
            >
                <LinkButton
                    label={t('MANAGE_EMPLOYEES')}
                    path={'/manage/employees'}
                />
            </li>
            <li
                className={`container-link ${
                    location.pathname === '/manage/create-user' && 'selected'
                }`}
            >
                <LinkButton
                    label={t('MANAGE_CREATE_USER')}
                    path={'/manage/create-user'}
                />
            </li>
        </ul>
    )
}
