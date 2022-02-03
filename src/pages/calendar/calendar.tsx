import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import { Wrapper } from '../../components/wrapper/wrapper'
import { CalendarComponent } from './components/calendarComponent/calendarComponent'
import Api from '../../services/api'
import { PunchIn } from '../../models/punchIn'
import { calendarEvent } from '../../models/calendarEvent'
import DateUtilities from '../../utils/date'

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
    const [events, setEvents] = useState<Array<calendarEvent>>([])

    useEffect(() => {
        apiManager
            .getUserPunchIns(user.id)
            .then((res: any) => {
                console.log(res)
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
                    console.log(sorted)
                    const data = sorted.map((p: any): calendarEvent => {
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

                    setEvents(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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

    return (
        <Wrapper showMenu>
            <CalendarComponent events={events} />
        </Wrapper>
    )
}
