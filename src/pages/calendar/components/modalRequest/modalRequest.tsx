import { ChangeEvent, FC, useEffect, useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'dayjs/locale/es'
import { useTranslation } from 'react-i18next'
import Validator from 'utils/validators'
import DateUtilities from 'utils/date'
import DaysOffService from 'services/daysOffService'
import { useDebounce } from 'hooks/useDebounce'
import { useAppSelector } from 'context/hooks'
import { InputField } from 'components/input/input'
import { Button } from 'components/button/button'
import { Checkbox } from 'components/checkbox/checkbox'
import { Dropdown } from 'components/dropdown/dropdown'

const val = new Validator()
const dateUtilities = new DateUtilities()
const daysOffService = new DaysOffService()

interface props {
    onClose: () => void
    getDaysOff: () => void
}

export const ModalRequest: FC<props> = (props) => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const { dayOffTypes } = useAppSelector((state) => state.organization)

    const [loader, setLoader] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const [allDay, setAllDay] = useState(false)

    const [type, setType] = useState(dayOffTypes[0].dayOffType)
    const [typeError, setTypeError] = useState(false)
    const [typeErrorText, setTypeErrorText] = useState('Error text')

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
        `${new Date().getHours()}:${new Date().getMinutes() + 1}`
    )
    const [timeEndError, setTimeEndError] = useState(false)
    const [timeEndErrorText, setTimeEndErrorText] = useState('Error text')

    const [message, setMessage] = useState('')
    const [messageError, setMessageError] = useState(false)
    const [messageErrorText, setMessageErrorText] = useState('Error text')

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
        if (end <= start) {
            setTimeEndError(true)
            setTimeEndErrorText(t('ERROR_INVALID_TIME'))
        }
    }, [debouncedTimeEnd])

    const debouncedMessage = useDebounce(message, 400)
    useEffect(() => {
        // if (message === '') {
        //     setMessageError(false)
        //     return
        // }
        setMessageError(false)
        const test = val.isString(message)
        if (test.error) {
            setMessageError(test.error)
            setMessageErrorText(test.errorText)
        }
    }, [debouncedMessage])

    useEffect(() => {
        setDisabled(true)
        if (
            !dateStartError &&
            !timeStartError &&
            !dateEndError &&
            !timeEndError &&
            !messageError &&
            message !== ''
        ) {
            setDisabled(false)
        }
    }, [
        dateStart,
        dateEnd,
        timeStart,
        timeEnd,
        message,
        dateStartError,
        timeStartError,
        dateEndError,
        timeEndError,
        messageError,
    ])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setLoader(true)
        const timeStartCalc = allDay ? '00:00' : timeStart
        const timeEndCalc = allDay ? '23:59' : timeEnd
        const start = new Date(`${dateStart} ${timeStartCalc}`)
        const end = new Date(`${dateEnd} ${timeEndCalc}`)
        const dayOffType = dayOffTypes.find((t) => {
            return t.dayOffType === type.toLowerCase()
        })
        const idDayOffType = dayOffType ? dayOffType.id : 1

        daysOffService
            .createDayOff(start, end, idDayOffType, message)
            .then((res) => {
                props.onClose()
                props.getDaysOff()
            })
            .catch((err) => console.log(err))
            .finally(() => setLoader(false))
    }

    return (
        <form
            className='form-new-punch-in modal-request'
            onSubmit={handleSubmit}
        >
            <div className='all-day'>
                <Checkbox
                    onChange={() => setAllDay(!allDay)}
                    checked={allDay}
                    label={t('CALENDAR_ALL_DAY')}
                />
                <Dropdown
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        setType(e.target.value.toLowerCase)
                    }}
                    value={type}
                    label={'Type'}
                    list={dayOffTypes.map((t) => {
                        return { value: t.dayOffType }
                    })}
                    error={typeError}
                    errorText={typeErrorText}
                />
            </div>
            <div className='all-day'>
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setDateStart(e.target.value)
                    }
                    value={dateStart}
                    label={t('FORM_DATE_START')}
                    type={'date'}
                    error={dateStartError}
                    errorText={dateStartErrorText}
                    min={dateUtilities.format(new Date(), 'YYYY-MM-DD')}
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
                    disabled={allDay}
                />
            </div>
            <div className='all-day'>
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
                    disabled={allDay}
                />
            </div>
            <div>
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setMessage(e.target.value)
                    }
                    value={message}
                    label={t('FORM_MESSAGE')}
                    type={'textarea'}
                    error={messageError}
                    errorText={messageErrorText}
                />
            </div>
            <Button
                onClick={handleSubmit}
                label={t('CALENDAR_SEND_REQUEST')}
                style={'primary'}
                disabled={disabled}
                loading={loader}
            />
        </form>
    )
}
