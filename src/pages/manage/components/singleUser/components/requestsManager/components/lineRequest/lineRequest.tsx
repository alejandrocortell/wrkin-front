import { FC } from 'react'
import DateUtilities from 'utils/date'
import { useTranslation } from 'react-i18next'
import { DayOff } from 'models/dayOff'

const dateUtilities = new DateUtilities()

interface props {
    dayOff: DayOff
}

export const LineRequest: FC<props> = (props) => {
    const { t } = useTranslation()

    return <div className='card-day-off'>aaa</div>
}
