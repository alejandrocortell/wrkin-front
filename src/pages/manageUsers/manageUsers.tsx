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

export const ManageUsers: FC<props> = (props) => {
    return (
        <Wrapper showMenu>
            <section className='manage-users container'>
                <ContainerWhite>
                    <></>
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
