import { t } from 'i18next'
import { PunchIn } from 'models/punchIn'
import { FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { InterfacePunchInsByDate } from '../../punchInsManager'
import { ListPunchIns } from '../listPunchIns/listPunchIns'

interface props {
    punchIns: Array<InterfacePunchInsByDate>
    itemsPerPage: number
}

export const PaginatedPunchIns: FC<props> = (props) => {
    const [currentItems, setCurrentItems] = useState<
        Array<InterfacePunchInsByDate>
    >([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + props.itemsPerPage
        const newItems = props.punchIns.slice(itemOffset, endOffset)
        setCurrentItems(newItems)
        setPageCount(Math.ceil(props.punchIns.length / props.itemsPerPage))
    }, [itemOffset, props.itemsPerPage, props.punchIns])

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset =
            (event.selected * props.itemsPerPage) % props.punchIns.length
        setItemOffset(newOffset)
    }

    return (
        <>
            <ListPunchIns punchIns={currentItems} />
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
        </>
    )
}
