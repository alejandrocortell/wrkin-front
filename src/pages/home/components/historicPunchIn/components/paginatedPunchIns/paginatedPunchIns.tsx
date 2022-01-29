import { t } from 'i18next'
import { FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { InterfacePunchInsNotToday } from '../../historicPunchIn'
import { ListPunchIns } from '../listPunchIns/listPunchIns'

interface props {
    punchInsNotToday: Array<InterfacePunchInsNotToday>
    itemsPerPage: number
}

export const PaginatedPunchIns: FC<props> = (props) => {
    const [currentItems, setCurrentItems] = useState<
        Array<InterfacePunchInsNotToday>
    >([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + props.itemsPerPage
        const newItems = props.punchInsNotToday.slice(itemOffset, endOffset)
        setCurrentItems(newItems)
        setPageCount(
            Math.ceil(props.punchInsNotToday.length / props.itemsPerPage)
        )
    }, [itemOffset, props.itemsPerPage, props.punchInsNotToday])

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset =
            (event.selected * props.itemsPerPage) %
            props.punchInsNotToday.length
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        )
        setItemOffset(newOffset)
    }

    return (
        <>
            <ListPunchIns punchInsNotToday={currentItems} />
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
