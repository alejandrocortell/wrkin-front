import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../../components/button/button'
import Modal from 'react-modal'
import { HeaderModal } from '../../../../../../components/headerModal/headerModal'
import { FormNewPunchIn } from '../formNewPunchIn/formNewPunchIn'

interface props {
    getPunchIns: () => void
}

export const NewPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <div className='new-punch-in'>
            <Button
                onClick={() => setModalIsOpen(true)}
                label={t('HOME_INSERT_PUNCH_IN')}
                style={'secondary'}
            />
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <HeaderModal
                    title={t('HOME_INSERT_PUNCH_IN')}
                    onClose={closeModal}
                />
                <FormNewPunchIn
                    getPunchIns={props.getPunchIns}
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    )
}
