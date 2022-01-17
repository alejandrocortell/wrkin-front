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
            <h2>{t('HOME_RESUME_DAY')}</h2>
            {props.punchIns.map((p) => (
                <LinePunchIn punchIn={p} key={p.id} />
            ))}
            <div className='divider'></div>
            <TotalDay punchIns={props.punchIns} />
        </div>
    )
}
