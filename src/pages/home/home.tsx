import { FC, useEffect, useState } from 'react'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'
import { DayPunchIn } from './components/dayPunchIn/dayPunchIn'
import { HistoricPunchIn } from './components/historicPunchIn/historicPunchIn'
import { useAppSelector } from '../../context/hooks'
import Api from '../../services/api'
import { PunchIn } from '../../models/punchIn'
import moment from 'moment'

const apiManager = new Api()

export const Home: FC = () => {
    const user = useAppSelector((state) => state.user)
    const [punchIns, setPunchIns] = useState<Array<PunchIn>>([])

    useEffect(() => {
        apiManager
            .getUserPunchIns(user.user.id)
            .then((res: any) => {
                console.log(res)
                if (res.status === 200 && res.data.punchIns !== undefined) {
                    const data = res.data.punchIns.map((punchIn: PunchIn) => {
                        return {
                            ...punchIn,
                            createdAt: moment(punchIn.createdAt).toDate(),
                            updatedAt: moment(punchIn.updatedAt).toDate(),
                            end: moment(punchIn.end).toDate(),
                            start: moment(punchIn.start).toDate(),
                        }
                    })
                    setPunchIns(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const punchInsToday = (punchIns: Array<PunchIn>) => {
        const filter = punchIns.filter((p) => {
            const start = moment(p.start)
            return start.isSame(new Date(), 'day') ? true : false
        })
        return filter
    }

    return (
        <Wrapper>
            <section className='home container'>
                <ContainerWhite>
                    <DayPunchIn punchIns={punchInsToday(punchIns)} />
                </ContainerWhite>
                <ContainerWhite>
                    <HistoricPunchIn />
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
