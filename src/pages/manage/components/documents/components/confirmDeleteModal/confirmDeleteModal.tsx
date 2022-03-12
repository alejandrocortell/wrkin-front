import { Button } from 'components/button/button'
import { t } from 'i18next'
import { DocumentUser } from 'models/documentUser'
import { FC, useState } from 'react'
import DocumentsService from 'services/documentsService'

const documentsService = new DocumentsService()

interface props {
    document: DocumentUser
    deletedDocument: () => void
}

export const ConfirmDeleteModal: FC<props> = (props) => {
    const [loaderButton, setLoaderButton] = useState(false)
    const [errorDelete, setErrorDelete] = useState(false)

    const deleteDocument = () => {
        setErrorDelete(false)
        documentsService
            .deleteDocument(props.document.id)
            .then((res: any) => {
                if (res.status === 200) {
                    props.deletedDocument()
                } else {
                    setErrorDelete(true)
                }
            })
            .catch(() => {
                setErrorDelete(true)
            })
    }

    return (
        <div className='container-delete'>
            <p>{`${t('MANAGE_REMOVE_DOCUMENT_TEXT')} ${
                props.document.name
            }`}</p>
            {errorDelete && <p className='error-message'>{t('ERROR_FORM')}</p>}
            <Button
                onClick={deleteDocument}
                label={t('MANAGE_REMOVE_DOCUMENT')}
                style={'delete'}
                loading={loaderButton}
            />
        </div>
    )
}
