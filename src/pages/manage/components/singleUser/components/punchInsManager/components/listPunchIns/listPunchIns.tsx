import { FC } from 'react'
import { InterfacePunchInsByDate } from '../../punchInsManager'
import { LinePunchIn } from '../linePunchIn/linePunchIn'

interface props {
    punchIns: Array<InterfacePunchInsByDate>
}

export const ListPunchIns: FC<props> = (props) => {
    return (
        <div className='list-punchIns'>
            {props.punchIns.map((p) => {
                return <LinePunchIn punchIn={p} />
            })}
        </div>
    )
}
