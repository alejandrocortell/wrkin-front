import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { PunchIn } from '../../../../models/punchIn'
import { LinePunchIn } from './components/linePunchIn/linePunchIn'
import { TotalDay } from './components/totalDay/totalDay'

interface props {
    punchIns: Array<PunchIn>
}

export const DayPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <div className='day-punchin'>
            {t('HOME_RESUME_DAY')}
            {props.punchIns.map((p) => (
                <LinePunchIn punchIn={p} />
            ))}
            <div className='divider'></div>
            <TotalDay punchIns={props.punchIns} />
        </div>
    )
}
