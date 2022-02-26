import { FC, useEffect, useState } from 'react'
import DaysOffService from 'services/daysOffService'
import UserService from 'services/userService'
import { Wrapper } from 'components/wrapper/wrapper'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { SelectorManage } from './components/selector/selector'
import { Requests } from './components/requests/requests'
import { DayOff } from 'models/dayOff'
import { User } from 'models/user'

const daysOffService = new DaysOffService()
const userServide = new UserService()

interface props {}

export const ManageRequests: FC<props> = (props) => {
    const [requests, setRequests] = useState<Array<DayOff>>([])
    const [users, setUsers] = useState<Array<User>>([])

    useEffect(() => {
        getAllDaysOff()
        getAllUsers()
    }, [])

    const getAllDaysOff = () => {
        daysOffService
            .getAllDaysOff()
            .then((res: any) => {
                if (res.status === 200) {
                    setRequests(res.data)
                }
            })
            .catch((err) => console.log(err))
    }

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
                    <Requests
                        requests={requests}
                        users={users}
                        updateRequest={getAllDaysOff}
                    />
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
