import { Button } from 'components/button/button'
import { Dropdown } from 'components/dropdown/dropdown'
import { InputField } from 'components/input/input'
import { useAppSelector } from 'context/hooks'
import { t } from 'i18next'
import { User } from 'models/user'
import { ChangeEvent, FC, useState } from 'react'
import DateUtilities from 'utils/date'
import { Filter } from '../../documents'

const dateUtilities = new DateUtilities()

interface props {
    users: Array<User>
    handleFilter: (filter: Filter) => void
}

export const FilterModal: FC<props> = (props) => {
    const { documentsTypes } = useAppSelector((state) => state.organization)
    const [type, setType] = useState(t('MANAGE_ALL_TYPES') as string)
    const [user, setUser] = useState(t('MANAGE_ALL_USERS') as string)
    const [start, setStart] = useState(
        dateUtilities.format(new Date(2000, 0, 1), 'YYYY-MM-DD')
    )
    const [end, setEnd] = useState(
        dateUtilities.format(new Date(), 'YYYY-MM-DD')
    )

    const handleFilter = () => {
        const documentTypeSelected = documentsTypes.find(
            (d) => d.name === type.toLowerCase()
        )

        const userSelected = props.users.find(
            (u) => `${u.firstName} ${u.lastName}` === user
        )

        props.handleFilter({
            type: documentTypeSelected ? documentTypeSelected.id : 0,
            user: userSelected ? userSelected.id : 0,
            start: new Date(start),
            end: new Date(end),
        })
    }

    const listTypes = () => {
        return [
            { value: t('MANAGE_ALL_TYPES') },
            ...documentsTypes.map((t) => {
                return { value: t.name }
            }),
        ]
    }

    const listUsers = () => {
        return [
            { value: t('MANAGE_ALL_USERS') },
            ...props.users
                .map((u) => {
                    return { value: `${u.firstName} ${u.lastName}` }
                })
                .sort((a, b) => a.value.localeCompare(b.value)),
        ]
    }

    return (
        <div className='filter-modal'>
            <Dropdown
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setType(e.target.value)
                }}
                value={type}
                label={t('COMMON_TYPE')}
                list={listTypes()}
                error={false}
                errorText={''}
            />
            <Dropdown
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setUser(e.target.value)
                }}
                value={user}
                label={t('COMMON_USER')}
                list={listUsers()}
                error={false}
                errorText={''}
            />
            <div className='container-date'>
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setStart(e.target.value)
                    }
                    value={start}
                    label={t('FORM_DATE_START')}
                    type={'date'}
                    error={false}
                    errorText={''}
                />
                <InputField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEnd(e.target.value)
                    }
                    value={end}
                    label={t('FORM_DATE_END')}
                    type={'date'}
                    error={false}
                    errorText={''}
                />
            </div>
            <Button
                onClick={handleFilter}
                label={t('MANAGE_SET_FILTER')}
                style={'primary'}
            />
        </div>
    )
}
