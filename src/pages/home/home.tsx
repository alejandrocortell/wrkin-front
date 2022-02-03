import { FC, useEffect, useState } from 'react'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'
import { DayPunchIn } from './components/dayPunchIn/dayPunchIn'
import { HistoricPunchIn } from './components/historicPunchIn/historicPunchIn'
import { useAppSelector } from '../../context/hooks'
import Api from '../../services/api'
import { PunchIn } from '../../models/punchIn'
import DateUtilities from '../../utils/date'

const dateUtilities = new DateUtilities()
const apiManager = new Api()

export const Home: FC = () => {
    const { user } = useAppSelector((state) => state.user)
    const [punchIns, setPunchIns] = useState<Array<PunchIn>>([])
    const [punchInsToday, setPunchInsToday] = useState<Array<PunchIn>>([])

    useEffect(() => {
        getPunchIns()
    }, [])

    useEffect(() => {
        const filter = punchIns.filter((p) => {
            return dateUtilities.isToday(p.start)
        })
        setPunchInsToday(filter)
    }, [punchIns])

    const getPunchIns = () => {
        apiManager
            .getUserPunchIns(user.id)
            .then((res: any) => {
                console.log(res)
                if (res.status === 200 && res.data.punchIns !== undefined) {
                    const data = res.data.punchIns.map((punchIn: PunchIn) => {
                        return {
                            ...punchIn,
                            createdAt: new Date(punchIn.createdAt),
                            updatedAt: new Date(punchIn.updatedAt),
                            end:
                                punchIn.end === null
                                    ? null
                                    : new Date(punchIn.end),
                            start: new Date(punchIn.start),
                        }
                    })
                    setPunchIns(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Wrapper showMenu>
            <section className='home container'>
                <ContainerWhite>
                    <DayPunchIn
                        punchIns={punchInsToday}
                        getPunchIns={getPunchIns}
                    />
                </ContainerWhite>
                <ContainerWhite>
                    <HistoricPunchIn
                        punchIns={punchIns}
                        getPunchIns={getPunchIns}
                    />
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
