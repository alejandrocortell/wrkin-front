import { FC, useEffect, useState } from 'react'
import { Location } from 'history'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import Api from '../../services/api'
import { AxiosResponse } from 'axios'
import { setUser } from '../../context/userSlice'

const apiManager = new Api()

interface props {}

export const Load: FC<props> = (props) => {
    const auth = useAppSelector((state) => state.auth)
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.logged) {
            navigate('/login')
        }
    }, [auth])

    useEffect(() => {
        apiManager
            .getUserInfo()
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(setUser(res.data.user))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (user.user !== '') {
            navigate('/')
        }
    }, [user])

    return (
        <aside>
            <h2>Load page!</h2>
        </aside>
    )
}
