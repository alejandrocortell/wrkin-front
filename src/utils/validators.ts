import { t } from 'i18next'

export default class Validator {
    static instance: Validator = new Validator()

    isString = (text: string) => {
        if (typeof text === 'string') {
            return {
                error: false,
                errorText: '',
            }
        } else {
            return {
                error: true,
                errorText: t('ERROR_STRING'),
            }
        }
    }

    isPassword = (pass: string = '') => {
        const lenghtReg = new RegExp('^.{8,}$')
        const lowerReg = new RegExp('^(?=.*[a-z])')
        const upperReg = new RegExp('^(?=.*[A-Z])')
        const numberReg = new RegExp('^(?=.*[0-9])')
        // prettier-ignore
        const specialReg = new RegExp("^(?=.*[!@#$%&¬()=?¿¡+\\-*,.;:_<>])")

        if (!lenghtReg.test(pass)) {
            return {
                error: true,
                errorText: t('ERROR_PASSWORD_LENGHT'),
            }
        } else if (!lowerReg.test(pass)) {
            return {
                error: true,
                errorText: t('ERROR_PASSWORD_LOWER'),
            }
        } else if (!upperReg.test(pass)) {
            return {
                error: true,
                errorText: t('ERROR_PASSWORD_UPPER'),
            }
        } else if (!numberReg.test(pass)) {
            return {
                error: true,
                errorText: t('ERROR_PASSWORD_NUMBER'),
            }
        } else if (!specialReg.test(pass)) {
            return {
                error: true,
                errorText: t('ERROR_PASSWORD_SPECIAL'),
            }
        }

        return {
            error: false,
            errorText: '',
        }
    }

    isDate = (date: string) => {
        const validateDate = new Date(date)
        if (validateDate instanceof Date && !isNaN(validateDate.getTime())) {
            return {
                error: false,
                errorText: '',
            }
        } else {
            return {
                error: true,
                errorText: t('ERROR_INVALID_DATE'),
            }
        }
    }
}
