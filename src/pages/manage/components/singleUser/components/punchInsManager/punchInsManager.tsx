import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DateUtilities from 'utils/date'
import UserService from 'services/userService'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { PunchIn } from 'models/punchIn'

const dateUtilities = new DateUtilities()

interface props {
    punchIns: Array<PunchIn>
}

export const PunchInsManager: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <ContainerWhite>
            <div className='punchins-manager'>
                <h2>{t('NAV_PUNCHINS')}</h2>
            </div>
        </ContainerWhite>
    )
}
