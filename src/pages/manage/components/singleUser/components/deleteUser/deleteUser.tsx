import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from 'react-modal'
import { HeaderModal } from 'components/headerModal/headerModal'
import { User } from 'models/user'
import { Button } from 'components/button/button'
import UserService from 'services/userService'
import { useNavigate } from 'react-router'

interface props {
    user: User
    modalIsOpen: boolean
    closeModal: () => void
}

const userService = new UserService()

export const DeleteUser: FC<props> = (props) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [loaderButton, setLoaderButton] = useState(false)
    const [errorDelete, setErrorDelete] = useState(false)

    const deleteUser = () => {
        setLoaderButton(true)
        setErrorDelete(false)
        userService
            .deleteUser(props.user.id)
            .then((res: any) => {
                if (res.status === 200) {
                    navigate('/manage/employees')
                } else {
                    setErrorDelete(true)
                }
            })
            .catch((err) => setErrorDelete(true))
            .finally(() => setLoaderButton(false))
    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={props.modalIsOpen}
            onRequestClose={props.closeModal}
        >
            <HeaderModal
                title={t('MANAGE_REMOVE_USER')}
                onClose={props.closeModal}
            />
            <div className='container-delete'>
                <p>{`${t('MANAGE_REMOVE_USER_TEXT')} ${props.user.firstName} ${
                    props.user.lastName
                }`}</p>
                {errorDelete && (
                    <p className='error-message'>{t('ERROR_FORM')}</p>
                )}
                <Button
                    onClick={deleteUser}
                    label={t('MANAGE_REMOVE_USER')}
                    style={'delete'}
                    loading={loaderButton}
                />
            </div>
        </Modal>
    )
}
