import { t } from 'i18next'
import { FC } from 'react'
import { FormOrganization } from './components/formOrganization/formOrganization'

interface props {}

export const Organization: FC<props> = (props) => {
    return (
        <div className='create-user'>
            <h2>{t('MANAGE_ORGANIZATION')}</h2>
            <FormOrganization />
        </div>
    )
}
