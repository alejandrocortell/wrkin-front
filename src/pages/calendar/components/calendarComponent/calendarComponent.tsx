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

const apiManager = new Api()

interface props {
    punchIns: Array<CalendarEvent>
    daysOff: Array<CalendarEvent>
}

export const CalendarComponent: FC<props> = (props) => {
    const { t } = useTranslation()
    const [events, setEvents] = useState<Array<CalendarEvent>>([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [typesDayOff, setTypesDayOff] = useState([])

    useEffect(() => {
        const insert = [...props.punchIns, ...props.daysOff]
        setEvents(insert)
    }, [props.punchIns, props.daysOff])

    useEffect(() => {
        apiManager
            .getDaysOffTypes()
            .then((res: any) => {
                if (res.status === 200) {
                    setTypesDayOff(res.data)
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
        setModalIsOpen(true)
    }

    const closeModalRequest = () => {
        setModalIsOpen(false)
    }

    return (
        <>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModalRequest}
            >
                <HeaderModal
                    title={t('CALENDAR_CREATE_REQUEST')}
                    onClose={closeModalRequest}
                />
                <ModalRequest types={typesDayOff} />
            </Modal>
            <Calendar
                localizer={localizer}
                messages={messages}
                culture={i18next.language}
                events={events}
                startAccessor='start'
                style={{ height: 500 }}
                views={['month']}
                selectable={false}
                eventPropGetter={(event) => ({
                    className: 'category-' + event.type,
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
