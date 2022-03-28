import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/button/button'
import { InputField } from 'components/input/input'
import { useDebounce } from 'hooks/useDebounce'
import Validator from 'utils/validators'
import UserService from 'services/userService'
import { useAppDispatch, useAppSelector } from 'context/hooks'
import DateUtilities from 'utils/date'
import { setUser } from 'context/userSlice'

const dateUtilities = new DateUtilities()
const val = new Validator()
const userService = new UserService()

export const FormMyAccount: FC = () => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const [disableAccount, setDisableAccount] = useState(true)
    const [disablePass, setDisablePass] = useState(true)

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

    const [passConfirm, setPassConfirm] = useState('')
    const [passConfirmError, setPassConfirmError] = useState(false)
    const [passConfirmErrorText, setPassConfirmErrorText] = useState('')

    const [buttonLoaderAccount, setButtonLoaderAccount] = useState(false)
    const [buttonLoaderPass, setButtonLoaderPass] = useState(false)

    const [accountUpdated, setAccountUpdated] = useState(false)
    const [passwordUpdated, setPasswordUpdated] = useState(false)
    const [errorAccount, setErrorAccount] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setBirthday(user.birthday)
        setAddress(user.address)
        setZipcode(user.zipcode)
        setCity(user.city)
    }, [user])

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

    const debouncedPassConfirm = useDebounce(passConfirm, 400)
    useEffect(() => {
        setPassConfirmError(false)
        if (passConfirm === '') return
        if (pass !== passConfirm) {
            setPassConfirmError(true)
            setPassConfirmErrorText(t('ERROR_PASSWORD_MATCH'))
        }
    }, [debouncedPassConfirm])

    useEffect(() => {
        if (
            userName === user.user &&
            firstName === user.firstName &&
            lastName === user.lastName &&
            birthday === user.birthday &&
            address === user.address &&
            zipcode === user.zipcode &&
            city === user.city
        ) {
            setDisableAccount(true)
            return
        }

        if (
            userName !== '' &&
            !userError &&
            firstName !== '' &&
            !firstNameError &&
            lastName !== '' &&
            !lastNameError &&
            birthday !== '' &&
            !birthdayError &&
            address !== '' &&
            !addressError &&
            zipcode !== '' &&
            !zipcodeError &&
            city !== '' &&
            !cityError
        ) {
            setDisableAccount(false)
        } else {
            setDisableAccount(true)
        }
    }, [
        userName,
        userError,
        firstName,
        firstNameError,
        lastName,
        lastNameError,
        birthday,
        birthdayError,
        address,
        addressError,
        zipcode,
        zipcodeError,
        city,
        cityError,
    ])

    useEffect(() => {
        if (
            pass !== '' &&
            !passError &&
            passConfirm !== '' &&
            !passConfirmError
        ) {
            setDisablePass(false)
        } else {
            setDisablePass(true)
        }
    }, [pass, passError, passConfirm, passConfirmError])

    const handleUpdateAccount = (e: any) => {
        e.preventDefault()
        setErrorAccount(false)
        setButtonLoaderAccount(true)
        setAccountUpdated(false)

        userService
            .updateUser(
                user.id,
                userName,
                firstName,
                lastName,
                new Date(birthday),
                address,
                zipcode,
                city
            )
            .then((res: any) => {
                if (res.status !== 201) {
                    setErrorAccount(true)
                    return
                }
                setDisableAccount(true)
                setAccountUpdated(true)
                dispatch(setUser(res.data.user))
            })
            .catch((err) => setErrorAccount(true))
            .finally(() => setButtonLoaderAccount(false))
    }

    const handleUpdatePass = (e: any) => {
        e.preventDefault()
        setButtonLoaderPass(true)
        setErrorPassword(false)
        setPasswordUpdated(false)

        userService
            .updatePass(user.id, pass)
            .then((res: any) => {
                if (res.status !== 201) {
                    setErrorPassword(true)
                    return
                }
                setPasswordUpdated(true)
                setPass('')
                setPassConfirm('')
            })
            .catch((err) => setErrorPassword(true))
            .finally(() => setButtonLoaderPass(false))
    }

    return (
        <div>
            <form className='form-my-account' onSubmit={handleUpdateAccount}>
                <InputField
                    value={userName}
                    label={t('FORM_USER')}
                    type='text'
                    error={userError}
                    errorText={userErrorText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUserName(e.target.value)
                    }
                    disabled
                />
                <InputField
                    value={firstName}
                    label={t('FORM_FIRST_NAME')}
                    type='text'
                    error={firstNameError}
                    errorText={firstNameErrorText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFirstName(e.target.value)
                    }
                    testTag='firstname'
                />
                <InputField
                    value={lastName}
                    label={t('FORM_LAST_NAME')}
                    type='text'
                    error={lastNameError}
                    errorText={lastNameErrorText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setLastName(e.target.value)
                    }
                    testTag='lastname'
                />
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setBirthday(e.target.value)
                    }
                    value={dateUtilities.format(
                        new Date(birthday),
                        'YYYY-MM-DD'
                    )}
                    label={t('FORM_BIRTHDAY')}
                    type={'date'}
                    error={birthdayError}
                    errorText={birthdayErrorText}
                />
                <InputField
                    value={address}
                    label={t('FORM_ADDRESS')}
                    type='text'
                    error={addressError}
                    errorText={addressErrorText}
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setCity(e.target.value)
                    }
                />
                {accountUpdated && (
                    <div className='form-updated'>
                        {t('FORM_ACCOUNT_UPDATED')}
                    </div>
                )}
                {errorAccount && (
                    <div className='error-form'>{t('ERROR_FORM')}</div>
                )}
                <Button
                    onClick={handleUpdateAccount}
                    label={t('FORM_UPDATE_ACCOUNT')}
                    style={'primary'}
                    loading={buttonLoaderAccount}
                    disabled={disableAccount}
                    testTag='update-account'
                />
            </form>
            <form
                className='form-my-account form-pass'
                onSubmit={handleUpdatePass}
            >
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
                <InputField
                    value={passConfirm}
                    label={t('FORM_CONFIRM_PASSWORD')}
                    type='password'
                    error={passConfirmError}
                    errorText={passConfirmErrorText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassConfirm(e.target.value)
                    }
                />
                {passwordUpdated && (
                    <div className='form-updated'>{t('FORM_PASS_UPDATED')}</div>
                )}
                {errorPassword && (
                    <div className='error-form'>{t('ERROR_FORM')}</div>
                )}
                <Button
                    onClick={handleUpdatePass}
                    label={t('FORM_UPDATE_PASSWORD')}
                    style={'primary'}
                    loading={buttonLoaderPass}
                    disabled={disablePass}
                />
            </form>
        </div>
    )
}
