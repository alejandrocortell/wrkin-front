import { FC } from 'react'
import { DocumentUser } from '../../../../models/documentUser'
import iconDownloadFile from '../../../../assets/img/file_download.svg'
import DateUtilities from '../../../../utils/date'

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

            <div className='container-button'>
                <img src={iconDownloadFile} />
            </div>
        </div>
    )
}
