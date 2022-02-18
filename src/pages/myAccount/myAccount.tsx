import { FC, useEffect, useState } from 'react'
import { Location } from 'history'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import Api from '../../services/api'
import { AxiosResponse } from 'axios'
import { setUser } from '../../context/userSlice'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'

const apiManager = new Api()

interface props {}

export const MyAccount: FC<props> = (props) => {
    const auth = useAppSelector((state) => state.auth)
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    return (
        <Wrapper showMenu>
            <section className='my-account container'>
                <ContainerWhite>
                    <>my account</>
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
