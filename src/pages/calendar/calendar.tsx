import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Wrapper } from '../../components/wrapper/wrapper'

export const Calendar: FC = () => {
    const { t } = useTranslation()
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    return (
        <Wrapper>
            <div>Calendar page</div>
        </Wrapper>
    )
}
