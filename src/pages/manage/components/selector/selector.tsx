import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { Button } from '../../../../components/button/button'
import { LinkButton } from '../../../../components/linkButton/linkButton'
import { DocumentType } from './../../../../models/documentType'

interface props {}

export const SelectorManage: FC<props> = (props) => {
    const location = useLocation()
    const { t } = useTranslation()

    return (
        <div className='selector-documents'>
            <div
                className={`container-link ${
                    location.pathname === '/manage/request' && 'selected'
                }`}
            >
                <LinkButton
                    label={t('MANAGE_REQUESTS')}
                    path={'/manage/request'}
                />
            </div>
            <div
                className={`container-link ${
                    location.pathname === '/manage/employees' && 'selected'
                }`}
            >
                <LinkButton
                    label={t('MANAGE_EMPLOYEES')}
                    path={'/manage/employees'}
                />
            </div>
        </div>
    )
}
