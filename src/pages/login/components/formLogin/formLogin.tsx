import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../components/button/button'
import { Checkbox } from '../../../../components/checkbox/checkbox'
import { InputField } from '../../../../components/input/input'
import { LinkButton } from '../../../../components/linkButton/linkButton'
import { useDebounce } from '../../../../hooks/useDebounce'
import Validator from '../../../../utils/validators'

const val = new Validator()

export const FormLogin: FC = () => {
    const { t } = useTranslation()

    const [user, setUser] = useState('')
    const [userError, setUserError] = useState(false)
    const [userErrorText, setUserErrorText] = useState('Error text')

    const [pass, setPass] = useState('')
    const [passError, setPassError] = useState(false)
    const [passErrorText, setPassErrorText] = useState('Error text')

    const [remember, setRemember] = useState(true)

    const debouncedUser = useDebounce(user, 400)
    useEffect(() => {
        if (user === '') return
        setUserError(false)
        const test = val.isString(user)
        setUserError(test.error)
        setUserErrorText(test.errorText)
    }, [debouncedUser])

    const debouncedPass = useDebounce(pass, 400)
    useEffect(() => {
        setPassError(false)
        if (pass === '') return
        const test = val.isPassword(pass)
        setPassError(test.error)
        setPassErrorText(test.errorText)
    }, [debouncedPass])

    const handleSubmit = () => {}

    return (
        <form className='form-login' onSubmit={handleSubmit}>
            <InputField
                value={user}
                label={t('FORM_USER')}
                type='text'
                error={userError}
                errorText={userErrorText}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUser(e.target.value)
                }
            />
            <InputField
                value={pass}
                label={t('FORM_PASSWORD')}
                type='password'
                error={passError}
                errorText={passErrorText}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPass(e.target.value)
                }
            />
            <div className='container-remember'>
                <Checkbox
                    onChange={() => setRemember(!remember)}
                    checked={remember}
                    label={t('FORM_REMEMBER')}
                />
                <LinkButton label={t('FORM_FORGOT_PASSWORD')} path={'/'} />
            </div>
            <Button
                onClick={handleSubmit}
                label={t('FORM_LOGIN')}
                style={'primary'}
            />
        </form>
    )
}
