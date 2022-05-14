import { FC } from 'react'
import { Wrapper } from 'components/wrapper/wrapper'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { SelectorManage } from './components/selector/selector'
import { Organization } from './components/organization/organization'

interface props {}

export const ManageOrganization: FC<props> = (props) => {
    return (
        <Wrapper showMenu>
            <section className='manage container'>
                <ContainerWhite>
                    <SelectorManage />
                </ContainerWhite>
                <ContainerWhite>
                    <Organization />
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
