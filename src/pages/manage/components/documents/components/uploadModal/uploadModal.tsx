import { Button } from 'components/button/button'
import { Dropdown } from 'components/dropdown/dropdown'
import { InputFile } from 'components/inputFile/inputFile'
import { useAppSelector } from 'context/hooks'
import { t } from 'i18next'
import { User } from 'models/user'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import DocumentsService from 'services/documentsService'

const documentsService = new DocumentsService()

interface props {
    users: Array<User>
    documentCreated: () => void
}

export const UploadModal: FC<props> = (props) => {
    const { documentsTypes } = useAppSelector((state) => state.organization)
    const { user } = useAppSelector((state) => state.user)

    const [disabled, setDisabled] = useState(true)
    const [loader, setLoader] = useState(false)
    const [statusUpload, setStatusUpload] = useState('')

    const [type, setType] = useState(documentsTypes[0].name)
    const [userName, setUserName] = useState(t('MANAGE_ALL_USERS') as string)
    const [selectedFile, setSelectedFile] = useState<File>()

    const listTypes = () => {
        return documentsTypes.map((t) => {
            return { value: t.name }
        })
    }

    const listUsers = () => {
        return [
            { value: t('MANAGE_ALL_USERS') },
            ...props.users
                .map((u) => {
                    return { value: `${u.firstName} ${u.lastName}` }
                })
                .sort((a, b) => a.value.localeCompare(b.value)),
        ]
    }

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

        const org = user.OrganizationId
        const documentType = documentsTypes.find((t) => {
            return t.name === type.toLowerCase()
        })
        const userSelected = props.users.find((u) => {
            return `${u.firstName} ${u.lastName}` === userName
        })
        const idDocumentType = documentType ? documentType.id : 1
        const userId = userSelected ? userSelected.id : null

        documentsService
            .uploadDocument(idDocumentType, userId, org, selectedFile)
            .then((res: any) => {
                if (res.status === 201) {
                    setSelectedFile(undefined)
                    setStatusUpload(t('DOCUMENTS_UPLOAD_DONE'))
                    props.documentCreated()
                } else {
                    setStatusUpload(t('DOCUMENTS_UPLOAD_FAIL'))
                }
            })
            .catch((err) => {
                setStatusUpload(t('DOCUMENTS_UPLOAD_FAIL'))
                console.log(err)
            })
            .finally(() => setLoader(false))
    }

    return (
        <div className='upload-modal'>
            <Dropdown
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setType(e.target.value)
                }}
                value={type}
                label={t('COMMON_TYPE')}
                list={listTypes()}
                error={false}
                errorText={''}
            />
            <Dropdown
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setUserName(e.target.value)
                }}
                value={userName}
                label={t('COMMON_USER')}
                list={listUsers()}
                error={false}
                errorText={''}
            />
            <InputFile
                value={selectedFile}
                onChange={(file: File) => setSelectedFile(file)}
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
        </div>
    )
}
