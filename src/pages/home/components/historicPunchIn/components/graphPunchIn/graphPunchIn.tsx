import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { PunchIn } from '../../../../../../models/punchIn'
import DateUtilities from '../../../../../../utils/date'

const dateUtilities = new DateUtilities()

interface props {
    punchIn: PunchIn
}

export const GraphPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()

    return <>aaa</>
}
