import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from 'react-modal'
import { HeaderModal } from '../../../../../../components/headerModal/headerModal'
import { PunchIn } from '../../../../../../models/punchIn'
import { LinePunchInModify } from './linePunchInModify'
import { FormModifyPunchIn } from './formModifyPunchIn'

interface props {
    punchIns: Array<PunchIn>
    modalIsOpen: boolean
    closeModal: () => void
    getPunchIns: () => void
}

export const ModifyPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()

    const [fieldsDisabled, setFieldsDisabled] = useState(true)
    const [selectedPunchIn, setSelectedPunchIn] = useState<PunchIn>()

    useEffect(() => {
        selectedPunchIn && setFieldsDisabled(false)
    }, [selectedPunchIn])

    return (
        <Modal
            ariaHideApp={false}
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
        >
            <HeaderModal
                title={t('HOME_MODIFY_PUNCH_IN')}
                onClose={props.closeModal}
            />
            <div className='list-modify-punch-in'>
                {props.punchIns.map((p) => {
                    return (
                        <LinePunchInModify
                            punchIn={p}
                            selectPunchIn={() => setSelectedPunchIn(p)}
                            selectedPunchIn={selectedPunchIn}
                        />
                    )
                })}
            </div>
            {selectedPunchIn && (
                <FormModifyPunchIn
                    punchIn={selectedPunchIn}
                    disabledFields={fieldsDisabled}
                    getPunchIns={props.getPunchIns}
                    closeModal={props.closeModal}
                />
            )}
        </Modal>
    )
}
