import { FC, useEffect, useState } from 'react'
import Api from '../../services/api'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'
import { SelectorManage } from './components/selector/selector'
import { Requests } from './components/requests/requests'
import { DayOff } from '../../models/dayOff'
import { User } from '../../models/user'

const apiManager = new Api()

interface props {}

export const ManageRequests: FC<props> = (props) => {
    const [requests, setRequests] = useState<Array<DayOff>>([])
    const [users, setUsers] = useState<Array<User>>([])

    useEffect(() => {
        apiManager
            .getAllDaysOff()
            .then((res: any) => {
                if (res.status === 200) {
                    setRequests(res.data)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        apiManager
            .getAllUsers()
            .then((res: any) => {
                if (res.status === 200) {
                    setUsers(res.data)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <Wrapper showMenu>
            <section className='manage container'>
                <ContainerWhite>
                    <SelectorManage />
                </ContainerWhite>
                <ContainerWhite>
                    <Requests requests={requests} users={users} />
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
