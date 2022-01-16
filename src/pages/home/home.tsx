import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'

export const Home: FC = () => {
    const { t } = useTranslation()
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    return (
        <Wrapper>
            <section className='home container'>
                <div className='column-timer'>
                    <ContainerWhite>
                        <div>Timeer</div>
                    </ContainerWhite>
                </div>
                <div className='column-punchin'>
                    <ContainerWhite>
                        <div>Punchinss</div>
                    </ContainerWhite>
                </div>
            </section>
        </Wrapper>
    )
}
