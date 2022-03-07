import { t } from 'i18next'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { User } from 'models/user'
import { ListUsers } from '../listUsers/listUsers'
import { InputField } from 'components/input/input'
import { useNavigate } from 'react-router'

interface props {
    users: Array<User>
    itemsPerPage: number
}

export const PaginatedUsers: FC<props> = (props) => {
    const [filteredItems, setFilteredItems] = useState(props.users)
    const [currentItems, setCurrentItems] = useState<Array<User>>([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const [filter, setFilter] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const endOffset = itemOffset + props.itemsPerPage
        const newItems = filteredItems.slice(itemOffset, endOffset)
        setCurrentItems(newItems)
        setPageCount(Math.ceil(filteredItems.length / props.itemsPerPage))
    }, [itemOffset, props.itemsPerPage, props.users, filteredItems])

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number }) => {
        const newOffset =
            (event.selected * props.itemsPerPage) % filteredItems.length
        setItemOffset(newOffset)
    }

    useEffect(() => {
        if (filter === '') {
            setFilteredItems(props.users)
        } else {
            const usersFilter = props.users.filter((user) => {
                return (
                    user.firstName
                        .toLowerCase()
                        .includes(filter.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(filter.toLowerCase())
                )
            })

            setFilteredItems(usersFilter)
        }
    }, [filter, props.users])

    const handleUser = (id: number) => {
        navigate(`/manage/employees/${id}`)
    }

    return (
        <div className='paginated-days-off'>
            <div className='container-title'>
                <h2>{t('MANAGE_USERS')}</h2>
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFilter(e.target.value)
                    }
                    value={filter}
                    label={``}
                    placeholder={t('MANAGE_FILTER_BY_NAME')}
                    type={'text'}
                    error={false}
                    errorText={''}
                />
            </div>
            {currentItems.length === 0 ? (
                <div className='not-found'>{t('MANAGE_NO_USERS_FOUND')}</div>
            ) : (
                <>
                    <ListUsers users={currentItems} handleUser={handleUser} />
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
                </>
            )}
        </div>
    )
}

// .sort((a, b) => a.firstName.localeCompare(b.firstName))
