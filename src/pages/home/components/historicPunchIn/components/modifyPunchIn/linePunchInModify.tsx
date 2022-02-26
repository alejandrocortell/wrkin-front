import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import DateUtilities from 'utils/date'
import { PunchIn } from 'models/punchIn'

const dateUtilities = new DateUtilities()

interface props {
    punchIn: PunchIn
    selectPunchIn: () => void
    selectedPunchIn: PunchIn | undefined
}

export const LinePunchInModify: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <div
            onClick={props.selectPunchIn}
            className={`line-punch-in ${
                props.punchIn.id === props.selectedPunchIn?.id && 'selected'
            }`}
        >
            <span>
                {t('COMMON_START')}{' '}
                {dateUtilities.format(props.punchIn.start, 'DD/MM/YYYY HH:mm')}
            </span>
            {props.punchIn.end !== null && (
                <span>
                    {t('COMMON_STOP')}{' '}
                    {dateUtilities.format(
                        props.punchIn.end,
                        'DD/MM/YYYY HH:mm'
                    )}
                </span>
            )}
            <span>{t('COMMON_SELECT')}</span>
        </div>
    )
}
