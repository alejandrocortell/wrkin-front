import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import DateUtilities from 'utils/date'

const dateUtilities = new DateUtilities()

interface props {
    totalDay: number
    targetDay: number
    margin: number
}

export const GraphPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()

    const targetInMill = (
        totalDay: number,
        targetDay: number,
        margin: number
    ) => {
        const marginMill = margin * 3600000
        const targetDayMill = targetDay * 3600000

        if (targetDayMill + marginMill < totalDay) {
            return 1
        } else if (targetDayMill - marginMill > totalDay) {
            return -1
        } else {
            return 0
        }
    }

    const result = targetInMill(props.totalDay, props.targetDay, props.margin)

    return (
        <div className='graph-punch-in'>
            {result === 1 && <div className='hours-plus'></div>}
            {result === -1 && <div className='hours-minus'></div>}
        </div>
    )
}

6
7
8
