import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Modal from 'react-modal'
import { HeaderModal } from 'components/headerModal/headerModal'
import { User } from 'models/user'
import { Button } from 'components/button/button'
import UserService from 'services/userService'
import { useNavigate } from 'react-router'
import { t } from 'i18next'
import { Dropdown } from 'components/dropdown/dropdown'

interface props {
    user: User
    modalIsOpen: boolean
    closeModal: () => void
    updatedUser: () => void
}

const roles = [
    {
        id: 2,
        value: t('ROLE_MANAGER'),
    },
    {
        id: 3,
        value: t('ROLE_RRHH'),
    },
    {
        id: 4,
        value: t('ROLE_COORDINATOR'),
    },
    {
        id: 5,
        value: t('ROLE_EMPLOYEE'),
    },
]

const userService = new UserService()

export const EditUser: FC<props> = (props) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [loaderButton, setLoaderButton] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [manager, setManager] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        getAllUsers()
    }, [])

    useEffect(() => {
        const roleUser = roles.find((r) => props.user.roleId === r.id)
        if (roleUser) setRole(roleUser.value)
    }, [])

    useEffect(() => {
        const managerUser = users.find(
            (user) => props.user.managerId === user.managerId
        )
        if (managerUser) {
            setManager(`${managerUser.firstName} ${managerUser.lastName}`)
        }
    }, [users])

    const getAllUsers = () => {
        userService
            .getAllUsers()
            .then((res: any) => {
                if (res.status === 200) {
                    setUsers(res.data)
                }
            })
            .catch((err) => console.log(err))
    }

    const saveInfo = () => {
        setLoaderButton(true)
        const roleId = roles.find((r) => r.value === role)
        const managerId = users.find((u) => {
            return `${u.firstName} ${u.lastName}` === manager
        })

        if (roleId === undefined || managerId === undefined) {
            setLoaderButton(false)
            return
        }
        userService
            .updateManagerAndRole(props.user.id, roleId.id, managerId.id)
            .then((res: any) => {
                if (res.status === 201) {
                    props.updatedUser()
                    props.closeModal()
                }
            })
            .catch((err) => console.log(err))
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
            <Dropdown
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setRole(e.target.value)
                }}
                value={role}
                label={t('FORM_ROLE')}
                list={roles.map((role) => {
                    return { value: role.value }
                })}
                error={false}
                errorText={''}
            />
            <Dropdown
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setManager(e.target.value)
                }}
                value={manager}
                label={t('FORM_MANAGER')}
                list={users
                    .filter((u: User) => {
                        return [2, 3, 4].includes(u.roleId)
                    })
                    .map((user) => {
                        return {
                            value: `${user.firstName} ${user.lastName}`,
                        }
                    })}
                error={false}
                errorText={''}
            />
            <Button
                onClick={saveInfo}
                label={t('FORM_SAVE')}
                style={'primary'}
                loading={loaderButton}
            />
        </Modal>
    )
}
