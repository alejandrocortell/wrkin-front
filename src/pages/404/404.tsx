import { LinkButton } from 'components/linkButton/linkButton'
import { t } from 'i18next'

export const FourOFour = () => (
    <div className='fourOfour background'>
        <div className='container'>
            <div className='code'>404</div>
            <div className='text'>{t('404_TEXT')}</div>
            <div className='container-button'>
                <LinkButton label={t('404_RETURN')} path='/' />
            </div>
        </div>
    </div>
)
