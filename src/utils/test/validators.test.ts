import Validator from 'utils/validators'
import { t } from 'i18next'

const validator = new Validator()

describe('Test if is string: ', () => {
    test('String', () => {
        expect(validator.isString('test')).toStrictEqual({
            error: false,
            errorText: '',
        })
    })

    test('Empty string', () => {
        expect(validator.isString('')).toStrictEqual({
            error: false,
            errorText: '',
        })
    })

    test('Only whitespaces', () => {
        expect(validator.isString('    ')).toStrictEqual({
            error: false,
            errorText: '',
        })
    })

    test('Number', () => {
        expect(validator.isString('2')).toStrictEqual({
            error: false,
            errorText: '',
        })
    })
})

describe('Test if is correct password: ', () => {
    test('Minus than 8 chars', () => {
        expect(validator.isPassword('1234567')).toStrictEqual({
            error: true,
            errorText: t('ERROR_PASSWORD_LENGHT'),
        })
    })

    test('Not contains a lowercase char', () => {
        expect(validator.isPassword('1234567a')).toStrictEqual({
            error: true,
            errorText: t('ERROR_PASSWORD_LOWER'),
        })
    })

    test('Not contains a uppercase char', () => {
        expect(validator.isPassword('1234567aA')).toStrictEqual({
            error: true,
            errorText: t('ERROR_PASSWORD_UPPER'),
        })
    })

    test('Not contains a number', () => {
        expect(validator.isPassword('qwertyui')).toStrictEqual({
            error: true,
            errorText: t('ERROR_PASSWORD_NUMBER'),
        })
    })

    test('Not contains a specialchar', () => {
        expect(validator.isPassword('qwertyui1A')).toStrictEqual({
            error: true,
            errorText: t('ERROR_PASSWORD_SPECIAL'),
        })
    })

    test('Correct password', () => {
        expect(validator.isPassword('123456aA?')).toStrictEqual({
            error: false,
            errorText: '',
        })
    })
})

describe('Test if is valid date: ', () => {
    test('Date with year, month and day', () => {
        expect(validator.isDate('1995, 11, 17')).toStrictEqual({
            error: false,
            errorText: '',
        })
    })

    test('Date with month day, year hour', () => {
        expect(validator.isDate('December 17, 1995 03:24:00')).toStrictEqual({
            error: false,
            errorText: '',
        })
    })

    test('Date with as return from the sever', () => {
        expect(validator.isDate('2022-03-09 23:08:23.331+01')).toStrictEqual({
            error: false,
            errorText: '',
        })
    })

    test('Date with invalid date', () => {
        expect(validator.isDate('2022-0309')).toStrictEqual({
            error: true,
            errorText: t('ERROR_INVALID_DATE'),
        })
    })
})
