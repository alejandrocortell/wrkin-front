import { t } from 'i18next'
import { DayOff } from 'models/dayOff'
import { FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { ListRequests } from '../listRequests/listRequests'

interface props {
    daysOff: Array<DayOff>
    itemsPerPage: number
}

export const PaginatedRequests: FC<props> = (props) => {
    const [currentItems, setCurrentItems] = useState<Array<DayOff>>([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + props.itemsPerPage
        const newItems = props.daysOff.slice(itemOffset, endOffset)
        setCurrentItems(newItems)
        setPageCount(Math.ceil(props.daysOff.length / props.itemsPerPage))
    }, [itemOffset, props.itemsPerPage, props.daysOff])

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset =
            (event.selected * props.itemsPerPage) % props.daysOff.length
        setItemOffset(newOffset)
    }

    return (
        <>
            <ListRequests daysOff={currentItems} />
            {currentItems.length > props.itemsPerPage && (
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
        </>
    )
}
