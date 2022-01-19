import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../../components/button/button'
import { PunchIn } from '../../../../../../models/punchIn'
import Api from '../../../../../../services/api'

const apiManager = new Api()

interface props {
    currentPunchIn: PunchIn | null
    getPunchIns: () => void
}

export const StartStop: FC<props> = (props) => {
    const { t } = useTranslation()
    const [loader, setLoader] = useState(false)

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
