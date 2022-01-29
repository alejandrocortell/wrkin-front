import { FC, useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../../context/hooks'
import DateUtilities from '../../../../../../utils/date'
import { InterfacePunchInsNotToday } from '../../historicPunchIn'
import { LineHistoricPunchIn } from '../lineHistoricPunchIn/lineHistoricPunchIn'

const dateUtilities = new DateUtilities()

interface props {
    punchInsNotToday: Array<InterfacePunchInsNotToday>
    getPunchIns: () => void
}

export const ListPunchIns: FC<props> = (props) => {
    const { user } = useAppSelector((state) => state.user)
    const { settings } = useAppSelector((state) => state.organization)

    const targetDay = user.hoursToWork / 5

    return (
        <div className='list-historic'>
            {props.punchInsNotToday.map((p) => {
                return (
                    <LineHistoricPunchIn
                        key={dateUtilities.format(
                            p.punchIns[0].start,
                            'DDMMYYYY'
                        )}
                        punchInsNotToday={p}
                        targetDay={targetDay}
                        margin={settings.marginHours}
                        getPunchIns={props.getPunchIns}
                    />
                )
            })}
        </div>
    )
}
