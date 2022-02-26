import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../components/button/button'
import { Dropdown } from '../../../../components/dropdown/dropdown'
import { InputFile } from '../../../../components/inputFile/inputFile'
import { useAppSelector } from '../../../../context/hooks'
import { DocumentType } from '../../../../models/documentType'
import Api from '../../../../services/api'

const apiManager = new Api()

interface props {
    getDocuments: () => void
}

export const UploadDocument: FC<props> = (props) => {
    const { t } = useTranslation()
    const { user } = useAppSelector((state) => state.user)
    const { documentsTypes } = useAppSelector((state) => state.organization)

    const [disabled, setDisabled] = useState(true)
    const [loader, setLoader] = useState(false)
    const [statusUpload, setStatusUpload] = useState('')

    const [selectedFile, setSelectedFile] = useState<File>()
    const [selectedFileError, setSelectedFileError] = useState(false)
    const [selectedFileErrorText, setSelectedFileErrorText] = useState('')

    const [type, setType] = useState(documentsTypes[0].name)
    const [typeError, setTypeError] = useState(false)
    const [typeErrorText, setTypeErrorText] = useState('Error text')

    useEffect(() => {
        setDisabled(true)
        if (selectedFile !== undefined) {
            setDisabled(false)
        }
    }, [selectedFile])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (selectedFile === undefined) return
        setLoader(true)
        const userId = user.id
        const org = user.OrganizationId
        const documentType = documentsTypes.find((t) => {
            return t.name === type.toLowerCase()
        })
        const idDocumentType = documentType ? documentType.id : 1

        apiManager
            .uploadDocument(idDocumentType, userId, org, selectedFile)
            .then((res) => {
                setSelectedFile(undefined)
                setStatusUpload(t('DOCUMENTS_UPLOAD_DONE'))
                props.getDocuments()
            })
            .catch((err) => {
                setStatusUpload(t('DOCUMENTS_UPLOAD_FAIL'))
                console.log(err)
            })
            .finally(() => setLoader(false))
    }

    return (
        <form className='upload-document' onSubmit={handleSubmit}>
            <InputFile
                value={selectedFile}
                onChange={(file: File) => setSelectedFile(file)}
            />
            <Dropdown
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setType(e.target.value)
                }}
                value={type}
                label={'Type'}
                list={documentsTypes.map((t) => {
                    return { value: t.name }
                })}
                error={typeError}
                errorText={typeErrorText}
            />
            <Button
                onClick={handleSubmit}
                label={t('FORM_SAVE')}
                style={'primary'}
                disabled={disabled}
                loading={loader}
            />
            {statusUpload !== '' && (
                <p className='status-upload'>{statusUpload}</p>
            )}
        </form>
    )
}
