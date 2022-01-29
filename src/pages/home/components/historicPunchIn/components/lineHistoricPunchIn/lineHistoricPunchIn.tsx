import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LinkButton } from '../../../../../../components/linkButton/linkButton'
import { PunchIn } from '../../../../../../models/punchIn'
import DateUtilities from '../../../../../../utils/date'
import { InterfacePunchInsNotToday } from '../../historicPunchIn'
import { GraphPunchIn } from '../graphPunchIn/graphPunchIn'

const dateUtilities = new DateUtilities()

interface props {
    punchInsNotToday: InterfacePunchInsNotToday
    targetDay: number
    margin: number
}

export const LineHistoricPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()

    const edit = (date: string) => {
        console.log(date)
    }

    const totalDay = (): number => {
        const elapsed = props.punchInsNotToday.punchIns.map((p) => {
            if (p.end === null) {
                return dateUtilities.diference(p.start, Date.now())
            } else {
                return dateUtilities.diference(p.start, p.end)
            }
        })
        if (elapsed.length === 0) return 0
        const milliseconds = elapsed.reduce(
            (accumulator, curr) => accumulator + curr
        )
        return milliseconds
    }

    return (
        <div className='line-historic-punch-in'>
            <span>
                {dateUtilities.format(
                    props.punchInsNotToday.punchIns[0].start,
                    'DD-MM-YY'
                )}
            </span>
            <GraphPunchIn
                totalDay={totalDay()}
                targetDay={props.targetDay}
                margin={props.margin}
            />
            <span className='total-time'>
                {dateUtilities.parseMillisecondsToHHmm(totalDay())}h
            </span>
            <LinkButton
                label={t('COMMON_EDIT')}
                onClick={() =>
                    edit(
                        dateUtilities.format(
                            props.punchInsNotToday.punchIns[0].start,
                            'DDMMYYYY'
                        )
                    )
                }
            />
        </div>
    )
}