import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DateUtilities from 'utils/date'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { PunchIn } from 'models/punchIn'
import { PaginatedPunchIns } from './components/paginatedPunchIns/paginatedPunchIns'

const dateUtilities = new DateUtilities()

interface props {
    punchIns: Array<PunchIn>
}

export interface InterfacePunchInsByDate {
    date: string
    punchIns: Array<PunchIn>
}

export const PunchInsManager: FC<props> = (props) => {
    const { t } = useTranslation()
    const [punchInsByDate, setPunchInsByDate] = useState<
        Array<InterfacePunchInsByDate>
    >([])

    useEffect(() => {
        const filter = props.punchIns.filter((p) => {
            return !dateUtilities.isToday(p.start)
        })

        const format = (date: Date) => dateUtilities.format(date, 'DDMMYYYY')
        const sorted = filter.sort((a, b) => {
            return a.start < b.start ? 1 : -1
        })

        let formattedPunchIns: Array<InterfacePunchInsByDate> = []
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

        setPunchInsByDate(formattedPunchIns)
    }, [props.punchIns])

    return (
        <ContainerWhite>
            <div className='punchins-manager'>
                <div className='header'>
                    <h2>{t('NAV_PUNCHINS')}</h2>
                </div>
                <PaginatedPunchIns
                    punchIns={punchInsByDate}
                    itemsPerPage={20}
                />
            </div>
        </ContainerWhite>
    )
}
