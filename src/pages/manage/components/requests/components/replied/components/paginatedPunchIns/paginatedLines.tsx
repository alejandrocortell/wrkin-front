import { t } from 'i18next'
import { FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { DayOff } from 'models/dayOff'
import { User } from 'models/user'
import { ListDaysOff } from '../listDaysOff/listDaysOff'

interface props {
    replied: Array<DayOff>
    users: Array<User>
    itemsPerPage: number
}

export const PaginatedDaysOff: FC<props> = (props) => {
    const [currentItems, setCurrentItems] = useState<Array<DayOff>>([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    useEffect(() => {
        const endOffset = itemOffset + props.itemsPerPage
        const newItems = props.replied.slice(itemOffset, endOffset)
        setCurrentItems(newItems)
        setPageCount(Math.ceil(props.replied.length / props.itemsPerPage))
    }, [itemOffset, props.itemsPerPage, props.replied])

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset =
            (event.selected * props.itemsPerPage) % props.replied.length
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        )
        setItemOffset(newOffset)
    }

    return (
        <div className='pendings'>
            <h2>{t('MANAGE_REPLIED')}</h2>
            <ListDaysOff replied={currentItems} users={props.users} />
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
