import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../components/button/button'
import { Checkbox } from '../../../../components/checkbox/checkbox'
import { InputField } from '../../../../components/input/input'
import { LinkButton } from '../../../../components/linkButton/linkButton'
import { useDebounce } from '../../../../hooks/useDebounce'
import Validator from '../../../../utils/validators'
import AuthService from '../../../../services/authService'
import { useAppDispatch } from '../../../../context/hooks'
import { login } from '../../../../context/authSlice'
import { useNavigate } from 'react-router-dom'

const val = new Validator()
const authService = new AuthService()

export const FormLogin: FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState('alejandro')
    const [userError, setUserError] = useState(false)
    const [userErrorText, setUserErrorText] = useState('Error text')

    const [pass, setPass] = useState('123456aA?')
    const [passError, setPassError] = useState(false)
    const [passErrorText, setPassErrorText] = useState('')

    const [remember, setRemember] = useState(true)
    const [buttonLoader, setButtonLoader] = useState(false)
    const [errorForm, setErrorForm] = useState(false)
    const [textErrorForm, setTextErrorForm] = useState('')

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

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setUserError(false)
        const testUser = val.isString(user)
        if (testUser.error) {
            setUserError(testUser.error)
            setUserErrorText(testUser.errorText)
            return
        }

        setPassError(false)
        const testPass = val.isPassword(pass)
        if (testPass.error) {
            setPassError(testPass.error)
            setPassErrorText(testPass.errorText)
            return
        }

        doLogin()
        navigate('/')
    }

    const doLogin = async () => {
        setErrorForm(false)
        setButtonLoader(true)

        await authService
            .login(user, pass)
            .then((res: any) => {
                setButtonLoader(false)
                if (res.status !== 200) {
                    setErrorForm(true)
                    setTextErrorForm(t('ERROR_FORM'))
                    return
                }

                if (res.data.status === 204) {
                    setErrorForm(true)
                    setTextErrorForm(t('ERROR_USER_NOT_FOUND'))
                    return
                }

                dispatch(login(res.data.token))
            })
            .catch((err) => console.log(err))
    }

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
                loading={buttonLoader}
            />
            {errorForm && <div className='error-form'>{textErrorForm}</div>}
        </form>
    )
}
