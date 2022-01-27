import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PunchIn } from '../../../../../../models/punchIn'
import DateUtilities from '../../../../../../utils/date'

const dateUtilities = new DateUtilities()

interface props {
    totalDay: number
}

export const GraphPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()

    return <div className='graph-punch-in'></div>
}
