import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../../components/button/button'
import DateUtilities from '../../../../../../utils/date'
import Modal from 'react-modal'
import { HeaderModal } from '../../../../../../components/headerModal/headerModal'
import { InputField } from '../../../../../../components/input/input'
import { FormNewPunchIn } from '../formNewPunchIn/formNewPunchIn'

const dateUtilities = new DateUtilities()

interface props {}

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
                <FormNewPunchIn />
            </Modal>
        </div>
    )
}
