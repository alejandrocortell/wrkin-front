import React, { useState } from 'react'
import dayjs from 'dayjs'
import { LinkButton } from './../../../../components/linkButton/linkButton'
import nextMonth from './../../../../assets/img/next_month.svg'
import nextYear from './../../../../assets/img/next_year.svg'
import { Button } from '../../../../components/button/button'
import { useTranslation } from 'react-i18next'

// @ts-ignore
function RBCToolbar(props) {
    const { t } = useTranslation()

    const [viewState, setViewState] = useState('month')
    const getCustomToolbar = () => {
        const handlePreviousMonth = () => {
            const view = viewState
            const mDate = props.date
            let newDate
            if (view === 'month') {
                newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1)
            } else if (view === 'week') {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() - 7,
                    1
                )
            } else {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() - 1,
                    1
                )
            }
            props.onNavigate('prev', newDate)
        }

        const handlePreviousYear = () => {
            const view = viewState
            const mDate = props.date
            let newDate
            if (view === 'month') {
                newDate = new Date(mDate.getFullYear() - 1, mDate.getMonth(), 1)
            } else if (view === 'week') {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() - 7,
                    1
                )
            } else {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() - 1,
                    1
                )
            }
            props.onNavigate('prev', newDate)
        }

        const handleNextMonth = () => {
            const view = viewState
            const mDate = props.date
            let newDate
            if (view === 'month') {
                newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1)
            } else if (view === 'week') {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() + 7,
                    1
                )
            } else {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() + 1,
                    1
                )
            }
            props.onNavigate('next', newDate)
        }

        const handleNextYear = () => {
            const view = viewState
            const mDate = props.date
            let newDate
            if (view === 'month') {
                newDate = new Date(mDate.getFullYear() + 1, mDate.getMonth(), 1)
            } else if (view === 'week') {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() + 7,
                    1
                )
            } else {
                newDate = new Date(
                    mDate.getFullYear(),
                    mDate.getMonth(),
                    mDate.getDate() + 1,
                    1
                )
            }
            props.onNavigate('next', newDate)
        }

        const goToToday = () => {
            const now = new Date()
            props.date.setMonth(now.getMonth())
            props.date.setYear(now.getFullYear())
            props.date.setDate(now.getDate())
            props.onNavigate('current')
        }

        const month = () => {
            const date = dayjs(props.date)
            const month = date.format('MMMM')
            const year = date.format('YYYY')

            return <LinkButton label={`${month} ${year}`} onClick={goToToday} />
        }

        return (
            <div className='rbc-toolbar'>
                <span className='rbc-btn-group'></span>
                <span className='rbc-toolbar-label rbc-date'>
                    <span
                        className='next-icon previous'
                        onClick={handlePreviousYear}
                    >
                        <img src={nextYear} alt='Previous year' />
                    </span>
                    <span
                        className='next-icon previous'
                        onClick={handlePreviousMonth}
                    >
                        <img src={nextMonth} alt='Previous month' />
                    </span>

                    {month()}
                    <span className='next-icon' onClick={handleNextMonth}>
                        <img src={nextMonth} alt='Next month' />
                    </span>
                    <span className='next-icon' onClick={handleNextYear}>
                        <img src={nextYear} alt='Next year' />
                    </span>
                </span>

                <span className='rbc-btn-group do-request'>
                    <Button
                        onClick={props.doRequest}
                        label={t('CALENDAR_DO_REQUEST')}
                        style={'secondary'}
                    />
                </span>
            </div>
        )
    }

    return <>{getCustomToolbar()}</>
}

export default RBCToolbar
