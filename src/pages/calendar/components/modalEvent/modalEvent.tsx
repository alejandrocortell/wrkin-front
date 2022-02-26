import { FC } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'dayjs/locale/es'
import { useTranslation } from 'react-i18next'
import { CalendarEvent } from 'models/calendarEvent'
import DateUtilities from 'utils/date'
import { StatusRequest } from 'models/statusRequest'

const dateUtilities = new DateUtilities()

interface props {
    event: CalendarEvent
    statusRequest: Array<StatusRequest>
}

export const ModalEvent: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <div className=' modal-event'>
            {props.event.type === 'work' ? (
                <h3>
                    {`${t('COMMON_DAY')}: 
                    ${dateUtilities.format(
                        new Date(props.event.start),
                        'DD-MM-YYYY'
                    )}`}
                </h3>
            ) : (
                <>
                    <h3>
                        {`${t('CALENDAR_STATUS_REQUEST')}: 
                        ${
                            props.statusRequest.find((s) => {
                                return s.id === props.event.status
                            })?.statusRequest
                        }`}
                    </h3>

                    <h3>
                        {`${t('FORM_DATE_START')}: 
                        ${dateUtilities.format(
                            new Date(props.event.start),
                            'DD-MM-YYYY: hh:mm'
                        )}`}
                    </h3>

                    <h3>
                        {`${t('FORM_DATE_END')}: 
                        ${dateUtilities.format(
                            new Date(props.event.end),
                            'DD-MM-YYYY: hh:mm'
                        )}`}
                    </h3>
                </>
            )}
        </div>
    )
}
