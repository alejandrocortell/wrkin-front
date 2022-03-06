import { Button } from 'components/button/button'
import { Dropdown } from 'components/dropdown/dropdown'
import { InputField } from 'components/input/input'
import { useDebounce } from 'hooks/useDebounce'
import { t } from 'i18next'
import { User } from 'models/user'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import DateUtilities from 'utils/date'
import Validator from 'utils/validators'

const val = new Validator()
const dateUtilities = new DateUtilities()

const roles = [
    t('ROLE_MANAGER'),
    t('ROLE_RRHH'),
    t('ROLE_COORDINATOR'),
    t('ROLE_EMPLOYEE'),
]

interface props {
    users: Array<User>
}

export const FormCreateUser: FC<props> = (props) => {
    const [disableCreate, setDisableCreate] = useState(true)

    const [userName, setUserName] = useState('')
    const [userError, setUserError] = useState(false)
    const [userErrorText, setUserErrorText] = useState('')

    const [role, setRole] = useState('')
    const [roleError, setRoleError] = useState(false)
    const [roleErrorText, setRoleErrorText] = useState('')

    const [manager, setManager] = useState('')
    const [managerError, setManagerError] = useState(false)
    const [managerErrorText, setManagerErrorText] = useState('')

    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError] = useState(false)
    const [firstNameErrorText, setFirstNameErrorText] = useState('')

    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState(false)
    const [lastNameErrorText, setLastNameErrorText] = useState('')

    const [birthday, setBirthday] = useState('')
    const [birthdayError, setBirthdayError] = useState(false)
    const [birthdayErrorText, setBirthdayErrorText] = useState('')

    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState(false)
    const [addressErrorText, setAddressErrorText] = useState('')

    const [zipcode, setZipcode] = useState('')
    const [zipcodeError, setZipcodeError] = useState(false)
    const [zipcodeErrorText, setZipcodeErrorText] = useState('')

    const [city, setCity] = useState('')
    const [cityError, setCityError] = useState(false)
    const [cityErrorText, setCityErrorText] = useState('')

    const [pass, setPass] = useState('123456aA?')
    const [passError, setPassError] = useState(false)
    const [passErrorText, setPassErrorText] = useState('')

    const [passConfirm, setPassConfirm] = useState('123456aA?')
    const [passConfirmError, setPassConfirmError] = useState(false)
    const [passConfirmErrorText, setPassConfirmErrorText] = useState('')

    const [buttonLoaderCreate, setButtonLoaderCreate] = useState(false)

    const [accountCreated, setAccountCreated] = useState(false)
    const [errorCreate, setErrorCreate] = useState(false)

    const debouncedUser = useDebounce(userName, 400)
    useEffect(() => {
        if (userName === '') return
        setUserError(false)

        const sameUser = props.users.find((u) => {
            return u.user === userName
        })

        if (sameUser !== undefined) {
            setUserError(true)
            setUserErrorText(t('MANAGE_USER_IN_USE'))
            return
        }

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
            !cityError &&
            pass !== '' &&
            !passError &&
            passConfirm !== '' &&
            !passConfirmError
        ) {
            setDisableCreate(false)
        } else {
            setDisableCreate(true)
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
        pass,
        passError,
        passConfirm,
        passConfirmError,
    ])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log('aa')
    }

    return (
        <form className='form-create-user' onSubmit={handleSubmit}>
            <div className='col-3'>
                <InputField
                    value={userName}
                    label={t('FORM_USER')}
                    type='text'
                    error={userError}
                    errorText={userErrorText}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUserName(e.target.value)
                    }
                />
                <Dropdown
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setRole(e.target.value)
                    }}
                    value={role}
                    label={t('FORM_ROLE')}
                    list={props.users
                        .filter((u: User) => {
                            return [2, 3, 4].includes(u.roleId)
                        })
                        .map((user) => {
                            return {
                                value: `${user.firstName} ${user.lastName}`,
                            }
                        })}
                    error={roleError}
                    errorText={roleErrorText}
                />
                <Dropdown
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setManager(e.target.value)
                    }}
                    value={manager}
                    label={t('ROLE_MANAGER')}
                    list={roles.map((role) => {
                        return { value: role }
                    })}
                    error={roleError}
                    errorText={roleErrorText}
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
            </div>
            <div className='col-2'>
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
            </div>
            <div className='container-button'>
                {accountCreated && (
                    <div className='form-updated'>
                        {t('FORM_ACCOUNT_UPDATED')}
                    </div>
                )}
                {errorCreate && (
                    <div className='error-form'>{t('ERROR_FORM')}</div>
                )}

                <Button
                    onClick={handleSubmit}
                    label={t('MANAGE_CREATE_ACCOUNT')}
                    style={'primary'}
                    loading={buttonLoaderCreate}
                    disabled={disableCreate}
                />
            </div>
        </form>
    )
}
