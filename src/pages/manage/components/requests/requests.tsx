import { FC } from 'react'
import { DayOff } from 'models/dayOff'
import { User } from 'models/user'
import { Pendings } from './components/pendings/pendings'
import { PaginatedDaysOff } from './components/replied/components/paginatedDaysOff/paginatedDaysOff'
import { ContainerWhite } from 'components/containerWhite/containerWhite'

interface props {
    requests: Array<DayOff>
    users: Array<User>
    updateRequest: () => void
}

export const Requests: FC<props> = (props) => {
    const filterPendings = () => {
        return props.requests.filter((request) => {
            return request.statusRequestId === 3
        })
    }

    const filterPast = () => {
        return props.requests.filter((request) => {
            return request.statusRequestId !== 3
        })
    }

    return (
        <div className='requests'>
            {filterPendings().length > 0 && (
                <ContainerWhite>
                    <Pendings
                        pendings={filterPendings()}
                        users={props.users}
                        updateRequest={props.updateRequest}
                    />
                </ContainerWhite>
            )}

            <ContainerWhite>
                <PaginatedDaysOff
                    replied={filterPast()}
                    itemsPerPage={10}
                    users={props.users}
                />
            </ContainerWhite>
        </div>
    )
}
