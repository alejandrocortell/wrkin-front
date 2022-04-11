import { FC, useEffect, useState } from 'react'
import { User } from 'models/user'
import { useTranslation } from 'react-i18next'
import DateUtilities from 'utils/date'
import UserService from 'services/userService'
import { useRoleType } from 'hooks/useRoleType'
import accountImg from 'assets/img/person.svg'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { Button } from 'components/button/button'
import { DeleteUser } from '../deleteUser/deleteUser'
import { EditUser } from '../editUser/editUser'

const dateUtilities = new DateUtilities()
const userService = new UserService()

interface props {
    user: User
    updatedUser: () => void
}

export const InfoUser: FC<props> = (props) => {
    const { t } = useTranslation()
    const role = useRoleType(props.user.roleId)
    const [manager, setManager] = useState('')
    const [avatar, setAvatar] = useState('')
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
    const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)

    useEffect(() => {
        userService
            .getUserById(props.user.managerId)
            .then((res: any) =>
                setManager(
                    `${res.data.user.firstName} ${res.data.user.lastName}`
                )
            )
            .catch((res) => console.log(res))

        if (props.user.avatar !== null) {
            userService.getAvatar(props.user.avatar).then((res: any) => {
                setAvatar(res.request.responseURL)
            })
        }
    }, [props.user])

    return (
        <div className='info-user'>
            {modalDeleteIsOpen && (
                <DeleteUser
                    user={props.user}
                    modalIsOpen={modalDeleteIsOpen}
                    closeModal={() => setModalDeleteIsOpen(!modalDeleteIsOpen)}
                />
            )}
            {modalEditIsOpen && (
                <EditUser
                    user={props.user}
                    modalIsOpen={modalEditIsOpen}
                    closeModal={() => setModalEditIsOpen(!modalEditIsOpen)}
                    updatedUser={props.updatedUser}
                />
            )}
            <ContainerWhite>
                <div className='container-info-user'>
                    <div className='column-avatar'>
                        {avatar === '' ? (
                            <img src={accountImg} className='non-avatar' />
                        ) : (
                            <img src={avatar} className='avatar' />
                        )}
                    </div>
                    <div className='column-info'>
                        <h2>{t('MANAGE_USER_INFO')}</h2>
                        <p>
                            <span className='title'>{t('FORM_USER')}: </span>
                            {props.user.user}
                        </p>
                        <p>
                            <span className='title'>{t('FORM_NAME')}: </span>
                            {`${props.user.firstName} ${props.user.lastName}`}
                        </p>
                        <p>
                            <span className='title'>
                                {t('FORM_BIRTHDAY')}:{' '}
                            </span>
                            {dateUtilities.format(
                                new Date(props.user.birthday),
                                'DD-MM-YYYY'
                            )}
                        </p>
                        <p>
                            <span className='title'>{t('FORM_ADDRESS')}: </span>
                            {`${props.user.address}, ${props.user.zipcode}, ${props.user.city}`}
                        </p>
                        <p>
                            <span className='title'>{t('FORM_ROLE')}: </span>
                            {role}
                        </p>
                        <p>
                            <span className='title'>{t('FORM_MANAGER')}: </span>
                            {manager}
                        </p>
                        <div className='container-buttons'>
                            <Button
                                onClick={() =>
                                    setModalEditIsOpen(!modalEditIsOpen)
                                }
                                label={t('COMMON_EDIT')}
                                style={'secondary'}
                            />
                            <Button
                                onClick={() =>
                                    setModalDeleteIsOpen(!modalDeleteIsOpen)
                                }
                                label={t('MANAGE_REMOVE_USER')}
                                style={'secondary'}
                            />
                        </div>
                    </div>
                </div>
            </ContainerWhite>
        </div>
    )
}
