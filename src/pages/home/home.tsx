import { FC } from 'react'
import { decrement, increment } from '../../context/userSlice'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

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
        <aside>
            <h2>Homee</h2>
            <button onClick={upId}>up</button>
            <button onClick={downId}>down</button>
            {user.id}
            {user.user}
            {t('hello_welcome_to_react')}
            {t('this_is_an_example')}
            {t('please_enter_name')}
            <button onClick={() => i18next.changeLanguage('en')}>EN</button>
            <button onClick={() => i18next.changeLanguage('es')}>ES</button>
        </aside>
    )
}
