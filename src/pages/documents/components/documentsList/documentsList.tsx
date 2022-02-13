import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LinkButton } from '../../../../components/linkButton/linkButton'
import { DocumentUser } from '../../../../models/documentUser'

interface props {
    documents: Array<DocumentUser>
}

export const DocumentsList: FC<props> = (props) => {
    return (
        <div className='selector-documents'>
            {props.documents.map((doc) => {
                return <div className={''}>{doc.name}</div>
            })}
        </div>
    )
}
