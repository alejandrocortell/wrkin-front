import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../../components/button/button'
import { PunchIn } from '../../../../../../models/punchIn'
import Api from '../../../../../../services/api'
import DateUtilities from '../../../../../../utils/date'

const dateUtilities = new DateUtilities()
const apiManager = new Api()

interface props {
    currentPunchIn: PunchIn | null
    getPunchIns: () => void
}

export const StartStop: FC<props> = (props) => {
    const { t } = useTranslation()
    const [loader, setLoader] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (props.currentPunchIn !== null) {
                const milliseconds = dateUtilities.diference(
                    props.currentPunchIn.start,
                    Date.now()
                )
                milliseconds !== undefined && setTotal(milliseconds)
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const handleClick = () => {
        setLoader(true)
        if (props.currentPunchIn === null) {
            apiManager
                .createPunchIn(new Date())
                .then((res) => props.getPunchIns())
                .catch((err) => console.log(err))
                .finally(() => setLoader(false))
        } else {
            apiManager
                .updatePunchIn(props.currentPunchIn.id, undefined, new Date())
                .then((res) => props.getPunchIns())
                .catch((err) => console.log(err))
                .finally(() => setLoader(false))
        }
    }

    return (
        <div className='start-stop'>
            {props.currentPunchIn?.end === null && (
                <div className='current-time'>
                    <div>
                        {t('HOME_STARTED_AT')}{' '}
                        {dateUtilities.format(
                            props.currentPunchIn.start,
                            'HH:mm'
                        )}
                        h
                    </div>
                    <div>
                        {t('HOME_CURRENT_TIME')}{' '}
                        {dateUtilities.parseMillisecondsToHHmm(total)}h
                    </div>
                </div>
            )}
            <div className='container-button'>
                <Button
                    onClick={handleClick}
                    label={
                        props.currentPunchIn === null
                            ? t('COMMON_START')
                            : t('COMMON_STOP')
                    }
                    style={'primary'}
                    loading={loader}
                />
            </div>
        </div>
    )
}
