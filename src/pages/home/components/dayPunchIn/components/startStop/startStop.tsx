import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../../components/button/button'
import { PunchIn } from '../../../../../../models/punchIn'

interface props {
    currentPunchIn: PunchIn | null
}

export const StartStop: FC<props> = (props) => {
    const { t } = useTranslation()
    const [stateButton, setStateButton] = useState('')

    return (
        <div className='start-stop'>
            <div className='container-button'>
                <Button
                    onClick={() => console.log('click')}
                    label={
                        props.currentPunchIn === null
                            ? t('COMMON_START')
                            : t('COMMON_STOP')
                    }
                    style={'primary'}
                />
            </div>
        </div>
    )
}
