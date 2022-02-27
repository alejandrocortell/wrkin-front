import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'models/user'
import arrow from 'assets/img/arrow.svg'
import { LinkButton } from 'components/linkButton/linkButton'

interface props {
    user: User
    handleUser: () => void
}

export const LineUser: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <div className='contracted line' onClick={props.handleUser}>
            <div className='line-user'>
                <p className='user'>{`${props.user.firstName} ${props.user.lastName}`}</p>
                <LinkButton label={t('MANAGE_VIEW_USER')} />
            </div>
        </div>
    )
}
