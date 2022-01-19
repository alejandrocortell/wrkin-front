import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PunchIn } from '../../../../../../models/punchIn'
import DateUtilities from '../../../../../../utils/date'
const dateUtilities = new DateUtilities()

interface props {
    punchIns: Array<PunchIn>
}

export const TotalDay: FC<props> = (props) => {
    const { t } = useTranslation()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setInterval(() => {
            const milliseconds = totalDay()
            milliseconds !== undefined && setTotal(milliseconds)
        }, 1000)
    }, [])

    const totalDay = () => {
        const elapsed = props.punchIns.map((p) => {
            if (p.end === null) {
                return dateUtilities.diference(p.start, new Date())
            } else {
                return dateUtilities.diference(p.start, p.end)
            }
        })
        if (elapsed.length === 0) return
        const milliseconds = elapsed.reduce(
            (accumulator, curr) => accumulator + curr
        )
        return milliseconds
    }

    return (
        <div className='total-day'>
            <span>
                {t('HOME_TOTAL_DAY')}{' '}
                {dateUtilities.parseMillisecondsToHHmm(total)}h
            </span>
        </div>
    )
}
