import { t } from 'i18next'
import { FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { DayOff } from 'models/dayOff'
import { User } from 'models/user'
import { ListDocuments } from '../listDocuments/listDocuments'
import Modal from 'react-modal'
import { HeaderModal } from 'components/headerModal/headerModal'
import { Button } from 'components/button/button'
import { FilterModal } from '../filterModal/filterModal'
import { DocumentUser } from 'models/documentUser'
import { UploadModal } from '../uploadModal/uploadModal'

interface props {
    documents: Array<DocumentUser>
    getDocuments: () => void
    users: Array<User>
    itemsPerPage: number
}

export interface Filter {
    type: number
    user: number
    start: Date
    end: Date
}

export const PaginatedDocuments: FC<props> = (props) => {
    const [filteredItems, setFilteredItems] = useState(props.documents)
    const [currentItems, setCurrentItems] = useState<Array<DocumentUser>>([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const [modalFilterIsOpen, setModalFilterIsOpen] = useState(false)
    const [modalUploadIsOpen, setModalUploadIsOpen] = useState(false)
    const [filter, setFilter] = useState<Filter>({
        type: 0,
        user: 0,
        start: new Date(2000, 0, 1),
        end: new Date(),
    })

    useEffect(() => {
        const endOffset = itemOffset + props.itemsPerPage
        const newItems = filteredItems.slice(itemOffset, endOffset)
        setCurrentItems(newItems)
        setPageCount(Math.ceil(filteredItems.length / props.itemsPerPage))
    }, [itemOffset, props.itemsPerPage, filteredItems])

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset =
            (event.selected * props.itemsPerPage) % filteredItems.length
        setItemOffset(newOffset)
    }

    const handleFilter = (filter: Filter) => {
        setFilter(filter)
        setModalFilterIsOpen(false)
    }

    useEffect(() => {
        const byType = props.documents.filter((item) => {
            if (filter.type !== 0) {
                return item.documentTypeId === filter.type
            } else {
                return true
            }
        })

        const byUser = byType.filter((item) => {
            if (filter.user !== 0) {
                return item.userId === filter.user
            } else {
                return true
            }
        })

        const byDate = byUser.filter((item) => {
            if (
                filter.start.getTime() <= new Date(item.createdAt).getTime() &&
                filter.end.getTime() >= new Date(item.createdAt).getTime() + 10
            ) {
                return true
            } else {
                return false
            }
        })

        console.log('by date', byDate)
        setFilteredItems(byDate)
    }, [filter, props.documents])

    const documentCreated = () => {
        setModalUploadIsOpen(false)
        props.getDocuments()
    }

    return (
        <div className='paginated-documents'>
            <Modal
                ariaHideApp={false}
                isOpen={modalFilterIsOpen}
                onRequestClose={() => setModalFilterIsOpen(false)}
            >
                <HeaderModal
                    title={t('MANAGE_FILTER')}
                    onClose={() => setModalFilterIsOpen(false)}
                />
                <FilterModal handleFilter={handleFilter} users={props.users} />
            </Modal>
            <Modal
                ariaHideApp={false}
                isOpen={modalUploadIsOpen}
                onRequestClose={() => setModalUploadIsOpen(false)}
            >
                <HeaderModal
                    title={t('DOCUMENTS_UPLOAD_DOCUMENT')}
                    onClose={() => setModalUploadIsOpen(false)}
                />
                <UploadModal
                    users={props.users}
                    documentCreated={documentCreated}
                />
            </Modal>
            <div className='container-title'>
                <h2>{t('MANAGE_DOCUMENTS')}</h2>
                <div className='container-buttons'>
                    <Button
                        onClick={() => setModalUploadIsOpen(true)}
                        label={t('DOCUMENTS_UPLOAD_DOCUMENT')}
                        style={'secondary'}
                    />
                    <Button
                        onClick={() => setModalFilterIsOpen(true)}
                        label={t('MANAGE_FILTER')}
                        style={'secondary'}
                    />
                </div>
            </div>
            <ListDocuments documents={currentItems} users={props.users} />
            {filteredItems.length > props.itemsPerPage && (
                <ReactPaginate
                    breakLabel='...'
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    nextLabel={`»`}
                    previousLabel={`«`}
                    renderOnZeroPageCount={undefined}
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    activeClassName='active'
                />
            )}
        </div>
    )
}
