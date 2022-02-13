import { FC, useEffect, useState } from 'react'
import { ContainerWhite } from '../../components/containerWhite/containerWhite'
import { Wrapper } from '../../components/wrapper/wrapper'
import { DocumentType } from './../../models/documentType'
import Api from '../../services/api'
import { useAppSelector } from '../../context/hooks'
import { SelectorDocuments } from './components/selector/selector'
import { UploadDocument } from './components/uploadDocument/uploadDocument'

const apiManager = new Api()

interface props {}

export const Documents: FC<props> = (props) => {
    const [documentTypes, setDocumentTypes] = useState<Array<DocumentType>>([])
    const [documentsUser, setDocumentsUser] = useState<Array<DocumentType>>([])
    const { user } = useAppSelector((state) => state.user)
    const [view, setView] = useState(1)

    useEffect(() => {
        apiManager
            .getDocumentsTypes()
            .then((res: any) => {
                if (res.status === 200) {
                    setDocumentTypes(res.data)
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        getDocuments()
    }, [])

    const getDocuments = () => {
        apiManager
            .getDocumentsUser(user.id)
            .then((res: any) => {
                if (res.status === 200) {
                    setDocumentsUser(res.data)
                } else {
                    console.log(res)
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <Wrapper showMenu>
            <section className='documents container'>
                <ContainerWhite>
                    <SelectorDocuments
                        types={documentTypes}
                        selected={view}
                        onSelect={(newView) => setView(newView)}
                    />
                </ContainerWhite>
                <ContainerWhite>
                    <>
                        {view === 5 && (
                            <UploadDocument
                                types={documentTypes}
                                getDocuments={getDocuments}
                            />
                        )}
                    </>
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
