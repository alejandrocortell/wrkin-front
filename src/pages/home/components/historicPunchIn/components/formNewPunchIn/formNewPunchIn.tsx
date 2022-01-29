import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../../components/button/button'
import DateUtilities from '../../../../../../utils/date'
import Modal from 'react-modal'
import { HeaderModal } from '../../../../../../components/headerModal/headerModal'
import { InputField } from '../../../../../../components/input/input'
import { useDebounce } from '../../../../../../hooks/useDebounce'
import Validator from '../../../../../../utils/validators'

const val = new Validator()
const dateUtilities = new DateUtilities()

interface props {}

export const FormNewPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()
    const [loader, setLoader] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const [dateStart, setDateStart] = useState(
        dateUtilities.format(new Date(), 'YYYY-MM-DD')
    )
    const [dateStartError, setDateStartError] = useState(false)
    const [dateStartErrorText, setDateStartErrorText] = useState('Error text')

    const [timeStart, setTimeStart] = useState(
        `${new Date().getHours()}:${new Date().getMinutes()}`
    )
    const [timeStartError, setTimeStartError] = useState(false)
    const [timeStartErrorText, setTimeStartErrorText] = useState('Error text')

    const [dateEnd, setDateEnd] = useState(dateStart)
    const [dateEndError, setDateEndError] = useState(false)
    const [dateEndErrorText, setDateEndErrorText] = useState('Error text')

    const [timeEnd, setTimeEnd] = useState(
        `${new Date().getHours()}:${new Date().getMinutes()}`
    )
    const [timeEndError, setTimeEndError] = useState(false)
    const [timeEndErrorText, setTimeEndErrorText] = useState('Error text')

    const debouncedDateStart = useDebounce(dateStart, 400)
    useEffect(() => {
        if (dateStart === '') return
        setDateStartError(false)
        const test = val.isDate(dateStart)
        setDateStartError(test.error)
        setDateStartErrorText(test.errorText)
    }, [debouncedDateStart])

    const debouncedDateEnd = useDebounce(dateEnd, 400)
    useEffect(() => {
        if (dateEnd === '') return
        setDateEndError(false)
        const test = val.isDate(dateEnd)
        if (test.error) {
            setDateEndError(test.error)
            setDateEndErrorText(test.errorText)
        } else if (new Date(dateEnd) < new Date(dateStart)) {
            setDateEndError(true)
            setDateEndErrorText(t('ERROR_INVALID_DATE'))
        }
    }, [debouncedDateEnd])

    const debouncedTimeEnd = useDebounce(timeEnd, 400)
    useEffect(() => {
        if (timeEnd === '') return
        setTimeEndError(false)
        const start = new Date(`${dateStart} ${timeStart}`)
        const end = new Date(`${dateEnd} ${timeEnd}`)
        if (end < start) {
            setTimeEndError(true)
            setTimeEndErrorText(t('ERROR_INVALID_TIME'))
        }
    }, [debouncedTimeEnd])

    useEffect(() => {
        setDisabled(false)
        if (
            !dateStartError &&
            !timeStartError &&
            !dateEndError &&
            !timeEndError
        ) {
            setDisabled(true)
        }
    }, [dateStart, dateEnd, timeStart, timeEnd])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log('siuuu')
    }

    return (
        <form className='form-new-punch-in' onSubmit={handleSubmit}>
            <div className='line'>
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDateStart(e.target.value)
                    }
                    value={dateStart}
                    label={t('FORM_DATE_START')}
                    type={'date'}
                    error={dateStartError}
                    errorText={dateStartErrorText}
                    max={dateUtilities.format(new Date(), 'YYYY-MM-DD')}
                />
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTimeStart(e.target.value)
                    }
                    value={timeStart}
                    label={t('FORM_TIME_START')}
                    type={'time'}
                    error={timeStartError}
                    errorText={timeStartErrorText}
                />
            </div>
            <div className='line'>
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDateEnd(e.target.value)
                    }
                    value={dateEnd}
                    label={t('FORM_DATE_END')}
                    type={'date'}
                    error={dateEndError}
                    errorText={dateEndErrorText}
                    min={dateStart}
                />
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTimeEnd(e.target.value)
                    }
                    value={timeEnd}
                    label={t('FORM_TIME_END')}
                    type={'time'}
                    error={timeEndError}
                    errorText={timeEndErrorText}
                />
            </div>
            <Button
                onClick={handleSubmit}
                label={t('FORM_SAVE')}
                style={'primary'}
                disabled={disabled}
                loading={loader}
            />
        </form>
    )
}