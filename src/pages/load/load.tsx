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
    const [loading, setLoading] = useState(true)
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.logged) {
            navigate('/login')
        } else if (!loading && user.currentOrganization === 0) {
            navigate('/select-organization')
        } else if (!loading && user.user !== '') {
            navigate('/')
        }
    }, [auth, user])

    useEffect(() => {
        apiManager
            .getUserInfo()
            .then((res: any) => {
                if (res.status === 200) {
                    const organizations = res.data.user.organizations
                    const org =
                        organizations.length > 1 ? 0 : organizations[0].id
                    setLoading(false)
                    dispatch(
                        setUser({ ...res.data.user, currentOrganization: org })
                    )
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <aside>
            <h2>Load page!</h2>
        </aside>
    )
}
