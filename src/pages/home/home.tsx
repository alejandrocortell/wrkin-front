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
                            createdAt: new Date(punchIn.createdAt),
                            updatedAt: new Date(punchIn.updatedAt),
                            end: new Date(punchIn.end),
                            start: new Date(punchIn.start),
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
        return punchIns.filter((p) => {
            return dateUtilities.isToday(p.start)
        })
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
