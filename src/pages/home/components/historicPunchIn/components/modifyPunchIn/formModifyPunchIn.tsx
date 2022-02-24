import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../../components/button/button'
import DateUtilities from '../../../../../../utils/date'
import { InputField } from '../../../../../../components/input/input'
import { useDebounce } from '../../../../../../hooks/useDebounce'
import Validator from '../../../../../../utils/validators'
import Api from '../../../../../../services/api'
import { PunchIn } from '../../../../../../models/punchIn'
import { useAppSelector } from '../../../../../../context/hooks'

const val = new Validator()
const dateUtilities = new DateUtilities()
const apiManager = new Api()

interface props {
    punchIn: PunchIn
    disabledFields: boolean
    getPunchIns: () => void
    closeModal: () => void
}

export const FormModifyPunchIn: FC<props> = (props) => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)

    const [disabled, setDisabled] = useState(true)
    const [loader, setLoader] = useState(false)
    const [confirmationDelete, setConfirmationDelete] = useState(false)

    const [dateStart, setDateStart] = useState(
        dateUtilities.format(new Date(props.punchIn.start), 'YYYY-MM-DD')
    )
    const [dateStartError, setDateStartError] = useState(false)
    const [dateStartErrorText, setDateStartErrorText] = useState('Error text')

    const [timeStart, setTimeStart] = useState(
        dateUtilities.format(new Date(props.punchIn.start), 'HH:mm')
    )
    const [timeStartError, setTimeStartError] = useState(false)
    const [timeStartErrorText, setTimeStartErrorText] = useState('Error text')

    const [dateEnd, setDateEnd] = useState(
        props.punchIn.end
            ? dateUtilities.format(new Date(props.punchIn.end), 'YYYY-MM-DD')
            : dateUtilities.format(new Date(), 'YYYY-MM-DD')
    )
    const [dateEndError, setDateEndError] = useState(false)
    const [dateEndErrorText, setDateEndErrorText] = useState('Error text')

    const [timeEnd, setTimeEnd] = useState(
        props.punchIn.end
            ? dateUtilities.format(new Date(props.punchIn.end), 'HH:mm')
            : '00:00'
    )
    const [timeEndError, setTimeEndError] = useState(false)
    const [timeEndErrorText, setTimeEndErrorText] = useState('Error text')

    useEffect(() => {
        setConfirmationDelete(false)
        setDateStart(
            dateUtilities.format(new Date(props.punchIn.start), 'YYYY-MM-DD')
        )
        setTimeStart(
            dateUtilities.format(new Date(props.punchIn.start), 'HH:mm')
        )
        setDateEnd(
            props.punchIn.end
                ? dateUtilities.format(
                      new Date(props.punchIn.end),
                      'YYYY-MM-DD'
                  )
                : dateUtilities.format(new Date(), 'YYYY-MM-DD')
        )
        setTimeEnd(
            props.punchIn.end
                ? dateUtilities.format(new Date(props.punchIn.end), 'HH:mm')
                : '00:00'
        )
    }, [props.punchIn])

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

    useEffect(() => {
        setDisabled(true)
        if (
            !dateStartError &&
            !timeStartError &&
            !dateEndError &&
            !timeEndError
        ) {
            setDisabled(false)
        }
    }, [
        dateStart,
        dateEnd,
        timeStart,
        timeEnd,
        dateStartError,
        timeStartError,
        dateEndError,
        timeEndError,
    ])

    const handleConfirmationDelete = (e: any) => {
        e.preventDefault()
        setConfirmationDelete(true)
    }

    const handleDelete = (e: any) => {
        e.preventDefault()
        setLoader(true)
        const id = props.punchIn.id

        apiManager
            .deletePunchIn(id)
            .then((res) => {
                props.closeModal()
                props.getPunchIns()
            })
            .catch((err) => console.log(err))
            .finally(() => setLoader(false))
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setLoader(true)
        const id = props.punchIn.id
        const start = new Date(`${dateStart} ${timeStart}`)
        const end = new Date(`${dateEnd} ${timeEnd}`)

        apiManager
            .updatePunchIn(id, start, end)
            .then((res) => {
                props.closeModal()
                props.getPunchIns()
            })
            .catch((err) => console.log(err))
            .finally(() => setLoader(false))
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
                    disabled={props.disabledFields}
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
                    disabled={props.disabledFields}
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
                    disabled={props.disabledFields}
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
                    disabled={props.disabledFields}
                />
            </div>
            <div className='container-buttons'>
                <Button
                    onClick={handleConfirmationDelete}
                    label={t('FORM_DELETE')}
                    style={'secondary'}
                    disabled={disabled}
                    loading={loader}
                />
                {confirmationDelete && (
                    <Button
                        onClick={handleDelete}
                        label={t('FORM_CONFIRM_DELETE')}
                        style={'delete'}
                        disabled={disabled}
                        loading={loader}
                    />
                )}
                <Button
                    onClick={handleSubmit}
                    label={t('FORM_SAVE')}
                    style={'primary'}
                    disabled={disabled}
                    loading={loader}
                />
            </div>
        </form>
    )
}
