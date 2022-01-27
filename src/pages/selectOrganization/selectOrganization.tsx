import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'
import { Button } from '../../components/button/button'
import { changeOrganization } from '../../context/userSlice'
import { LinkButton } from '../../components/linkButton/linkButton'
import Api from '../../services/api'
import { setOrganization, setSettings } from '../../context/organizationSlice'

const apiManager = new Api()

export const SelectOrganization: FC = () => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const handleChangeOrg = (id: number) => {
        dispatch(changeOrganization(id))
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
                    <div className='container-buttons'>
                        {user.organizations.map((org) => {
                            return (
                                <Button
                                    onClick={() => handleChangeOrg(org.id)}
                                    label={org.name}
                                    style={
                                        user.currentOrganization === org.id
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                />
                            )
                        })}
                        {user.currentOrganization !== 0 && (
                            <LinkButton
                                label={t('SELECT_ORGANIZATION_GO_HOME')}
                                path={'/'}
                            />
                        )}
                    </div>
                </ContainerWhite>
            </div>
        </Wrapper>
    )
}
function getSettings(settings: any): any {
    throw new Error('Function not implemented.')
}
