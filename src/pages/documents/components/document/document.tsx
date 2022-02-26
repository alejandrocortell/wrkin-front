import { FC } from 'react'
import { DocumentUser } from 'models/documentUser'
import iconDownloadFile from 'assets/img/file_download.svg'
import DateUtilities from 'utils/date'

const dateUtilities = new DateUtilities()

interface props {
    document: DocumentUser
}

export const Document: FC<props> = (props) => {
    return (
        <div className='document'>
            <div className='container-info'>
                <p>{props.document.name}</p>
                <span>
                    {dateUtilities.format(
                        props.document.createdAt,
                        'DD-MM-YYYY'
                    )}
                </span>
            </div>
            <a
                className='container-button'
                href={props.document.path}
                download={props.document.name}
            >
                <img src={iconDownloadFile} />
            </a>
        </div>
    )
}
