import { FC } from 'react'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'
import { SelectorManage } from './components/selector/selector'

interface props {}

export const ManageUsers: FC<props> = (props) => {
    return (
        <Wrapper showMenu>
            <section className='manage container'>
                <ContainerWhite>
                    <SelectorManage />
                </ContainerWhite>
                <ContainerWhite>
                    <></>
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
