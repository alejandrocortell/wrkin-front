import { FC, useEffect, useState } from 'react'
import { Wrapper } from 'components/wrapper/wrapper'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { SelectorManage } from './components/selector/selector'
import { Users } from './components/users/users'
import { User } from 'models/user'
import UserService from 'services/userService'
import DaysOffService from 'services/daysOffService'
import { DayOff } from 'models/dayOff'
import { PaginatedUsers } from './components/users/components/paginatedUsers/paginatedUsers'

const daysOffService = new DaysOffService()
const userServide = new UserService()

interface props {}

export const ManageUsers: FC<props> = (props) => {
    const [users, setUsers] = useState<Array<User>>([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = () => {
        userServide
            .getAllUsers()
            .then((res: any) => {
                if (res.status === 200) {
                    setUsers(res.data)
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <Wrapper showMenu>
            <section className='manage container'>
                <ContainerWhite>
                    <SelectorManage />
                </ContainerWhite>
                <ContainerWhite>
                    <PaginatedUsers users={users} itemsPerPage={10} />
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
