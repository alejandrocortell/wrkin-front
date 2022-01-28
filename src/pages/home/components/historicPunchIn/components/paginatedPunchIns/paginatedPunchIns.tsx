import { FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { PunchIn } from '../../../../../../models/punchIn'
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
        const currentItems = props.punchInsNotToday.slice(itemOffset, endOffset)
        setCurrentItems(currentItems)
        setPageCount(
            Math.ceil(props.punchInsNotToday.length / props.itemsPerPage)
        )
    }, [itemOffset, props.itemsPerPage])

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
            {/* <Items currentItems={currentItems} /> */}
            <ReactPaginate
                breakLabel='...'
                nextLabel='next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel='< previous'
                renderOnZeroPageCount={undefined}
            />
        </>
    )
}
