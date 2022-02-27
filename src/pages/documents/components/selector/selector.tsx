import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/button/button'
import { LinkButton } from 'components/linkButton/linkButton'
import { useAppSelector } from 'context/hooks'
import { DocumentType } from './models/documentType'

interface props {
    selected: number
    onSelect: (newView: number) => void
}

export const SelectorDocuments: FC<props> = (props) => {
    const { t } = useTranslation()
    const { documentsTypes } = useAppSelector((state) => state.organization)

    const selectorText = (id: number) => {
        if (id === 1) return t('DOCUMENTS_TYPE_PAYSLIP')
        if (id === 2) return t('DOCUMENTS_TYPE_SICK_LEAVE')
        if (id === 3) return t('DOCUMENTS_TYPE_IDENTIFYING')
        return t('DOCUMENTS_TYPE_GENERIC')
    }
    return (
        <div className='selector-documents'>
            {documentsTypes.map((doc) => {
                return (
                    <div
                        key={doc.id}
                        className={`container-link ${
                            props.selected === doc.id && 'selected'
                        }`}
                    >
                        <LinkButton
                            label={selectorText(doc.id)}
                            onClick={() => props.onSelect(doc.id)}
                        />
                    </div>
                )
            })}
            <div
                className={`container-link ${
                    props.selected === 5 && 'selected'
                }`}
            >
                <LinkButton
                    label={t('DOCUMENTS_UPLOAD_DOCUMENT')}
                    onClick={() => props.onSelect(5)}
                />
            </div>
        </div>
    )
}
