import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PunchIn } from '../../../../models/punchIn'
import DateUtilities from '../../../../utils/date'
import { ListPunchIns } from './components/listPunchIns/listPunchIns'
import { PaginatedPunchIns } from './components/paginatedPunchIns/paginatedPunchIns'

const dateUtilities = new DateUtilities()
interface props {
    punchIns: Array<PunchIn>
    getPunchIns: () => void
}

export interface InterfacePunchInsNotToday {
    date: string
    punchIns: Array<PunchIn>
}

export const HistoricPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()
    const [punchInsNotToday, setPunchInsNotToday] = useState<
        Array<InterfacePunchInsNotToday>
    >([])

    useEffect(() => {
        const filter = props.punchIns.filter((p) => {
            return !dateUtilities.isToday(p.start)
        })

        const format = (date: Date) => dateUtilities.format(date, 'DDMMYYYY')
        const sorted = filter.sort((a, b) => {
            return a.start < b.start ? 1 : -1
        })

        let formattedPunchIns: Array<InterfacePunchInsNotToday> = []
        let daysInserted: Array<string> = []

        filter.forEach((element) => {
            const day = format(element.start)
            const sameDay = sorted.filter((p) => format(p.start) === day)

            if (daysInserted.indexOf(day) === -1) {
                formattedPunchIns.push({
                    date: day,
                    punchIns: sameDay,
                })
            }
            daysInserted.push(day)
        })

        setPunchInsNotToday(formattedPunchIns)
    }, [props.punchIns])

    return (
        <div className='historic-punch-ins'>
            <h3>{t('HOME_LAST_PUNCH_IN')}</h3>
            <PaginatedPunchIns
                punchInsNotToday={punchInsNotToday}
                itemsPerPage={10}
            />
        </div>
    )
}
