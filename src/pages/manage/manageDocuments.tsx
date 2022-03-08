import { FC, useEffect, useState } from 'react'
import UserService from 'services/userService'
import { Wrapper } from 'components/wrapper/wrapper'
import { ContainerWhite } from 'components/containerWhite/containerWhite'
import { SelectorManage } from './components/selector/selector'
import { User } from 'models/user'
import { DocumentUser } from 'models/documentUser'
import DocumentsService from 'services/documentsService'
import { PaginatedDocuments } from './components/documents/components/paginatedDocuments/paginatedDocuments'

const documentsService = new DocumentsService()
const userService = new UserService()

interface props {}

export const ManageDocuments: FC<props> = (props) => {
    const [documents, setDocuments] = useState<Array<DocumentUser>>([])
    const [users, setUsers] = useState<Array<User>>([])

    useEffect(() => {
        getDocuments()
        getAllUsers()
    }, [])

    const getDocuments = () => {
        documentsService
            .getAllDocuments()
            .then((res: any) => {
                if (res.status === 200) {
                    setDocuments(res.data)
                }
            })
            .catch((err) => console.log(err))
    }

    const getAllUsers = () => {
        userService
            .getAllUsers()
            .then((res: any) => {
                if (res.status === 200) {
                    setUsers(res.data)
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <Wrapper showMenu>
            <section className='manage container'>
                <ContainerWhite>
                    <SelectorManage />
                </ContainerWhite>
                <ContainerWhite>
                    <PaginatedDocuments
                        users={users}
                        documents={documents}
                        itemsPerPage={10}
                    />
                </ContainerWhite>
            </section>
        </Wrapper>
    )
}
