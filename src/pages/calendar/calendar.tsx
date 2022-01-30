import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import { Wrapper } from '../../components/wrapper/wrapper'
import { CalendarComponent } from './components/calendarComponent/calendarComponent'

export const Calendar: FC = () => {
    const { t } = useTranslation()
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    return (
        <Wrapper showMenu>
            <CalendarComponent year={2022} month={1} />
        </Wrapper>
    )
}
