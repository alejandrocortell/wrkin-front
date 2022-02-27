import { FC, useState } from 'react'
import { User } from 'models/user'
import { LineUser } from '../lineUser/lineUser'

interface props {
    users: Array<User>
    handleUser: (id: number) => void
}

export const ListUsers: FC<props> = (props) => {
    return (
        <div className='list-historic'>
            {props.users.map((u) => {
                return (
                    <LineUser
                        key={u.id}
                        user={u}
                        handleUser={() => props.handleUser(u.id)}
                    />
                )
            })}
        </div>
    )
}
