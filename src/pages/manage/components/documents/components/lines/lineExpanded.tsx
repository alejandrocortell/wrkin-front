import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'models/user'
import DateUtilities from 'utils/date'
import arrow from 'assets/img/arrow.svg'
import { DocumentUser } from 'models/documentUser'
import { useDocumentType } from 'hooks/useDocumentType'
import { Button } from 'components/button/button'
import Modal from 'react-modal'
import { HeaderModal } from 'components/headerModal/headerModal'
import { ConfirmDeleteModal } from '../confirmDeleteModal/confirmDeleteModal'

const dateUtilities = new DateUtilities()
interface props {
    document: DocumentUser
    user: User
    changeExpanded: () => void
    getDocuments: () => void
}

export const LineExpanded: FC<props> = (props) => {
    const { t } = useTranslation()
    const documentType = useDocumentType(props.document.documentTypeId)
    const [modalDelteIsOpen, setModalDelteIsOpen] = useState(false)

    return (
        <div className='expanded line'>
            <Modal
                ariaHideApp={false}
                isOpen={modalDelteIsOpen}
                onRequestClose={() => setModalDelteIsOpen(false)}
            >
                <HeaderModal
                    title={t('MANAGE_REMOVE_DOCUMENT')}
                    onClose={() => setModalDelteIsOpen(false)}
                />
                <ConfirmDeleteModal
                    document={props.document}
                    deletedDocument={props.getDocuments}
                />
            </Modal>
            <div className='line-user'>
                <p className='user'>{props.document.name}</p>
                <span onClick={props.changeExpanded}>
                    <img src={arrow} alt='Contract line' />
                </span>
            </div>
            <div>
                <p className='title'>{t('FORM_USER')}</p>
                {props.user.id === 0 ? (
                    <p className='message'>{t('MANAGE_ALL_USERS')}</p>
                ) : (
                    <p className='message'>{`${props.user.firstName} ${props.user.lastName}`}</p>
                )}
            </div>
            <div>
                <p className='title'>{t('MANAGE_TYPE_DOCUMENT')}</p>
                <p className='message'>{documentType}</p>
            </div>
            <div>
                <p className='title'>{t('COMMON_DATE_CREATED')}</p>
                <p className='message'>
                    {dateUtilities.format(
                        new Date(props.document.createdAt),
                        'DD-MM-YYYY HH:mm'
                    )}
                </p>
            </div>
            <div className='container-buttons'>
                <Button
                    onClick={() => setModalDelteIsOpen(true)}
                    label={t('MANAGE_REMOVE_DOCUMENT')}
                    style={'delete'}
                />
            </div>
        </div>
    )
}
