import { t } from 'i18next'
import { User } from 'models/user'
import { FC } from 'react'
import { FormCreateUser } from './components/formCreateUser/formCreateUser'

interface props {
    users: Array<User>
}

export const CreateUser: FC<props> = (props) => {
    return (
        <div className='create-user'>
            <h2>{t('MANAGE_CREATE_USER')}</h2>
            <FormCreateUser users={props.users} />
        </div>
    )
}
