import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'
import { Button } from '../../components/button/button'
import { changeOrganization } from '../../context/userSlice'
import { LinkButton } from '../../components/linkButton/linkButton'
import Api from '../../services/api'
import { setOrganization, setSettings } from '../../context/organizationSlice'
import Logo from '../../assets/img/WRKIN.svg'

const apiManager = new Api()

export const SelectOrganization: FC = () => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)

    const handleChangeOrg = (id: number) => {
        dispatch(changeOrganization(id))
        setLoader(false)
        apiManager
            .getOrganization(id)
            .then((res: any) => {
                if (res.status === 200) {
                    dispatch(setOrganization(res.data.organization))
                }
            })
            .catch((err) => {
                console.log(err)
            })
        apiManager
            .getSettings(id)
            .then((res: any) => {
                console.log(res)
                if (res.status === 200) {
                    dispatch(setSettings(res.data.settings))
                    setLoader(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Wrapper showMenu={false}>
            <div className='select-organization container'>
                <ContainerWhite>
                    <>
                        <div className='container-logo'>
                            <img src={Logo} alt='WRKIN' />
                        </div>
                        <div className='choose-text'>
                            {t('SELECT_ORGANIZATION_SELECT')}
                        </div>
                        <div className='container-buttons'>
                            {user.organizations.map((org) => {
                                return (
                                    <Button
                                        key={org.organizationId}
                                        onClick={() =>
                                            handleChangeOrg(org.organizationId)
                                        }
                                        label={org.organizationName}
                                        style={
                                            user.currentOrganization ===
                                            org.organizationId
                                                ? 'primary'
                                                : 'secondary'
                                        }
                                    />
                                )
                            })}
                            {user.currentOrganization !== 0 && loader && (
                                <LinkButton
                                    label={t('SELECT_ORGANIZATION_GO_HOME')}
                                    path={'/'}
                                />
                            )}
                        </div>
                    </>
                </ContainerWhite>
            </div>
        </Wrapper>
    )
}
function getSettings(settings: any): any {
    throw new Error('Function not implemented.')
}
