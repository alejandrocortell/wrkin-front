import { Button } from 'components/button/button'
import { Checkbox } from 'components/checkbox/checkbox'
import { InputField } from 'components/input/input'
import { useAppDispatch, useAppSelector } from 'context/hooks'
import { setSettings } from 'context/organizationSlice'
import { useDebounce } from 'hooks/useDebounce'
import { t } from 'i18next'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import OrganizationService from 'services/organizationService'

const organiaztionService = new OrganizationService()

interface props {}

export const FormOrganization: FC<props> = (props) => {
    const dispatch = useAppDispatch()
    const { organization } = useAppSelector((state) => state.organization)
    const { settings } = useAppSelector((state) => state.organization)

    const [disableCreate, setDisableCreate] = useState(true)

    const [marginHours, setMarginHoursName] = useState(settings.marginHours)
    const [marginHoursError, setMarginHoursError] = useState(false)
    const [marginHoursErrorText, setMarginHoursErrorText] = useState('')

    const [allowModify, setAllowModify] = useState(settings.allowModifyPunchIn)
    const [allowInsertPast, setAllowInsertPast] = useState(
        settings.allowInsertPastPunchIn
    )

    const [buttonLoaderUpdate, setButtonLoaderUpdate] = useState(false)

    const [updateSettings, setUpdateSettings] = useState(false)
    const [errorUpdate, setErrorUpdate] = useState(false)

    useEffect(() => {
        if (
            settings.marginHours === marginHours &&
            settings.allowModifyPunchIn === allowModify &&
            settings.allowInsertPastPunchIn === allowInsertPast
        ) {
            setDisableCreate(true)
        } else if (!isNaN(+marginHours) && !marginHoursError) {
            setDisableCreate(false)
        } else {
            setDisableCreate(true)
        }
    }, [settings, marginHours, allowModify, allowInsertPast])

    const handleSubmit = (e: any) => {
        e.preventDefault()

        setButtonLoaderUpdate(true)
        setUpdateSettings(false)
        setErrorUpdate(false)

        organiaztionService
            .updateSettings(
                organization.id,
                marginHours,
                allowModify,
                allowInsertPast
            )
            .then((res: any) => {
                if (res.status === 200) {
                    setUpdateSettings(true)
                    dispatch(
                        setSettings({
                            ...settings,
                            marginHours: marginHours,
                            allowModifyPunchIn: allowModify,
                            allowInsertPastPunchIn: allowInsertPast,
                        })
                    )
                } else {
                    setErrorUpdate(true)
                }
            })
            .catch((err) => setErrorUpdate(true))
            .finally(() => setButtonLoaderUpdate(false))
    }

    return (
        <form className='form-create-user' onSubmit={handleSubmit}>
            <div className='col-3'>
                <InputField
                    value={marginHours}
                    label={t('FORM_MARGIN_HOURS')}
                    type='number'
                    error={marginHoursError}
                    errorText={marginHoursErrorText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setMarginHoursName(parseInt(e.target.value))
                    }
                />
            </div>
            <div className='col-2 extra-space'>
                <Checkbox
                    onChange={() => setAllowModify(!allowModify)}
                    checked={allowModify}
                    label={t('FORM_ALLOW_MODIFY_PUNCH_IN')}
                />
            </div>
            <div className='col-2 extra-space'>
                <Checkbox
                    onChange={() => setAllowInsertPast(!allowInsertPast)}
                    checked={allowInsertPast}
                    label={t('FORM_ALLOW_INSERT_PUNCH_IN')}
                />
            </div>
            <div className='container-button'>
                {updateSettings && (
                    <div className='form-updated'>
                        {t('FORM_SETTINGS_UPDATED')}
                    </div>
                )}
                {errorUpdate && (
                    <div className='error-form'>{t('ERROR_FORM')}</div>
                )}

                <Button
                    onClick={handleSubmit}
                    label={t('MANAGE_MODIFY_SETTINGS')}
                    style={'primary'}
                    loading={buttonLoaderUpdate}
                    disabled={disableCreate}
                />
            </div>
        </form>
    )
}
