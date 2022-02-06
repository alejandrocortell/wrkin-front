import { FC, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import { Wrapper } from '../../components/wrapper/wrapper'
import { CalendarComponent } from './components/calendarComponent/calendarComponent'
import Api from '../../services/api'
import { PunchIn } from '../../models/punchIn'
import { CalendarEvent } from '../../models/calendarEvent'
import DateUtilities from '../../utils/date'
import { DayOff } from '../../models/dayOff'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'

const apiManager = new Api()
const dateUtilities = new DateUtilities()

interface InterfacePunchInsNotToday {
    start: Date
    end: Date
    punchIns: Array<PunchIn>
}

export const Calendar: FC = () => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const [punchIns, setPunchIns] = useState<Array<CalendarEvent>>([])
    const [daysOff, setDaysOff] = useState<Array<CalendarEvent>>([])

    useEffect(() => {
        getPunchIns()
        getDaysOff()
    }, [])

    const getPunchIns = async () => {
        apiManager
            .getUserPunchIns(user.id)
            .then((res: any) => {
                if (res.status === 200 && res.data.punchIns !== undefined) {
                    const groupedByDay = groupPunchIns(res.data.punchIns)
                    const sorted = groupedByDay.map(
                        (p: InterfacePunchInsNotToday) => {
                            return {
                                start: p.start,
                                end: p.end,
                                milliseconds: totalDay(p.punchIns),
                            }
                        }
                    )

                    const data: Array<CalendarEvent> = sorted.map((p: any) => {
                        return {
                            title: `${dateUtilities.parseMillisecondsToHHmm(
                                p.milliseconds
                            )} ${t('CALENDAR_WORKED')}`,
                            type: 'work',
                            start: p.start,
                            end: p.end,
                            allDay: true,
                        }
                    })

                    setPunchIns(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getDaysOff = async () => {
        apiManager
            .getDaysOff(user.id)
            .then((res: any) => {
                if (res.status === 200) {
                    const { daysOff } = res.data
                    const data = daysOff.map((d: DayOff) => {
                        return {
                            title: dayType(d.dayOffTypeId),
                            type: d.dayOffTypeId,
                            start: d.start,
                            end: d.end,
                            allDay: true,
                        }
                    })
                    setDaysOff(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const groupPunchIns = (punchIns: Array<PunchIn>) => {
        const format = (date: Date) => dateUtilities.format(date, 'DD-MMYYYY')
        const sorted = punchIns.sort((a, b) => {
            return a.start < b.start ? 1 : -1
        })

        let formattedPunchIns: Array<InterfacePunchInsNotToday> = []
        let daysInserted: Array<string> = []

        sorted.forEach((element) => {
            const day = format(element.start)
            const sameDay = sorted.filter((p) => format(p.start) === day)

            if (daysInserted.indexOf(day) === -1) {
                formattedPunchIns.push({
                    start: element.start,
                    end: element.end === null ? element.start : element.end,
                    punchIns: sameDay,
                })
            }
            daysInserted.push(day)
        })

        return formattedPunchIns
    }

    const totalDay = (punchInsDay: Array<PunchIn>): number => {
        const elapsed = punchInsDay.map((p) => {
            if (p.end === null) {
                return dateUtilities.diference(p.start, Date.now())
            } else {
                return dateUtilities.diference(p.start, p.end)
            }
        })
        if (elapsed.length === 0) return 0
        const milliseconds = elapsed.reduce(
            (accumulator, curr) => accumulator + curr
        )
        return milliseconds
    }

    const dayType = (id: number) => {
        if (id === 1) return t('CALENDAR_HOLIDAYS')
        if (id === 2) return t('CALENDAR_DAYOFF')
        if (id === 3) return t('CALENDAR_SICK')
        if (id === 4) return t('CALENDAR_FORMATION')
        if (id === 5) return t('CALENDAR_EXAM')
        return t('CALENDAR_OTHER')
    }

    return (
        <Wrapper showMenu>
            <section className='calendar container'>
                <ContainerWhite>
                    <CalendarComponent punchIns={punchIns} daysOff={daysOff} />
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
