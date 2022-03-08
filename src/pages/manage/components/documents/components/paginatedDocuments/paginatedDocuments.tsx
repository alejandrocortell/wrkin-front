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

interface props {
    documents: Array<DocumentUser>
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
    }, [itemOffset, props.itemsPerPage, props.documents, filteredItems])

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset =
            (event.selected * props.itemsPerPage) % filteredItems.length
        setItemOffset(newOffset)
    }

    const closeModalFilter = () => {
        setModalFilterIsOpen(false)
    }

    const handleFilter = (filter: Filter) => {
        setFilter(filter)
        closeModalFilter()
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
                filter.start <= new Date(item.createdAt) &&
                filter.end >= new Date(item.createdAt)
            ) {
                return true
            } else {
                return false
            }
        })

        setFilteredItems(byDate)
    }, [filter, props.documents])

    return (
        <div className='paginated-documents'>
            <Modal
                ariaHideApp={false}
                isOpen={modalFilterIsOpen}
                onRequestClose={closeModalFilter}
            >
                <HeaderModal
                    title={t('MANAGE_FILTER')}
                    onClose={closeModalFilter}
                />
                <FilterModal handleFilter={handleFilter} users={props.users} />
            </Modal>
            <div className='container-title'>
                <h2>{t('MANAGE_DOCUMENTS')}</h2>
                <Button
                    onClick={() => setModalFilterIsOpen(true)}
                    label={t('MANAGE_FILTER')}
                    style={'secondary'}
                />
            </div>
            <ListDocuments documents={currentItems} users={props.users} />
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
        </div>
    )
}
