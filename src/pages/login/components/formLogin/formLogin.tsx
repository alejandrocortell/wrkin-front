import { ChangeEvent, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InputField } from '../../../../components/input/input'

export const FormLogin: FC = () => {
    const { t } = useTranslation()

    const [user, setUser] = useState('')
    const [userError, setUserError] = useState(false)
    const [userErrorText, setUserErrorText] = useState('')

    const [pass, setPass] = useState('')
    const [passError, setPassError] = useState(false)
    const [passErrorText, setPassErrorText] = useState('')

    return (
        <div className='form-login'>
            <InputField
                value={user}
                label={t('FORM_USER')}
                type='text'
                error={userError}
                errorText={userErrorText}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPass(e.target.value)
                }
            />
        </div>
    )
}
