import React, { useState } from 'react'
import dayjs from 'dayjs'

// @ts-ignore
function RBCToolbar(props) {
    const [viewState, setViewState] = useState('month')
    const getCustomToolbar = () => {
        const goToBack = () => {
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
        const goToNext = () => {
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

            return <span onClick={goToToday}>{`${month} ${year}`}</span>
        }

        return (
            <div className='rbc-toolbar'>
                <span className='rbc-btn-group'></span>
                <span className='rbc-toolbar-label rbc-date'>
                    <span
                        className='prev-icon'
                        id='prev-btn-icon'
                        onClick={goToBack}
                    >
                        &#8249;
                    </span>
                    {month()}
                    <span
                        className='next-icon'
                        id='next-btn-icon'
                        onClick={goToNext}
                    >
                        &#8250;
                    </span>
                </span>

                <span className='rbc-btn-group'>
                    <span onClick={props.doRequest}>aaaa</span>
                </span>
            </div>
        )
    }

    return <>{getCustomToolbar()}</>
}

export default RBCToolbar
