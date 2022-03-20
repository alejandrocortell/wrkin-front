import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PunchIn } from 'models/punchIn'
import { LinePunchIn } from './components/linePunchIn/linePunchIn'
import { TotalDay } from './components/totalDay/totalDay'
import { StartStop } from './components/startStop/startStop'

interface props {
    punchIns: Array<PunchIn>
    getPunchIns: () => void
}

export const DayPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()
    const [currentPunchIn, setCurrentPunchIn] = useState<PunchIn | null>(null)

    useEffect(() => {
        const filter = props.punchIns.find((p) => p.end === null)
        filter === undefined
            ? setCurrentPunchIn(null)
            : setCurrentPunchIn(filter)
    }, [props.punchIns])

    return (
        <div className='day-punchin'>
            <StartStop
                currentPunchIn={currentPunchIn}
                getPunchIns={() => props.getPunchIns()}
            />
            <h2>{t('HOME_RESUME_DAY')}</h2>
            {props.punchIns.map((p) => {
                return p.end !== null && <LinePunchIn punchIn={p} key={p.id} />
            })}
            <div className='divider'></div>
            <TotalDay punchIns={props.punchIns} />
        </div>
    )
}
