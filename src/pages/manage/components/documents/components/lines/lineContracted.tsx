import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'models/user'
import arrow from 'assets/img/arrow.svg'
import { DocumentUser } from 'models/documentUser'

interface props {
    document: DocumentUser
    user: User
    changeExpanded: () => void
}

export const LineContracted: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <div className='contracted line' onClick={props.changeExpanded}>
            <div className='line-user'>
                <p className='user'>{props.document.name}</p>
                <span>
                    <img src={arrow} alt='Expand line' />
                </span>
            </div>
        </div>
    )
}
