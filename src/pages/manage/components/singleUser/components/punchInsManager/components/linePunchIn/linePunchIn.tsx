import { FC } from 'react'
import DateUtilities from 'utils/date'
import { InterfacePunchInsByDate } from '../../punchInsManager'
import { useTranslation } from 'react-i18next'

const dateUtilities = new DateUtilities()

interface props {
    punchIn: InterfacePunchInsByDate
}

export const LinePunchIn: FC<props> = (props) => {
    const { t } = useTranslation()

    const totalDay = (): number => {
        const elapsed = props.punchIn.punchIns.map((p) => {
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
        <div className='card-punch-in' key={props.punchIn.punchIns[0].id}>
            <span className='data'>
                {dateUtilities.format(
                    props.punchIn.punchIns[0].start,
                    'DD-MM-YY'
                )}
            </span>
            <span className='description'>
                {dateUtilities.parseMillisecondsToHHmm(totalDay())}h
            </span>
        </div>
    )
}
