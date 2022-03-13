import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LinkButton } from 'components/linkButton/linkButton'
import i18next from 'i18next'
import Cookie from 'utils/cookies'

const cookie = new Cookie()

export const FormLanguage: FC = () => {
    const { t } = useTranslation()

    const handleChange = (language: string) => {
        i18next.changeLanguage(language)
        cookie.setCookie('language', language, 2700)
    }

    return (
        <div className='form-language'>
            <p>{t('FORM_CHANGE_LANGUAGE')}: </p>
            <LinkButton
                label={t('FORM_LANGUAGE_ES')}
                onClick={() => handleChange('es')}
            />
            <LinkButton
                label={t('FORM_LANGUAGE_EN')}
                onClick={() => handleChange('en')}
            />
        </div>
    )
}
