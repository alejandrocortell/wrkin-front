import { FC } from 'react'
import { decrement, increment } from '../../context/userSlice'
import { useAppDispatch, useAppSelector } from '../../context/hooks'

export const Home: FC = () => {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const upId = () => {
        dispatch(increment())
    }

    const downId = () => {
        dispatch(decrement())
    }

    return (
        <aside>
            <h2>Homee</h2>
            <button onClick={upId}>up</button>
            <button onClick={downId}>down</button>
            {user.id}
            {user.user}
        </aside>
    )
}
