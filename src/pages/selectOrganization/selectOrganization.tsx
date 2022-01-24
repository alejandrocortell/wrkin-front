import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../context/hooks'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { Wrapper } from '../../components/wrapper/wrapper'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'
import { Button } from '../../components/button/button'
import { changeOrganization } from '../../context/userSlice'
import { LinkButton } from '../../components/linkButton/linkButton'

export const SelectOrganization: FC = () => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const handleChangeOrg = (id: number) => {
        dispatch(changeOrganization(id))
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
