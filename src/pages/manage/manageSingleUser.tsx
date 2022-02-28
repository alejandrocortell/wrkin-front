import { FC, useEffect, useState } from 'react'
import { Wrapper } from 'components/wrapper/wrapper'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { SelectorManage } from './components/selector/selector'
import { User } from 'models/user'
import UserService from 'services/userService'
import { DayOff } from 'models/dayOff'
import { useParams } from 'react-router-dom'
import { PunchIn } from 'models/punchIn'

const userService = new UserService()

interface props {}

export const ManageSingleUser: FC<props> = (props) => {
    const { idUser } = useParams()
    const [user, setUser] = useState<User>()
    const [punchIns, setPunchIns] = useState<Array<PunchIn>>([])
    const [daysOff, setDaysOff] = useState<Array<DayOff>>([])

    useEffect(() => {
        if (idUser) {
            getUser(parseInt(idUser))
            getUserPunchInById(parseInt(idUser))
            getDaysOff(parseInt(idUser))
        }
    }, [])

    const getUser = (id: number) => {
        userService
            .getUserById(id)
            .then((res: any) => {
                if (res.status === 200) {
                    setUser(res.data.user)
                }
            })
            .catch((err) => console.log(err))
    }

    const getUserPunchInById = (id: number) => {
        userService
            .getUserPunchInById(id)
            .then((res: any) => {
                if (res.status === 200) {
                    setPunchIns(res.data.punchIns)
                }
            })
            .catch((err) => console.log(err))
    }

    const getDaysOff = (id: number) => {
        userService
            .getUserDaysOffById(id)
            .then((res: any) => {
                if (res.status === 200) {
                    setDaysOff(res.data.daysOff)
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
                    <>{idUser}</>
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
