import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LinkButton } from '../../../../components/linkButton/linkButton'
import Validator from '../../../../utils/validators'
import Api from '../../../../services/api'
import { useAppDispatch, useAppSelector } from '../../../../context/hooks'
import { InputFile } from '../../../../components/inputFile/inputFile'
import { setUser } from '../../../../context/userSlice'
import accountImg from '../../../../assets/img/person.svg'

const val = new Validator()
const apiManager = new Api()

export const FormAvatar: FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)
    const [avatar, setAvatar] = useState('')
    const [displayChangeAvatar, setDisplayChangeAvatar] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File>()

    useEffect(() => {
        if (user.avatar !== null) {
            apiManager.getAvatar(user.avatar).then((res: any) => {
                setAvatar(res.request.responseURL)
            })
        }
    }, [user])

    useEffect(() => {
        if (selectedFile && selectedFile.type.includes('image')) {
            apiManager
                .uploadAvatar(user.id, selectedFile)
                .then((res: any) => {
                    if (res.status === 200) {
                        dispatch(setUser(res.data.user))
                        setSelectedFile(undefined)
                        setDisplayChangeAvatar(false)
                    }
                })
                .catch((err) => console.log(err))
        }
    }, [selectedFile])

    return (
        <div className='form-avatar'>
            {avatar === '' ? (
                <img src={accountImg} className='non-avatar' />
            ) : (
                <img src={avatar} className='avatar' />
            )}

            {!displayChangeAvatar ? (
                <LinkButton
                    label={'Change image'}
                    onClick={() => setDisplayChangeAvatar(true)}
                />
            ) : (
                <InputFile
                    value={selectedFile}
                    onChange={(file: File) => setSelectedFile(file)}
                />
            )}
        </div>
    )
}
