import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DateUtilities from 'utils/date'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { PunchIn } from 'models/punchIn'
import { PaginatedRequests } from './components/paginatedRequests/paginatedRequests'
import { LinkButton } from 'components/linkButton/linkButton'
import { User } from 'models/user'
import { InputField } from 'components/input/input'
import { DayOff } from 'models/dayOff'

const dateUtilities = new DateUtilities()

interface props {
    daysOff: Array<DayOff>
    user: User
}

export const RequestsManager: FC<props> = (props) => {
    const { t } = useTranslation()
    const [daysOff, setDaysOff] = useState<Array<DayOff>>(props.daysOff)
    const [dateStart, setDateStart] = useState(
        dateUtilities.format(new Date(1970), 'YYYY-MM-DD')
    )
    const [dateEnd, setDateEnd] = useState(
        dateUtilities.format(new Date(), 'YYYY-MM-DD')
    )

    useEffect(() => {
        const start = new Date(dateStart)
        const end = new Date(dateEnd)

        if (
            start.getTime() === start.getTime() &&
            end.getTime() === end.getTime()
        ) {
            const filtered = props.daysOff.filter((d) => {
                return (
                    new Date(d.createdAt) > start && new Date(d.createdAt) < end
                )
            })
            setDaysOff(filtered)
        }
    }, [props.daysOff, dateStart, dateEnd])

    const downloadReport = () => {
        let csv = `${'FORM_NAME'},${'COMMON_START'},${'COMMON_STOP'}\n`

        // props.daysOff.forEach((d) => {
        //     csv += `${props.user.firstName} ${props.user.lastName},`
        //     csv += `${dateUtilities.format(
        //         new Date(d.start),
        //         'hh:mm DD-MM-YYYY'
        //     )},`
        //     csv += `${
        //         d.end
        //             ? dateUtilities.format(new Date(p.end), 'hh:mm DD-MM-YYYY')
        //             : ''
        //     },\n`
        // })

        // let hiddenElement = document.createElement('a')
        // hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
        // hiddenElement.target = '_blank'

        // hiddenElement.download = `${props.user.firstName} ${
        //     props.user.lastName
        // } ${t('NAV_PUNCHINS').toLowerCase()}.csv`
        // hiddenElement.click()
    }

    return (
        <ContainerWhite>
            <div className='requests-manager'>
                <div className='header-request'>
                    <h2>{t('MANAGE_REQUESTS')}</h2>
                </div>
                <div className='options-request'>
                    <div className='filter'>
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
                    </div>
                    <LinkButton
                        label={t('MANAGE_DOWNLOAD_REPORT')}
                        onClick={downloadReport}
                    />
                </div>
                <PaginatedRequests daysOff={daysOff} itemsPerPage={20} />
            </div>
        </ContainerWhite>
    )
}
