import { FC, useEffect, useState } from 'react'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { Wrapper } from 'components/wrapper/wrapper'
import { DocumentType } from './models/documentType'
import UserService from 'services/userService'
import { useAppSelector } from 'context/hooks'
import { SelectorDocuments } from './components/selector/selector'
import { UploadDocument } from './components/uploadDocument/uploadDocument'
import { DocumentUser } from 'models/documentUser'
import { DocumentsList } from './components/documentsList/documentsList'

const userService = new UserService()

interface props {}

export const Documents: FC<props> = (props) => {
    const [documentsUser, setDocumentsUser] = useState<Array<DocumentUser>>([])
    const { user } = useAppSelector((state) => state.user)
    const [view, setView] = useState(1)

    useEffect(() => {
        getDocuments()
    }, [])

    const getDocuments = () => {
        userService
            .getDocumentsUser(user.id)
            .then((res: any) => {
                if (res.status === 200) {
                    setDocumentsUser(res.data.documents)
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.log(err))
    }

    const filterDocuments = (type: number) => {
        const docsByType = documentsUser.filter(
            (doc) => doc.documentTypeId === type
        )
        return docsByType
    }

    return (
        <Wrapper showMenu>
            <section className='documents container'>
                <ContainerWhite>
                    <SelectorDocuments
                        selected={view}
                        onSelect={(newView) => setView(newView)}
                    />
                </ContainerWhite>
                <ContainerWhite>
                    {view === 5 ? (
                        <UploadDocument getDocuments={getDocuments} />
                    ) : (
                        <DocumentsList documents={filterDocuments(view)} />
                    )}
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
