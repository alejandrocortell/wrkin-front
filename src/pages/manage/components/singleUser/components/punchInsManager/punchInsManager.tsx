import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DateUtilities from 'utils/date'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { PunchIn } from 'models/punchIn'
import { PaginatedPunchIns } from './components/paginatedPunchIns/paginatedPunchIns'
import { LinkButton } from 'components/linkButton/linkButton'
import { User } from 'models/user'
import { InputField } from 'components/input/input'

const dateUtilities = new DateUtilities()

interface props {
    punchIns: Array<PunchIn>
    user: User
}

export interface InterfacePunchInsByDate {
    date: Date
    punchIns: Array<PunchIn>
}

export const PunchInsManager: FC<props> = (props) => {
    const { t } = useTranslation()
    const [punchInsByDate, setPunchInsByDate] = useState<
        Array<InterfacePunchInsByDate>
    >([])
    const [dateStart, setDateStart] = useState(
        dateUtilities.format(new Date(1970), 'YYYY-MM-DD')
    )
    const [dateEnd, setDateEnd] = useState(
        dateUtilities.format(new Date(), 'YYYY-MM-DD')
    )

    useEffect(() => {
        const filter = props.punchIns.filter((p) => {
            return !dateUtilities.isToday(p.start)
        })

        const format = (date: Date) => dateUtilities.format(date, 'DD-MM-YYYY')
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
                    date: new Date(sameDay[0].start),
                    punchIns: sameDay,
                })
            }
            daysInserted.push(day)
        })

        const start = new Date(dateStart)
        const end = new Date(dateEnd)

        if (
            start.getTime() === start.getTime() &&
            end.getTime() === end.getTime()
        ) {
            const filtered = formattedPunchIns.filter((p) => {
                return p.date > start && p.date < end
            })

            console.log(filtered)
            setPunchInsByDate(filtered)
        } else {
            setPunchInsByDate(formattedPunchIns)
        }
    }, [props.punchIns, dateStart, dateEnd])

    const downloadReport = () => {
        let csv = `${'FORM_NAME'},${'COMMON_START'},${'COMMON_STOP'}\n`

        props.punchIns.forEach((p) => {
            csv += `${props.user.firstName} ${props.user.lastName},`
            csv += `${dateUtilities.format(
                new Date(p.start),
                'hh:mm DD-MM-YYYY'
            )},`
            csv += `${
                p.end
                    ? dateUtilities.format(new Date(p.end), 'hh:mm DD-MM-YYYY')
                    : ''
            },\n`
        })

        let hiddenElement = document.createElement('a')
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
        hiddenElement.target = '_blank'

        hiddenElement.download = `${props.user.firstName} ${
            props.user.lastName
        } ${t('NAV_PUNCHINS').toLowerCase()}.csv`
        hiddenElement.click()
    }

    return (
        <ContainerWhite>
            <div className='punchins-manager'>
                <div className='header-punch-ins'>
                    <h2>{t('NAV_PUNCHINS')}</h2>
                    <div>
                        <InputField
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setDateStart(e.target.value)
                            }}
                            value={dateStart}
                            label={t('FORM_DATE_START')}
                            type={'date'}
                            error={false}
                            errorText={''}
                        />
                        <InputField
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setDateEnd(e.target.value)
                            }}
                            value={dateEnd}
                            label={t('FORM_DATE_END')}
                            type={'date'}
                            error={false}
                            errorText={''}
                        />
                        <LinkButton
                            label={t('MANAGE_DOWNLOAD_REPORT')}
                            onClick={downloadReport}
                        />
                    </div>
                </div>
                <PaginatedPunchIns
                    punchIns={punchInsByDate}
                    itemsPerPage={20}
                />
            </div>
        </ContainerWhite>
    )
}
