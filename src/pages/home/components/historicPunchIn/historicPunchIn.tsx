import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { PunchIn } from '../../../../models/punchIn'
import DateUtilities from '../../../../utils/date'
import { LineHistoricPunchIn } from './components/lineHistoricPunchIn/lineHistoricPunchIn'
import { useAppSelector } from '../../../../context/hooks'

const dateUtilities = new DateUtilities()
interface props {
    punchIns: Array<PunchIn>
    getPunchIns: () => void
}

export const HistoricPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const { settings } = useAppSelector((state) => state.organization)
    const [punchInsNotToday, setPunchInsNotToday] = useState<
        Array<Array<PunchIn>>
    >([])

    const targetDay = user.hoursToWork / 5

    useEffect(() => {
        const filter = props.punchIns.filter((p) => {
            return !dateUtilities.isToday(p.start)
        })

        const format = (date: Date) => dateUtilities.format(date, 'DDMMYYYY')
        const sorted = filter.sort((a, b) => {
            return a.start < b.start ? 1 : -1
        })

        let formattedPunchIns: Array<Array<PunchIn>> = []
        let daysInserted: Array<string> = []

        filter.forEach((element) => {
            const day = format(element.start)
            const sameDay = sorted.filter((p) => format(p.start) === day)

            if (daysInserted.indexOf(day) === -1) {
                formattedPunchIns.push(sameDay)
            }
            daysInserted.push(day)
        })

        setPunchInsNotToday(formattedPunchIns)
    }, [props.punchIns])

    return (
        <div className='historic-punch-ins'>
            {punchInsNotToday.map((p) => {
                return (
                    <LineHistoricPunchIn
                        key={dateUtilities.format(p[0].start, 'DDMMYYYY')}
                        punchIns={p}
                        targetDay={targetDay}
                        margin={settings.marginHours}
                    />
                )
            })}
        </div>
    )
}
