import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../components/button/button'
import { Checkbox } from '../../../../components/checkbox/checkbox'
import { InputField } from '../../../../components/input/input'
import { LinkButton } from '../../../../components/linkButton/linkButton'
import { useDebounce } from '../../../../hooks/useDebounce'
import Validator from '../../../../utils/validators'
import Api from '../../../../services/api'
import { useAppDispatch, useAppSelector } from '../../../../context/hooks'
import { login } from '../../../../context/authSlice'
import { useNavigate } from 'react-router-dom'
import { FileDrop } from 'react-file-drop'
import { InputFile } from '../../../../components/inputFile/inputFile'
import { setUser } from '../../../../context/userSlice'

const val = new Validator()
const apiManager = new Api()

export const FormAvatar: FC = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)
    const [avatar, setAvatar] = useState('')
    const [displayChangeAvatar, setDisplayChangeAvatar] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [loader, setLoader] = useState(false)
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

    const handleSubmit = () => {}

    return (
        <div className='form-avatar'>
            {avatar !== undefined && <img src={avatar} className='avatar' />}

            {!displayChangeAvatar ? (
                <LinkButton
                    label={'Change image'}
                    onClick={() => setDisplayChangeAvatar(true)}
                />
            ) : (
                <form className='' onSubmit={handleSubmit}>
                    <InputFile
                        value={selectedFile}
                        onChange={(file: File) => setSelectedFile(file)}
                    />
                </form>
            )}
        </div>
    )
}
