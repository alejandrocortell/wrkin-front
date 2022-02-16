import { FC } from 'react'
import { DocumentUser } from '../../../../models/documentUser'
import { Document } from '../document/document'

interface props {
    documents: Array<DocumentUser>
}

export const DocumentsList: FC<props> = (props) => {
    return (
        <div className='documents-list'>
            {props.documents.map((doc) => {
                return <Document document={doc} key={doc.id} />
            })}
        </div>
    )
}
