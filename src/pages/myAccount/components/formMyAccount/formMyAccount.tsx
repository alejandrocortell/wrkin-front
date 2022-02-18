import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../components/button/button'
import { Checkbox } from '../../../../components/checkbox/checkbox'
import { InputField } from '../../../../components/input/input'
import { LinkButton } from '../../../../components/linkButton/linkButton'
import { useDebounce } from '../../../../hooks/useDebounce'
import Validator from '../../../../utils/validators'
import Api from '../../../../services/api'
import { useAppDispatch, useAppSelector } from '../../../../context/hooks'
import { login } from '../../../../context/authSlice'
import { useNavigate } from 'react-router-dom'

const val = new Validator()
const apiManager = new Api()

export const FormMyAccount: FC = () => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [userName, setUserName] = useState(user.user)
    const [userError, setUserError] = useState(false)
    const [userErrorText, setUserErrorText] = useState('')

    const [firstName, setFirstName] = useState(user.firstName)
    const [firstNameError, setFirstNameError] = useState(false)
    const [firstNameErrorText, setFirstNameErrorText] = useState('')

    const [lastName, setLastName] = useState(user.lastName)
    const [lastNameError, setLastNameError] = useState(false)
    const [lastNameErrorText, setLastNameErrorText] = useState('')

    const [birthday, setBirthday] = useState(user.birthday)
    const [birthdayError, setBirthdayError] = useState(false)
    const [birthdayErrorText, setBirthdayErrorText] = useState('')

    const [address, setAddress] = useState(user.address)
    const [addressError, setAddressError] = useState(false)
    const [addressErrorText, setAddressErrorText] = useState('')

    const [zipcode, setZipcode] = useState(user.zipcode)
    const [zipcodeError, setZipcodeError] = useState(false)
    const [zipcodeErrorText, setZipcodeErrorText] = useState('')

    const [city, setCity] = useState(user.city)
    const [cityError, setCityError] = useState(false)
    const [cityErrorText, setCityErrorText] = useState('')

    const [pass, setPass] = useState('')
    const [passError, setPassError] = useState(false)
    const [passErrorText, setPassErrorText] = useState('')

    const [buttonLoader, setButtonLoader] = useState(false)
    const [errorForm, setErrorForm] = useState(false)
    const [textErrorForm, setTextErrorForm] = useState('')

    const debouncedUser = useDebounce(userName, 400)
    useEffect(() => {
        if (userName === '') return
        setUserError(false)
        const test = val.isString(userName)
        setUserError(test.error)
        setUserErrorText(test.errorText)
    }, [debouncedUser])

    const debouncedFirstName = useDebounce(firstName, 400)
    useEffect(() => {
        setFirstNameError(false)
        if (firstName === '') return
        const test = val.isString(firstName)
        setFirstNameError(test.error)
        setFirstNameErrorText(test.errorText)
    }, [debouncedFirstName])

    const debouncedLastName = useDebounce(lastName, 400)
    useEffect(() => {
        setLastNameError(false)
        if (lastName === '') return
        const test = val.isString(lastName)
        setLastNameError(test.error)
        setLastNameErrorText(test.errorText)
    }, [debouncedLastName])

    const debouncedBirthday = useDebounce(birthday, 400)
    useEffect(() => {
        setBirthdayError(false)
        if (birthday === '') return
        const test = val.isString(birthday)
        setBirthdayError(test.error)
        setBirthdayErrorText(test.errorText)
    }, [debouncedBirthday])

    const debouncedAddress = useDebounce(address, 400)
    useEffect(() => {
        setAddressError(false)
        if (address === '') return
        const test = val.isString(address)
        setAddressError(test.error)
        setAddressErrorText(test.errorText)
    }, [debouncedAddress])

    const debouncedZipcode = useDebounce(zipcode, 400)
    useEffect(() => {
        setZipcodeError(false)
        if (zipcode === '') return
        const test = val.isString(zipcode)
        setZipcodeError(test.error)
        setZipcodeErrorText(test.errorText)
    }, [debouncedZipcode])

    const debouncedCity = useDebounce(city, 400)
    useEffect(() => {
        setCityError(false)
        if (city === '') return
        const test = val.isString(city)
        setCityError(test.error)
        setCityErrorText(test.errorText)
    }, [debouncedCity])

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
        // const testUser = val.isString(user)
        // if (testUser.error) {
        //     setUserError(testUser.error)
        //     setUserErrorText(testUser.errorText)
        //     return
        // }

        // setPassError(false)
        // const testPass = val.isPassword(pass)
        // if (testPass.error) {
        //     setPassError(testPass.error)
        //     setPassErrorText(testPass.errorText)
        //     return
        // }

        // doLogin()
        // navigate('/')
    }

    const doLogin = async () => {
        setErrorForm(false)
        setButtonLoader(true)

        // await apiManager
        //     .login(user, pass)
        //     .then((res: any) => {
        //         setButtonLoader(false)
        //         if (res.status !== 200) {
        //             setErrorForm(true)
        //             setTextErrorForm(t('ERROR_FORM'))
        //             return
        //         }

        //         if (res.data.status === 204) {
        //             setErrorForm(true)
        //             setTextErrorForm(t('ERROR_USER_NOT_FOUND'))
        //             return
        //         }

        //         dispatch(login(res.data.token))
        //     })
        //     .catch((err) => console.log(err))
    }

    return (
        <form className='form-my-account' onSubmit={handleSubmit}>
            <InputField
                value={userName}
                label={t('FORM_USER')}
                type='text'
                error={userError}
                errorText={userErrorText}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserName(e.target.value)
                }
            />
            <InputField
                value={firstName}
                label={t('FORM_FIRST_NAME')}
                type='text'
                error={firstNameError}
                errorText={firstNameErrorText}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                }
            />
            <InputField
                value={lastName}
                label={t('FORM_LAST_NAME')}
                type='text'
                error={lastNameError}
                errorText={lastNameErrorText}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                }
            />
            <InputField
                value={birthday}
                label={t('FORM_BIRTHDAY')}
                type='text'
                error={birthdayError}
                errorText={birthdayErrorText}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setBirthday(e.target.value)
                }
            />
            <InputField
                value={address}
                label={t('FORM_ADDRESS')}
                type='text'
                error={addressError}
                errorText={addressErrorText}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAddress(e.target.value)
                }
            />
            <InputField
                value={zipcode}
                label={t('FORM_ZIPCODE')}
                type='text'
                error={zipcodeError}
                errorText={zipcodeErrorText}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setZipcode(e.target.value)
                }
            />
            <InputField
                value={city}
                label={t('FORM_CITY')}
                type='text'
                error={cityError}
                errorText={cityErrorText}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setCity(e.target.value)
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
