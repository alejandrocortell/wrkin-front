import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LinkButton } from '../../../../components/linkButton/linkButton'
import { DocumentUser } from '../../../../models/documentUser'

interface props {
    document: DocumentUser
}

export const Document: FC<props> = (props) => {
    return <div className='document'>{props.document.name}</div>
}
