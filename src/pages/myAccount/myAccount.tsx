import { FC } from 'react'
import { Wrapper } from 'components/wrapper/wrapper'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { FormMyAccount } from './components/formMyAccount/formMyAccount'
import { FormAvatar } from './components/formAvatar/formAvatar'
import { FormLanguage } from './components/formLanguage/formLanguage'

interface props {}

export const MyAccount: FC<props> = (props) => {
    return (
        <Wrapper showMenu>
            <section className='my-account container'>
                <ContainerWhite>
                    <div className='container-forms'>
                        <FormAvatar />
                        <div>
                            <FormMyAccount />
                            <FormLanguage />
                        </div>
                    </div>
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
