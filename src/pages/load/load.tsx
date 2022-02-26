import { FC, useEffect, useState } from 'react'
import { Location } from 'history'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import Api from '../../services/api'
import { AxiosResponse } from 'axios'
import { setUser } from '../../context/userSlice'
import {
    setDocumentTypes,
    setOrganization,
    setSettings,
    setTypesDayOff,
} from '../../context/organizationSlice'

const apiManager = new Api()

interface props {}

export const Load: FC<props> = (props) => {
    const auth = useAppSelector((state) => state.auth)
    const [loading, setLoading] = useState(true)
    const { user } = useAppSelector((state) => state.user)
    const { settings, dayOffTypes, documentsTypes } = useAppSelector(
        (state) => state.organization
    )
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.logged) {
            navigate('/login')
        } else if (
            !loading &&
            user.user !== '' &&
            settings.id !== 0 &&
            dayOffTypes.length > 0 &&
            documentsTypes.length > 0
        ) {
            navigate('/')
        }
    }, [auth, user, settings, dayOffTypes, documentsTypes])

    useEffect(() => {
        apiManager
            .getUserInfo()
            .then((res: any) => {
                if (res.status === 200) {
                    setLoading(false)
                    dispatch(setUser({ ...res.data.user }))
                }
            })
            .catch((err) => {
                console.log(err)
            })

        apiManager
            .getDaysOffTypes()
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(setTypesDayOff(res.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })

        apiManager
            .getDocumentsTypes()
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(setDocumentTypes(res.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (user.user !== '') {
            apiManager
                .getOrganization(user.OrganizationId)
                .then((res: any) => {
                    if (res.status === 200) {
                        setLoading(false)
                        dispatch(setOrganization({ ...res.data.organization }))
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            apiManager
                .getSettings(user.OrganizationId)
                .then((res: any) => {
                    if (res.status === 200) {
                        setLoading(false)
                        dispatch(setSettings({ ...res.data.settings }))
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [user])

    return (
        <aside>
            <h2>Load page!</h2>
        </aside>
    )
}
