import { FC, useEffect, useState } from 'react'
import { Location } from 'history'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import Api from '../../services/api'
import { AxiosResponse } from 'axios'
import { setUser } from '../../context/userSlice'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'
import { FormMyAccount } from './components/formMyAccount/formMyAccount'
import { FormAvatar } from './components/formAvatar/formAvatar'

const apiManager = new Api()

interface props {}

export const MyAccount: FC<props> = (props) => {
    return (
        <Wrapper showMenu>
            <section className='my-account container'>
                <ContainerWhite>
                    <div className='container-forms'>
                        <FormAvatar />
                        <FormMyAccount />
                    </div>
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
