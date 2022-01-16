import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PunchIn } from '../../../../../../models/punchIn'
import DateUtilities from '../../../../../../utils/date'
const dateUtilities = new DateUtilities()

interface props {
    punchIns: Array<PunchIn>
}

export const TotalDay: FC<props> = (props) => {
    const { t } = useTranslation()

    const totalDay = () => {
        const elapsed = props.punchIns.map((p) =>
            dateUtilities.diference(p.start, p.end)
        )
        if (elapsed.length === 0) return
        const milliseconds = elapsed.reduce(
            (accumulator, curr) => accumulator + curr
        )
        return dateUtilities.parseMillisecondsToHHmm(milliseconds)
    }

    return (
        <div className='total-day'>
            <span>
                {t('HOME_TOTAL_DAY')} {totalDay()}h
            </span>
        </div>
    )
}
