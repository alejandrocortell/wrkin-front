import { FC, useState } from 'react'
import { initialUser, User } from 'models/user'
import { LineExpanded } from '../lines/lineExpanded'
import { LineContracted } from '../lines/lineContracted'
import { DocumentUser } from 'models/documentUser'

interface props {
    documents: Array<DocumentUser>
    users: Array<User>
    getDocuments: () => void
}

export const ListDocuments: FC<props> = (props) => {
    const [expanded, setExpanded] = useState(0)

    return (
        <div className='list-historic'>
            {props.documents.map((doc) => {
                return expanded === doc.id ? (
                    <LineExpanded
                        key={doc.id}
                        document={doc}
                        user={
                            props.users.find((u) => u.id === doc.userId) ||
                            initialUser
                        }
                        changeExpanded={() => setExpanded(0)}
                        getDocuments={props.getDocuments}
                    />
                ) : (
                    <LineContracted
                        key={doc.id}
                        document={doc}
                        user={
                            props.users.find((u) => u.id === doc.userId) ||
                            initialUser
                        }
                        changeExpanded={() => setExpanded(doc.id)}
                    />
                )
            })}
        </div>
    )
}
