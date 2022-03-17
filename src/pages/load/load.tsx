import { FC, useEffect, useState } from 'react'
import { Location } from 'history'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'context/hooks'
import UserService from 'services/userService'
import OrganizationService from 'services/organizationService'
import DaysOffService from 'services/daysOffService'
import DocumentsService from 'services/documentsService'
import { AxiosResponse } from 'axios'
import { setUser } from 'context/userSlice'
import {
    setDocumentTypes,
    setOrganization,
    setSettings,
    setTypesDayOff,
} from 'context/organizationSlice'
import { Logo } from 'components/logo/logo'

const userService = new UserService()
const organizationService = new OrganizationService()
const daysOffService = new DaysOffService()
const documentsService = new DocumentsService()

interface props {}

export const Load: FC<props> = (props) => {
    const { route } = useParams()
    const auth = useAppSelector((state) => state.auth)
    const [loading, setLoading] = useState(true)
    const { user } = useAppSelector((state) => state.user)
    const { settings, dayOffTypes, documentsTypes } = useAppSelector(
        (state) => state.organization
    )
    const [finishedLoader, setFinishedLoader] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setFinishedLoader(true)
        }, 1500)
    }, [])

    useEffect(() => {
        if (finishedLoader) {
            if (!auth.logged) {
                navigate('/login')
            } else if (
                !loading &&
                user.user !== '' &&
                settings.id !== 0 &&
                dayOffTypes.length > 0 &&
                documentsTypes.length > 0
            ) {
                if (route === undefined) {
                    navigate('/')
                } else {
                    navigate(`/${route?.replaceAll('-', '/')}`)
                }
            }
        }
    }, [auth, user, settings, dayOffTypes, documentsTypes, finishedLoader])

    useEffect(() => {
        userService
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

        daysOffService
            .getDaysOffTypes()
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(setTypesDayOff(res.data))
                }
            })
            .catch((err) => {
                console.log(err)
            })

        documentsService
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
            organizationService
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
            organizationService
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
        <div className='load-page'>
            <div className='container-logo'>
                <Logo />
                <div className='line-animated'></div>
            </div>
        </div>
    )
}
