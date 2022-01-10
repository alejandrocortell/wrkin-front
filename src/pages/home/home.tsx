import { FC } from 'react'
import { decrement, increment } from '../../context/userSlice'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Wrapper } from '../../components/wrapper/wrapper'

export const Home: FC = () => {
    const { t } = useTranslation()
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const upId = () => {
        dispatch(increment())
    }

    const downId = () => {
        dispatch(decrement())
    }

    return (
        <Wrapper>
            <div>Home page</div>
        </Wrapper>
    )
}
