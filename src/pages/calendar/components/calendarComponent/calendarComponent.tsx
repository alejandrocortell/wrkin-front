import { FC, useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import { localizer } from '../../../../utils/dayjsLocalizer '
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from '../../../../models/calendarEvent'
import 'dayjs/locale/es'
import i18next from 'i18next'
import { RBCToolbar } from './customToolbar'
import Modal from 'react-modal'
import { HeaderModal } from '../../../../components/headerModal/headerModal'
import { useTranslation } from 'react-i18next'
import { ModalRequest } from '../modalRequest/modalRequest'
import Api from '../../../../services/api'
import { ModalEvent } from '../modalEvent/modalEvent'

const apiManager = new Api()

interface props {
    punchIns: Array<CalendarEvent>
    daysOff: Array<CalendarEvent>
    getDaysOff: () => void
}

export const CalendarComponent: FC<props> = (props) => {
    const { t } = useTranslation()
    const [events, setEvents] = useState<Array<CalendarEvent>>([])
    const [modalRequestIsOpen, setModalRequestIsOpen] = useState(false)
    const [modalEventIsOpen, setModalEventIsOpen] = useState(false)
    const [statusRequest, setStatusRequest] = useState([])
    const [eventModal, setEventModal] = useState<CalendarEvent>()

    useEffect(() => {
        const insert = [...props.punchIns, ...props.daysOff]
        setEvents(insert)
    }, [props.punchIns, props.daysOff])

    useEffect(() => {
        apiManager
            .getStatusRequestTypes()
            .then((res: any) => {
                if (res.status === 200) {
                    setStatusRequest(res.data)
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    const messages = {
        allDay: 'Dia Inteiro',
        previous: '<',
        next: '>',
        today: 'Hoy',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
        agenda: 'Agenda',
        date: 'Data',
        time: 'Hora',
        event: 'Evento',
    }

    const openModalRequest = () => {
        setModalRequestIsOpen(true)
    }

    const closeModalRequest = () => {
        setModalRequestIsOpen(false)
    }

    const openModalEvent = (event: CalendarEvent) => {
        setEventModal(event)
        setModalEventIsOpen(true)
    }

    const closeModalEvent = () => {
        setModalEventIsOpen(false)
    }

    return (
        <>
            <Modal
                ariaHideApp={false}
                isOpen={modalRequestIsOpen}
                onRequestClose={closeModalRequest}
            >
                <HeaderModal
                    title={t('CALENDAR_CREATE_REQUEST')}
                    onClose={closeModalRequest}
                />
                <ModalRequest
                    onClose={closeModalRequest}
                    getDaysOff={props.getDaysOff}
                />
            </Modal>
            {eventModal && (
                <Modal
                    ariaHideApp={false}
                    isOpen={modalEventIsOpen}
                    onRequestClose={closeModalEvent}
                >
                    <HeaderModal
                        title={eventModal.title}
                        onClose={closeModalEvent}
                    />
                    <ModalEvent
                        event={eventModal}
                        statusRequest={statusRequest}
                    />
                </Modal>
            )}
            <Calendar
                localizer={localizer}
                messages={messages}
                culture={i18next.language}
                events={events}
                startAccessor='start'
                style={{ height: 500 }}
                views={['month']}
                selectable={true}
                onSelectEvent={(event) => openModalEvent(event)}
                eventPropGetter={(event) => ({
                    className: 'category-' + event.status,
                })}
                components={{
                    toolbar: (props) => (
                        <RBCToolbar
                            {...props}
                            openModalRequest={openModalRequest}
                        />
                    ),
                }}
            />
        </>
    )
}
